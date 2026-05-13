## 致谢

本项目基于 [原 GitHub 项目](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# image-gen-proxy

<p align="center">
  <strong>面向 Codex（OpenCode、Cursor 等请自行验证）的 GPT Image API（或其他模型，以第三方代理提供的接口为准）代理技能，可以画图、修图，支持可配置网关、模型参数和本地图片输出。</strong>
</p>

<p align="center">
  <a href="references/api-params.md"><img src="assets/banner.jpg" alt="image-gen-proxy banner" width="100%" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/image-gen-proxy"><img src="https://img.shields.io/npm/v/image-gen-proxy?color=cb3837&label=npm" alt="NPM version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18">
  <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy">
</p>

<p align="center">
  <a href="#-菜单">菜单</a> •
  <a href="#安装">安装</a> •
  <a href="#配置">配置</a> •
  <a href="#-展示">展示</a> •
  <a href="#gpt-image-api-代理生成">生成</a> •
  <a href="#输出协议">输出</a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.ru.md">Русский</a>
</p>

---

> **AI Agent?** 可跳过 README，直接阅读 [**llms-install.md**](llms-install.md) 获取面向 Agent 的安装步骤。

---

## 📑 菜单

- [这是什么？](#这是什么)
- [安装](#安装)
- [配置](#配置)
- [展示](#-展示)
- [GPT Image API 代理生成](#gpt-image-api-代理生成)
- [文件结构](#文件结构)
- [故障排查](#故障排查)
- [兼容性](#兼容性)
- [许可证](#许可证)
- [社区](#社区)

---

## 这是什么？

**image-gen-proxy** 是一个 AI Agent 图像生成技能和 npm 安装器，用于对接 OpenAI 兼容的 GPT Image API 代理。它保留原 GPT Image 技能的 Agent 工作流，但移除了固定网关，改为从项目 `.env` 或系统环境读取 `GPT_IMAGE_BASE_URL` 和 `GPT_IMAGE_API_KEY`。

| 技能 | 描述 | 默认模型 |
|---|---|---|
| **Image Gen Proxy** | 文生图、图像编辑、批量生成、可配置 API 代理、本地下载 | `gpt-image-2` |

---

## 安装

### 通过 npm 安装

```bash
npx image-gen-proxy
```

AI Agent / CI 的非交互安装：

```bash
npx image-gen-proxy -y
```

安装到指定 skills 目录：

```bash
npx image-gen-proxy -y --path ~/.codex/skills
npx image-gen-proxy -y --path ~/.claude/skills
```

### 从当前工作区手动安装

```bash
cd image-gen-proxy
node ./bin/cli.js -y --path ~/.codex/skills
```

### Agent 自动安装提示词

```text
安装 awesome GPT Image API 代理技能，运行：

npx image-gen-proxy@latest -y --path ~/.codex/skills

然后在项目 .env 或系统环境中配置 GPT_IMAGE_BASE_URL 和 GPT_IMAGE_API_KEY。生成图片前读取 ~/.codex/skills/image-gen-proxy/SKILL.md。
```

---

## 配置

在项目根目录创建 `.env`，或设置系统环境变量。系统环境变量优先级高于 `.env`。

| 变量 | 用途 |
|---|---|
| `GPT_IMAGE_BASE_URL` | 图像 API 代理基础地址，不要带结尾斜杠 |
| `GPT_IMAGE_API_KEY` | 代理的 Bearer Token |

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## 🖼️ 展示

| 人像风格 | 产品营销 | 角色设计 |
|---|---|---|
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

> 内置展示图用于说明图像生成工作流可能产生的效果。实际结果取决于你配置的 API 代理和选择的模型。

---

## GPT Image API 代理生成

### 能力

- **文生图** — 描述画面并生成图片文件
- **图像编辑** — 提供参考图 URL 或本地文件路径；本地文件会转为 base64
- **可配置模型** — 使用 `--model=<model>`，默认 `gpt-image-2`
- **本地输出** — 使用 `--out=<path>`，默认 `./gpt-image-files`
- **批量生成** — 单次最多生成 10 张图片
- **Dry run** — 不请求 API，仅预览 JSON payload
- **灵活响应** — 同时支持异步 task 响应和同步 OpenAI 风格 `data[].url` 响应

### 使用示例

```bash
node ./scripts/gpt-image-gen.js "海面上的美丽日落"
node ./scripts/gpt-image-gen.js "未来城市天际线" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "添加一盏桌灯" --image=https://example.com/input.png --out=./edited-images
node ./scripts/gpt-image-gen.js "移除背景" --image=D:/images/input.png --out=D:/gpt-images/
node ./scripts/gpt-image-gen.js "像素风机器人" --count=4 --quality=high
node ./scripts/gpt-image-gen.js "测试提示词" --model=gpt-image-2 --out=./gpt-image-files --dry-run
```

### 系统要求

- Node.js 18 或更高版本
- 真实生成时需要设置 `GPT_IMAGE_BASE_URL` 和 `GPT_IMAGE_API_KEY`
- API 代理需要支持 `POST /v1/images/generations`

### API 参数

完整端点、payload、结果和输出说明见 [references/api-params.md](references/api-params.md)。

### 输出协议

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

## 文件结构

```text
.
├── README.md                    # 英文 README
├── README.*.md                  # 多语言 README
├── SKILL.md                     # 供 AI Agent 使用的技能定义
├── _meta.json                   # 技能元数据
├── bin/
│   └── cli.js                   # npm 安装器 CLI
├── references/
│   └── api-params.md            # API 代理参数参考
└── scripts/
    ├── gpt-image-gen.js         # 跨平台生成脚本
    └── gpt-image-gen.sh         # Unix shell 包装脚本
```

---

## 故障排查

| 问题 | 解决方案 |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | 在 `.env` 或系统环境中设置该变量。 |
| `GPT_IMAGE_API_KEY is required` | 在 `.env` 或系统环境中设置有效代理 Token。 |
| `401 Unauthorized` | 检查 `GPT_IMAGE_API_KEY` 和代理权限。 |
| 没有本地图片文件 | 检查 `IMAGE_URL` 下载响应，并确认 `--out` 目录可写。 |
| 生成超时 | 远程任务可能仍在运行，请检查代理面板或任务日志。 |
| 模型不对 | 显式传入 `--model=<model>`。 |

---

## 兼容性

| Agent | 安装方式 |
|---|---|
| **Codex** | `npx image-gen-proxy -y --path ~/.codex/skills` |
| **Claude Code** | `npx image-gen-proxy -y --path ~/.claude/skills` |
| **OpenCode** | `npx image-gen-proxy -y --path ~/.opencode/skills` |
| **OpenClaw** | `npx image-gen-proxy -y --path ~/.openclaw/skills` |
| **Cursor / 其他 Agent** | `npx image-gen-proxy -y --path <your-skills-dir>` |

---

## 许可证

MIT

---

## 社区

- 技能定义：[SKILL.md](SKILL.md)
- Agent 安装指南：[llms-install.md](llms-install.md)
- API 参考：[references/api-params.md](references/api-params.md)

---

<p align="center">
  为可配置 GPT Image API 代理工作流而构建。
</p>


