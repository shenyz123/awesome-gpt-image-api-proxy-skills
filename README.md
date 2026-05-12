## 致谢 / Acknowledgments

本项目基于 [原项目GitHub链接](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 进行开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# awesome-gpt-image-api-proxy-skills

<p align="center">
  <strong>GPT Image API proxy skill for OpenClaw, Claude Code, OpenCode, Cursor, and AI agents that need configurable image generation with local file output.</strong>
</p>

<p align="center">
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md"><img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a>
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18">
  <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy">
</p>

<p align="center">
  <a href="#-menu">Menu</a> •
  <a href="#installation">Install</a> •
  <a href="#configuration">Configure</a> •
  <a href="#-showcase">Showcase</a> •
  <a href="#gpt-image-api-proxy-generation">Generation</a> •
  <a href="#output-protocol">Output</a>
</p>

<p align="center">
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.md">English</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.es.md">Español</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.pt.md">Português</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.ja.md">日本語</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.ko.md">한국어</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.de.md">Deutsch</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.fr.md">Français</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.tr.md">Türkçe</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.zh-TW.md">繁體中文</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.zh-CN.md">简体中文</a> |
  <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.ru.md">Русский</a>
</p>

---

> **AI Agent?** Skip the README and open [**llms-install.md**](https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/llms-install.md) for installation steps designed for agents.

---

## 📑 Menu

- [What is This?](#what-is-this)
- [Installation](#installation)
- [Configuration](#configuration)
- [Showcase](#-showcase)
- [GPT Image API Proxy Generation](#gpt-image-api-proxy-generation)
- [File Structure](#file-structure)
- [Troubleshooting](#troubleshooting)
- [Compatibility](#compatibility)
- [License](#license)
- [Community](#community)

---

## What is This?

**awesome-gpt-image-api-proxy-skills** is an AI agent image generation skill and npm installer for OpenAI-compatible GPT Image API proxies. It keeps the agent workflow from the original GPT Image skill, but removes the fixed gateway and reads runtime configuration from `GPT_IMAGE_BASE_URL` and `GPT_IMAGE_API_KEY` in a project `.env` file or system environment.

| Skill | Description | Default Model |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Text-to-image, image editing, batch generation, configurable API proxy, local downloads | `gpt-image-2` |

---

## Installation

### Install via npm

```bash
npx awesome-gpt-image-api-proxy-skills
```

Non-interactive install for agents or CI:

```bash
npx awesome-gpt-image-api-proxy-skills -y
```

Install to a specific skills directory:

```bash
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

### Manual install from this workspace

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

### Agent Auto-Install Prompt

```text
Install the awesome GPT Image API proxy skill by running:

npx awesome-gpt-image-api-proxy-skills@latest -y --path ~/.codex/skills

Then configure GPT_IMAGE_BASE_URL and GPT_IMAGE_API_KEY in the project .env file or environment variables. Read ~/.codex/skills/awesome-gpt-image-api-proxy-skills/SKILL.md before generating images.
```

---

## Configuration

Create a `.env` file in your project root or set system environment variables. System environment variables take precedence over `.env` values.

| Variable | Purpose |
|---|---|
| `GPT_IMAGE_BASE_URL` | Base URL for your image API proxy, without a trailing slash |
| `GPT_IMAGE_API_KEY` | Bearer token for the proxy |

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## 🖼️ Showcase

| Portrait Styling | Product Marketing | Character Design |
|---|---|---|
| <img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/character.jpg" alt="Character example" width="100%"> |

> The bundled showcase images illustrate what an image generation workflow can produce. Actual results depend on your configured API proxy and selected model.

---

## GPT Image API Proxy Generation

### What It Can Do

- **Text-to-image** — describe an image and get generated files
- **Image editing** — provide reference image URLs or local file paths; local files are converted to base64
- **Configurable model** — pass `--model=<model>`; default is `gpt-image-2`
- **Local output** — pass `--out=<path>`; default is `./gpt-image-files`
- **Batch generation** — generate up to 10 images per request
- **Dry run** — preview the JSON payload without calling the API
- **Flexible responses** — supports async task responses and synchronous OpenAI-style `data[].url` responses

### Usage Examples

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Add a desk lamp" --image=https://example.com/input.png --out=./edited-images
node ./scripts/gpt-image-gen.js "Remove the background" --image=D:/images/input.png --out=D:/gpt-images/
node ./scripts/gpt-image-gen.js "Pixel art robot" --count=4 --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --model=gpt-image-2 --out=./gpt-image-files --dry-run
```

### Requirements

- Node.js 18 or newer
- `GPT_IMAGE_BASE_URL` and `GPT_IMAGE_API_KEY` for real generation
- An API proxy that supports `POST /v1/images/generations` and `GET /v1/tasks/{task_id}`

### API Parameters

See [references/api-params.md](https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md) for endpoint, payload, result, and output details.

### Output Protocol

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
STATUS_UPDATE: <message>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
POLL_TIMEOUT: task_id=<id> dashboard=<base-url>
ERROR: <message>
```

---

## File Structure

```text
.
├── README.md                    # English README
├── README.*.md                  # Localized READMEs
├── SKILL.md                     # Skill definition for AI agents
├── _meta.json                   # Skill metadata
├── bin/
│   └── cli.js                   # npm installer CLI
├── references/
│   └── api-params.md            # API proxy parameter reference
└── scripts/
    ├── gpt-image-gen.js         # Cross-platform generator script
    └── gpt-image-gen.sh         # Bash wrapper for Unix shells
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | Set it in `.env` or the system environment. |
| `GPT_IMAGE_API_KEY is required` | Set a valid proxy token in `.env` or the system environment. |
| `401 Unauthorized` | Check `GPT_IMAGE_API_KEY` and proxy permissions. |
| No local image file | Check the `IMAGE_URL` download response and that `--out` is writable. |
| Generation timeout | The remote task may still be running. Check your proxy dashboard or task logs. |
| Wrong model used | Pass `--model=<model>` explicitly. |

---

## Compatibility

| Agent | Install Method |
|---|---|
| **Codex** | `npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills` |
| **Claude Code** | `npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills` |
| **OpenCode** | `npx awesome-gpt-image-api-proxy-skills -y --path ~/.opencode/skills` |
| **OpenClaw** | `npx awesome-gpt-image-api-proxy-skills -y --path ~/.openclaw/skills` |
| **Cursor / other agents** | `npx awesome-gpt-image-api-proxy-skills -y --path <your-skills-dir>` |

---

## License

MIT

---

## Community

- Skill definition: [SKILL.md](https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/SKILL.md)
- Agent installer guide: [llms-install.md](https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/llms-install.md)
- API reference: [references/api-params.md](https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md)

---

<p align="center">
  Built for configurable GPT Image API proxy workflows.
</p>


