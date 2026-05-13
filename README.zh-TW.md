## 致謝

本專案基於 [原 GitHub 專案](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 開發，感謝作者 [evolink.ai](https://evolink.ai) 提供的優秀開源成果！

# image-gen-proxy

<p align="center"><strong>面向 Codex（OpenCode、Cursor 等請自行驗證）的 GPT Image API（或其他模型，以第三方代理提供的介面為準）代理技能，可用於繪圖與修圖，支援可配置閘道、模型參數與本機圖片輸出。</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="image-gen-proxy banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/image-gen-proxy"><img src="https://img.shields.io/npm/v/image-gen-proxy?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **AI Agent?** 可跳過 README，直接閱讀 [**llms-install.md**](llms-install.md) 取得面向 Agent 的安裝步驟。

## 📑 選單

- [這是什麼？](#這是什麼)
- [安裝](#安裝)
- [設定](#設定)
- [展示](#展示)
- [GPT Image API 代理生成](#gpt-image-api-代理生成)
- [檔案結構](#檔案結構)
- [疑難排解](#疑難排解)
- [相容性](#相容性)
- [授權](#授權)

---

## 這是什麼？

**image-gen-proxy** 是 AI Agent 圖像生成技能與 npm 安裝器，用於對接 OpenAI 相容的 GPT Image API 代理。它不使用固定 API 閘道，而是從專案 `.env` 或系統環境讀取 `GPT_IMAGE_BASE_URL` 與 `GPT_IMAGE_API_KEY`。

| 技能 | 描述 | 預設模型 |
|---|---|---|
| **Image Gen Proxy** | 文生圖、圖像編輯、批量生成、可配置 API 代理、本機下載 | `gpt-image-2` |

---

## 安裝

```bash
npx image-gen-proxy
npx image-gen-proxy -y --path ~/.codex/skills
npx image-gen-proxy -y --path ~/.claude/skills
```

手動安裝：

```bash
cd image-gen-proxy
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## 設定

在專案根目錄建立 `.env`，或設定系統環境變數。系統環境變數優先於 `.env`。

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

| 變數 | 用途 |
|---|---|
| `GPT_IMAGE_BASE_URL` | 圖像 API 代理基礎位址，不要帶結尾斜線 |
| `GPT_IMAGE_API_KEY` | 代理的 Bearer Token |

---

## 展示

| 人像風格 | 產品行銷 | 角色設計 |
|---|---|---|
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## GPT Image API 代理生成

- `--model=<model>`：模型名稱，預設 `gpt-image-2`
- `--out=<path>`：輸出目錄，預設 `./gpt-image-files`，不存在時會自動建立
- `--image=<url-or-local-path[,url-or-local-path...]>`：參考圖；URL 原樣傳入，本機檔案會轉為 base64
- `--count=<1-10>`：批量生成數量
- `--dry-run`：只預覽 JSON payload，不呼叫遠端 API

```bash
node ./scripts/gpt-image-gen.js "海面上的美麗日落"
node ./scripts/gpt-image-gen.js "未來城市天際線" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "測試提示詞" --dry-run
```

### 輸出協議

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## 檔案結構

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## 疑難排解

| 問題 | 解法 |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | 在 `.env` 或系統環境中設定。 |
| `GPT_IMAGE_API_KEY is required` | 設定有效代理 Token。 |
| 沒有本機圖片檔案 | 檢查 `IMAGE_URL` 下載回應和 `--out` 權限。 |
| 模型不對 | 明確傳入 `--model=<model>`。 |

---

## 相容性

Codex、Claude Code、OpenCode、OpenClaw、Cursor 或任何支援 skills 目錄的 Agent 均可使用 `npx image-gen-proxy -y --path <skills-dir>` 安裝。

## 授權

MIT



