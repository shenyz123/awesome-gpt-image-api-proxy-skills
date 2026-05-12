#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_MODEL = 'gpt-image-2';
const DEFAULT_SIZE = 'auto';
const DEFAULT_QUALITY = 'medium';
const DEFAULT_COUNT = 1;
const DEFAULT_OUT_DIR = 'gpt-image-files';
const MAX_POLL_SECONDS = 300;
const POLL_FAST_INTERVAL_MS = 3000;
const POLL_SLOW_INTERVAL_MS = 8000;
const POLL_SLOW_AFTER_SECONDS = 20;
const PROGRESS_INTERVAL_SECONDS = 15;
const VALID_RATIOS = new Set(['1:1', '1:2', '2:1', '1:3', '3:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '9:21', '21:9']);

function fail(message) {
  console.error('ERROR: ' + message);
  process.exit(1);
}

function warn(message) {
  console.error('WARNING: ' + message);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findEnvFile(startDir) {
  let current = path.resolve(startDir || process.cwd());
  while (true) {
    const candidate = path.join(current, '.env');
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function stripInlineComment(value) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    if (ch === '\'' && !inDouble) inSingle = !inSingle;
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === '#' && !inSingle && !inDouble && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i).trim();
    }
  }
  return value.trim();
}

function parseEnv(content) {
  const parsed = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    let value = stripInlineComment(line.slice(eq + 1));
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

function loadEnvFromProject() {
  const envPath = findEnvFile(process.cwd());
  if (!envPath) return null;
  const parsed = parseEnv(fs.readFileSync(envPath, 'utf8'));
  for (const [key, value] of Object.entries(parsed)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
  return envPath;
}

function takeValue(args, index, optionName) {
  const current = args[index];
  const prefix = optionName + '=';
  if (current.startsWith(prefix)) return { value: current.slice(prefix.length), consumed: 1 };
  if (index + 1 >= args.length) fail('Missing value for ' + optionName);
  return { value: args[index + 1], consumed: 2 };
}

function parseArgs(argv) {
  const options = {
    model: DEFAULT_MODEL,
    size: DEFAULT_SIZE,
    resolution: '',
    quality: DEFAULT_QUALITY,
    count: DEFAULT_COUNT,
    imageInputs: [],
    callbackUrl: '',
    outDir: path.resolve(process.cwd(), DEFAULT_OUT_DIR),
    dryRun: false,
    prompt: ''
  };

  const args = [...argv];
  if (args.length === 0) {
    fail('Usage: node scripts/gpt-image-gen.js "prompt" [--model=gpt-image-2] [--out=DIR] [--dry-run]');
  }

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg === '--dry-run') {
      options.dryRun = true;
      i += 1;
      continue;
    }
    if (arg === '--model' || arg.startsWith('--model=')) {
      const parsed = takeValue(args, i, '--model');
      options.model = parsed.value;
      i += parsed.consumed;
      continue;
    }
    if (arg === '--out' || arg.startsWith('--out=')) {
      const parsed = takeValue(args, i, '--out');
      options.outDir = path.resolve(process.cwd(), parsed.value);
      i += parsed.consumed;
      continue;
    }
    if (arg === '--image' || arg.startsWith('--image=')) {
      const parsed = takeValue(args, i, '--image');
      options.imageInputs.push(...parsed.value.split(',').map((url) => url.trim()).filter(Boolean));
      i += parsed.consumed;
      continue;
    }
    if (arg === '--size' || arg.startsWith('--size=')) {
      const parsed = takeValue(args, i, '--size');
      options.size = parsed.value;
      i += parsed.consumed;
      continue;
    }
    if (arg === '--resolution' || arg.startsWith('--resolution=')) {
      const parsed = takeValue(args, i, '--resolution');
      options.resolution = parsed.value;
      i += parsed.consumed;
      continue;
    }
    if (arg === '--quality' || arg.startsWith('--quality=')) {
      const parsed = takeValue(args, i, '--quality');
      options.quality = parsed.value;
      i += parsed.consumed;
      continue;
    }
    if (arg === '--count' || arg.startsWith('--count=')) {
      const parsed = takeValue(args, i, '--count');
      options.count = Number(parsed.value);
      i += parsed.consumed;
      continue;
    }
    if (arg === '--callback' || arg.startsWith('--callback=')) {
      const parsed = takeValue(args, i, '--callback');
      options.callbackUrl = parsed.value;
      i += parsed.consumed;
      continue;
    }
    if (arg.startsWith('--')) fail('Unknown parameter: ' + arg);
    if (!options.prompt) {
      options.prompt = arg;
      i += 1;
      continue;
    }
    fail('Unexpected extra argument: ' + arg);
  }

  if (!options.prompt) fail('Prompt is required.');
  return options;
}

function validateOptions(options) {
  if (!options.model.trim()) fail('Model cannot be empty.');
  if (!['low', 'medium', 'high'].includes(options.quality)) fail('Quality must be low, medium, or high.');
  if (!Number.isInteger(options.count) || options.count < 1 || options.count > 10) fail('Count must be between 1 and 10.');
  if (options.resolution && !['1K', '2K', '4K'].includes(options.resolution)) fail('Resolution must be 1K, 2K, or 4K.');
  if (options.callbackUrl && !options.callbackUrl.startsWith('https://')) fail('Callback URL must use HTTPS.');

  if (options.size === 'auto') {
    options.resolution = '';
    return;
  }

  if (/^[0-9]+:[0-9]+$/.test(options.size)) {
    if (!VALID_RATIOS.has(options.size)) fail('Invalid ratio. Supported: ' + Array.from(VALID_RATIOS).join(', '));
    if (!options.resolution) options.resolution = '1K';
    return;
  }

  const match = options.size.match(/^([0-9]+)[x?]([0-9]+)$/);
  if (match) {
    const width = Number(match[1]);
    const height = Number(match[2]);
    if (width % 16 !== 0 || height % 16 !== 0) fail('Width and height must be multiples of 16.');
    if (width < 16 || width > 3840 || height < 16 || height > 3840) fail('Each dimension must be between 16 and 3840 pixels.');
    const pixels = width * height;
    if (pixels < 655360 || pixels > 8294400) fail('Pixel budget must be 655,360 to 8,294,400.');
    if (options.resolution) warn('Resolution is ignored for pixel size.');
    options.resolution = '';
    return;
  }

  fail('Invalid size format. Use auto, a supported ratio such as 16:9, or pixels such as 1024x1024.');
}

function isRemoteImageInput(value) {
  return /^https?:\/\//i.test(value) || /^data:image\//i.test(value);
}

function looksLikeLocalPath(value) {
  return /[\\/]/.test(value)
    || /^\.[\\/]/.test(value)
    || /^[A-Za-z]:[\\/]/.test(value)
    || /\.(png|jpe?g|webp|gif)$/i.test(value);
}

function resolveImageInput(value) {
  if (isRemoteImageInput(value)) return value;

  const filePath = path.resolve(process.cwd(), value);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return fs.readFileSync(filePath).toString('base64');
  }

  if (looksLikeLocalPath(value)) {
    fail('Image file not found: ' + filePath);
  }

  return value;
}

function resolveImageInputs(inputs) {
  return inputs.map(resolveImageInput);
}

function buildPayload(options) {
  const payload = {
    model: options.model,
    prompt: options.prompt,
    size: options.size,
    quality: options.quality,
    n: options.count
  };
  if (options.resolution) payload.resolution = options.resolution;
  if (options.imageInputs.length > 0) payload.image = resolveImageInputs(options.imageInputs);
  if (options.callbackUrl) payload.callback_url = options.callbackUrl;
  return payload;
}

function getConfig() {
  const baseUrl = (process.env.GPT_IMAGE_BASE_URL || '').trim().replace(/\/+$/, '');
  const apiKey = (process.env.GPT_IMAGE_API_KEY || '').trim();
  return { baseUrl, apiKey };
}

async function readJsonResponse(response) {
  const text = await response.text();
  try {
    return { text, json: text ? JSON.parse(text) : {} };
  } catch {
    return { text, json: null };
  }
}

function friendlyApiError(status, body) {
  const message = body && typeof body === 'object'
    ? (body.error && (body.error.message || body.error)) || body.message
    : '';
  if (status === 401) return 'Invalid GPT_IMAGE_API_KEY.';
  if (status === 402) return 'Payment required or insufficient balance.';
  if (status === 403) return 'Access denied by API proxy: ' + (message || 'check API key permissions.');
  if (status === 429) return 'Rate limited by API proxy. Try again later.';
  if (status === 400) return 'Bad request: ' + (message || 'check generation parameters.');
  if (status >= 500) return 'API proxy server error HTTP ' + status + '.';
  return 'API error HTTP ' + status + ': ' + (message || JSON.stringify(body));
}

async function submitGeneration(config, payload) {
  const response = await fetch(config.baseUrl + '/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + config.apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const parsed = await readJsonResponse(response);
  if (!response.ok) fail(friendlyApiError(response.status, parsed.json || parsed.text));
  const body = parsed.json || {};
  const imageUrls = collectImageUrls(body);
  if (imageUrls.length > 0) {
    return { imageUrls, result: body };
  }
  const taskId = body.id || body.task_id;
  if (!taskId) fail('Generation response did not include a task id: ' + parsed.text);
  const estimated = Number(body.task_info && body.task_info.estimated_time) || 60;
  return { taskId, estimated };
}

function collectImageUrls(body) {
  const urls = [];
  if (Array.isArray(body.results)) {
    for (const item of body.results) {
      if (typeof item === 'string') urls.push(item);
      else if (item && typeof item === 'object') {
        if (item.url) urls.push(item.url);
        if (item.image_url) urls.push(item.image_url);
      }
    }
  }
  if (Array.isArray(body.data)) {
    for (const item of body.data) {
      if (typeof item === 'string') urls.push(item);
      else if (item && typeof item === 'object') {
        if (item.url) urls.push(item.url);
        if (item.image_url) urls.push(item.image_url);
      }
    }
  }
  if (body.image_url) urls.push(body.image_url);
  if (body.url) urls.push(body.url);
  return [...new Set(urls)].filter(Boolean);
}

function extensionFor(url, contentType) {
  const type = (contentType || '').split(';')[0].trim().toLowerCase();
  if (type === 'image/jpeg') return '.jpg';
  if (type === 'image/webp') return '.webp';
  if (type === 'image/gif') return '.gif';
  if (type === 'image/png') return '.png';
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) return ext === '.jpeg' ? '.jpg' : ext;
  } catch {
    return '.png';
  }
  return '.png';
}

async function downloadImage(url, outDir, index) {
  const response = await fetch(url);
  if (!response.ok) fail('Failed to download generated image HTTP ' + response.status + ': ' + url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const ext = extensionFor(url, response.headers.get('content-type'));
  const fileName = 'gpt-image-' + String(index + 1).padStart(2, '0') + '-' + Date.now() + ext;
  const filePath = path.join(outDir, fileName);
  await fs.promises.writeFile(filePath, buffer);
  return filePath;
}

async function saveImageUrls(urls, outDir, elapsed, result) {
  for (let i = 0; i < urls.length; i += 1) {
    console.log('IMAGE_URL=' + urls[i]);
    const filePath = await downloadImage(urls[i], outDir, i);
    console.log('IMAGE_FILE=' + filePath);
  }
  console.log('ELAPSED=' + elapsed + 's');
  console.log('RESULT_JSON=' + JSON.stringify(result));
}

async function pollTask(config, taskId, estimated, outDir) {
  const start = Date.now();
  let lastProgressBucket = -1;
  let interval = 0;

  while (true) {
    if (interval > 0) await sleep(interval);
    const elapsed = Math.floor((Date.now() - start) / 1000);
    if (elapsed > MAX_POLL_SECONDS) {
      console.log('POLL_TIMEOUT: task_id=' + taskId + ' dashboard=' + config.baseUrl);
      process.exit(1);
    }

    const progressBucket = Math.floor(elapsed / PROGRESS_INTERVAL_SECONDS);
    if (elapsed >= PROGRESS_INTERVAL_SECONDS && progressBucket > lastProgressBucket) {
      lastProgressBucket = progressBucket;
      const remaining = estimated - elapsed;
      if (remaining > 0) console.log('STATUS_UPDATE: Image is still generating... (' + elapsed + 's elapsed, ~' + remaining + 's remaining)');
      else console.log('STATUS_UPDATE: Image is still generating... (' + elapsed + 's elapsed)');
    }

    const response = await fetch(config.baseUrl + '/v1/tasks/' + encodeURIComponent(taskId), {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + config.apiKey }
    });
    const parsed = await readJsonResponse(response);
    if (!response.ok) fail(friendlyApiError(response.status, parsed.json || parsed.text));
    const body = parsed.json || {};
    const status = body.status || '';

    if (['completed', 'succeed', 'success', 'done'].includes(status)) {
      const urls = collectImageUrls(body);
      if (urls.length === 0) fail('Task completed but no image URL was found: ' + JSON.stringify(body));
      await saveImageUrls(urls, outDir, elapsed, body);
      return;
    }

    if (status === 'failed') {
      fail('Generation failed: ' + JSON.stringify(body.error || body));
    }

    interval = elapsed > POLL_SLOW_AFTER_SECONDS ? POLL_SLOW_INTERVAL_MS : POLL_FAST_INTERVAL_MS;
  }
}

async function main() {
  const envFile = loadEnvFromProject();
  const options = parseArgs(process.argv.slice(2));
  validateOptions(options);
  fs.mkdirSync(options.outDir, { recursive: true });
  const payload = buildPayload(options);
  const config = getConfig();

  if (options.dryRun) {
    console.log('CONFIG: api_base=' + (config.baseUrl || 'missing') + ' api_key=' + (config.apiKey ? 'present' : 'missing') + ' env_file=' + (envFile || 'none') + ' out_dir=' + options.outDir);
    console.log('DRY_RUN: model=' + options.model);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  if (!config.baseUrl) fail('GPT_IMAGE_BASE_URL is required. Set it in your environment or project .env file.');
  if (!config.apiKey) fail('GPT_IMAGE_API_KEY is required. Set it in your environment or project .env file.');

  console.log('INFO: Submitting image generation request (model=' + options.model + ', size=' + options.size + ', quality=' + options.quality + ', count=' + options.count + ')');
  const start = Date.now();
  const submitted = await submitGeneration(config, payload);
  if (submitted.imageUrls) {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    await saveImageUrls(submitted.imageUrls, options.outDir, elapsed, submitted.result);
    return;
  }
  console.log('TASK_SUBMITTED: task_id=' + submitted.taskId + ' estimated=' + submitted.estimated + 's');
  await pollTask(config, submitted.taskId, submitted.estimated, options.outDir);
}

main().catch((err) => {
  fail(err && err.message ? err.message : String(err));
});
