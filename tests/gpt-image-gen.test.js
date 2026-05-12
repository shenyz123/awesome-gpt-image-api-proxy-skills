const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn, spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const packageJson = require(path.join(root, 'package.json'));
const generator = path.join(root, 'scripts', 'gpt-image-gen.js');
const cli = path.join(root, 'bin', 'cli.js');

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'gpt-image-skill-'));
}

function runNode(args, options = {}) {
  return spawnSync(process.execPath, args, {
    cwd: options.cwd || root,
    env: { ...process.env, ...(options.env || {}) },
    encoding: 'utf8',
  });
}

function runNodeAsync(args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, args, {
      cwd: options.cwd || root,
      env: { ...process.env, ...(options.env || {}) },
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('close', (status) => {
      resolve({ status, stdout, stderr });
    });
  });
}

function parseJsonFromStdout(stdout) {
  const start = stdout.indexOf('{');
  assert.notEqual(start, -1, stdout);
  return JSON.parse(stdout.slice(start));
}

async function withServer(handler, run) {
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, resolve));
  try {
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    await run(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('dry-run uses default model and creates default output directory', () => {
  const cwd = tempDir();
  const result = runNode([generator, 'a red circle on white background', '--dry-run'], { cwd });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /DRY_RUN: model=gpt-image-2/);
  assert.ok(fs.existsSync(path.join(cwd, 'gpt-image-files')));

  const payload = parseJsonFromStdout(result.stdout);
  assert.equal(payload.model, 'gpt-image-2');
  assert.equal(payload.prompt, 'a red circle on white background');
  assert.equal(payload.size, 'auto');
  assert.equal(payload.quality, 'medium');
  assert.equal(payload.n, 1);
});

test('custom model, output directory, image URLs, and callback are reflected in dry-run payload', () => {
  const cwd = tempDir();
  const outDir = path.join(cwd, 'images');
  const result = runNode([
    generator,
    'product photo',
    '--model=my-image-model',
    `--out=${outDir}`,
    '--size=16:9',
    '--resolution=4K',
    '--quality=high',
    '--count=2',
    '--image=https://example.com/a.png,https://example.com/b.webp',
    '--callback=https://example.com/hook',
    '--dry-run',
  ], { cwd });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(fs.existsSync(outDir));

  const payload = parseJsonFromStdout(result.stdout);
  assert.equal(payload.model, 'my-image-model');
  assert.equal(payload.size, '16:9');
  assert.equal(payload.resolution, '4K');
  assert.equal(payload.quality, 'high');
  assert.equal(payload.n, 2);
  assert.deepEqual(payload.image, [
    'https://example.com/a.png',
    'https://example.com/b.webp',
  ]);
  assert.equal(payload.callback_url, 'https://example.com/hook');
});

test('local --image file is converted to base64 in the image payload', () => {
  const cwd = tempDir();
  const imagePath = path.join(cwd, 'input.png');
  const imageBytes = Buffer.from('local-image-bytes');
  fs.writeFileSync(imagePath, imageBytes);

  const result = runNode([
    generator,
    'edit local image',
    `--image=${imagePath}`,
    '--dry-run',
  ], { cwd });

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const payload = parseJsonFromStdout(result.stdout);
  assert.deepEqual(payload.image, [imageBytes.toString('base64')]);
});

test('loads .env and lets system environment override it', () => {
  const cwd = tempDir();
  fs.writeFileSync(
    path.join(cwd, '.env'),
    [
      'GPT_IMAGE_BASE_URL=https://env-file.example',
      'GPT_IMAGE_API_KEY=env-file-key',
    ].join('\n'),
  );

  const result = runNode([generator, 'env test', '--dry-run'], {
    cwd,
    env: {
      GPT_IMAGE_BASE_URL: 'https://system.example',
      GPT_IMAGE_API_KEY: 'system-key',
    },
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /CONFIG: api_base=https:\/\/system\.example/);
  assert.doesNotMatch(result.stdout, /env-file\.example/);
});

test('CLI exposes new package version and skill output', () => {
  const version = runNode([cli, '--version']);
  assert.equal(version.status, 0, version.stderr || version.stdout);
  assert.equal(version.stdout.trim(), packageJson.version);

  const skill = runNode([cli, '--skill']);
  assert.equal(skill.status, 0, skill.stderr || skill.stdout);
  assert.match(skill.stdout, /name: awesome-gpt-image-api-proxy-skills/);
  assert.match(skill.stdout, /GPT_IMAGE_BASE_URL/);
  assert.match(skill.stdout, /GPT_IMAGE_API_KEY/);
});

test('downloads generated images to the output directory from a configured API proxy', async () => {
  const cwd = tempDir();
  const outDir = path.join(cwd, 'gpt-image-files');

  await withServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/v1/images/generations') {
      let body = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const payload = JSON.parse(body);
        assert.equal(payload.model, 'gpt-image-2');
        assert.equal(payload.prompt, 'local server test');
        assert.equal(payload.n, 1);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
          id: 'task-local-1',
          status: 'pending',
          task_info: { estimated_time: 0 },
        }));
      });
      return;
    }

    if (req.method === 'GET' && req.url === '/v1/tasks/task-local-1') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({
        id: 'task-local-1',
        status: 'completed',
        progress: 100,
        results: [`${req.headers.host ? `http://${req.headers.host}` : ''}/files/result.png`],
      }));
      return;
    }

    if (req.method === 'GET' && req.url === '/files/result.png') {
      res.writeHead(200, { 'content-type': 'image/png' });
      res.end(Buffer.from('fake-png'));
      return;
    }

    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }, async (baseUrl) => {
    const result = await runNodeAsync([generator, 'local server test', '--out', outDir], {
      cwd,
      env: {
        GPT_IMAGE_BASE_URL: baseUrl,
        GPT_IMAGE_API_KEY: 'local-key',
      },
    });

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /TASK_SUBMITTED: task_id=task-local-1/);
    assert.match(result.stdout, /IMAGE_URL=http:\/\/127\.0\.0\.1/);
    assert.match(result.stdout, /IMAGE_FILE=/);
    assert.ok(fs.existsSync(outDir));
    assert.equal(fs.readdirSync(outDir).length, 1);
  });
});

test('downloads images from synchronous OpenAI-compatible data response', async () => {
  const cwd = tempDir();
  const outDir = path.join(cwd, 'sync-output');

  await withServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/v1/images/generations') {
      let body = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const payload = JSON.parse(body);
        assert.equal(payload.model, 'gpt-image-2');
        assert.equal(payload.prompt, 'sync response test');
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
          created: 1778568641,
          data: [
            { url: `http://${req.headers.host}/files/sync-result.png` },
          ],
          usage: {
            total_tokens: 6259,
            input_tokens: 9,
            output_tokens: 6250,
          },
        }));
      });
      return;
    }

    if (req.method === 'GET' && req.url === '/files/sync-result.png') {
      res.writeHead(200, { 'content-type': 'image/png' });
      res.end(Buffer.from('sync-png'));
      return;
    }

    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }, async (baseUrl) => {
    const result = await runNodeAsync([generator, 'sync response test', '--out', outDir], {
      cwd,
      env: {
        GPT_IMAGE_BASE_URL: baseUrl,
        GPT_IMAGE_API_KEY: 'local-key',
      },
    });

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /IMAGE_URL=http:\/\/127\.0\.0\.1/);
    assert.match(result.stdout, /IMAGE_FILE=/);
    assert.match(result.stdout, /RESULT_JSON=/);
    assert.ok(fs.existsSync(outDir));
    assert.equal(fs.readdirSync(outDir).length, 1);
  });
});
