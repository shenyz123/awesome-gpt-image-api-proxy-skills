#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const PKG_ROOT = path.resolve(__dirname, '..');
const SKILL_SLUG = 'image-gen-proxy';
const PKG_JSON = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'package.json'), 'utf8'));

function color(code, text) {
  return '\x1b[' + code + 'm' + text + '\x1b[0m';
}
function bold(text) { return color('1', text); }
function green(text) { return color('32', text); }
function yellow(text) { return color('33', text); }
function cyan(text) { return color('36', text); }
function dim(text) { return color('2', text); }

function printBanner() {
  console.log('');
  console.log(bold(cyan('image-gen-proxy')));
  console.log(dim('GPT Image API proxy skill installer, v' + PKG_JSON.version));
  console.log('');
}

function printHelp() {
  printBanner();
  console.log(bold('Usage:'));
  console.log('  npx image-gen-proxy');
  console.log('  npx image-gen-proxy -y --path <skills-dir>');
  console.log('  npx image-gen-proxy --llms');
  console.log('  npx image-gen-proxy --skill');
  console.log('  npx image-gen-proxy --version');
  console.log('');
  console.log(bold('Runtime environment:'));
  console.log('  GPT_IMAGE_BASE_URL   Base URL for your OpenAI-compatible image API proxy');
  console.log('  GPT_IMAGE_API_KEY    Bearer token for that proxy');
  console.log('');
  console.log(bold('Generator examples after installation:'));
  console.log('  node <skill-dir>/scripts/gpt-image-gen.js "a red circle" --dry-run');
  console.log('  node <skill-dir>/scripts/gpt-image-gen.js "a product photo" --model=gpt-image-2 --out=D:/gpt-images/');
}

function printFile(rel) {
  process.stdout.write(fs.readFileSync(path.join(PKG_ROOT, rel), 'utf8'));
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function expandHome(input) {
  if (!input) return input;
  return input.replace(/^~/, os.homedir());
}

function getArgValue(args, flag) {
  const eq = args.find((arg) => arg.startsWith(flag + '='));
  if (eq) return eq.slice(flag.length + 1);
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) return args[index + 1];
  return null;
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

async function detectSkillsDir(rl, opts) {
  if (opts.targetPath) {
    return path.resolve(expandHome(opts.targetPath));
  }

  const home = os.homedir();
  const candidates = [
    path.join(home, '.codex', 'skills'),
    path.join(home, '.claude', 'skills'),
    path.join(home, '.opencode', 'skills'),
    path.join(home, '.openclaw', 'skills'),
    path.join(home, '.cursor', 'skills')
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  if (opts.silent) {
    const defaultDir = path.join(home, '.codex', 'skills');
    fs.mkdirSync(defaultDir, { recursive: true });
    return defaultDir;
  }

  const answer = await ask(rl, 'Skills directory path (Enter for ~/.codex/skills): ');
  return path.resolve(expandHome(answer.trim() || path.join(home, '.codex', 'skills')));
}

async function copySkillFiles(skillsDir, rl, opts) {
  const installPath = path.join(skillsDir, SKILL_SLUG);
  if (fs.existsSync(installPath) && !opts.silent) {
    const answer = await ask(rl, 'Skill already exists at ' + installPath + '. Overwrite copied files? (y/N): ');
    if (!answer.trim().toLowerCase().startsWith('y')) {
      console.log(yellow('Skipped existing installation.'));
      return installPath;
    }
  }

  fs.mkdirSync(installPath, { recursive: true });
  copyFile(path.join(PKG_ROOT, 'SKILL.md'), path.join(installPath, 'SKILL.md'));
  copyFile(path.join(PKG_ROOT, '_meta.json'), path.join(installPath, '_meta.json'));
  copyFile(path.join(PKG_ROOT, 'llms-install.md'), path.join(installPath, 'llms-install.md'));
  copyDir(path.join(PKG_ROOT, 'scripts'), path.join(installPath, 'scripts'));
  copyDir(path.join(PKG_ROOT, 'references'), path.join(installPath, 'references'));
  return installPath;
}

function printRuntimeHint() {
  console.log('');
  console.log(bold('Runtime configuration:'));
  console.log('  Set GPT_IMAGE_BASE_URL and GPT_IMAGE_API_KEY in your shell or in a project .env file.');
  console.log('  Example .env:');
  console.log('    GPT_IMAGE_BASE_URL=https://your-proxy.example.com');
  console.log('    GPT_IMAGE_API_KEY=your_key_here');
}

async function runInstall(args) {
  const silent = args.includes('-y') || args.includes('--yes');
  const targetPath = getArgValue(args, '--path');
  printBanner();

  if (silent) {
    const skillsDir = await detectSkillsDir(null, { silent, targetPath });
    const installPath = await copySkillFiles(skillsDir, null, { silent });
    console.log(green('Installed to: ') + installPath);
    printRuntimeHint();
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const skillsDir = await detectSkillsDir(rl, { silent, targetPath });
    const installPath = await copySkillFiles(skillsDir, rl, { silent });
    console.log(green('Installed to: ') + installPath);
    printRuntimeHint();
  } finally {
    rl.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--version') || args.includes('-v')) {
    console.log(PKG_JSON.version);
    return;
  }
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }
  if (args.includes('--llms')) {
    printFile('llms-install.md');
    return;
  }
  if (args.includes('--skill')) {
    printFile('SKILL.md');
    return;
  }
  await runInstall(args);
}

main().catch((err) => {
  console.error('ERROR: ' + err.message);
  process.exit(1);
});
