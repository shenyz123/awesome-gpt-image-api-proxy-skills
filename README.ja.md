## 致谢 / Acknowledgments

本项目基于 [原项目GitHub链接](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 进行开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>OpenClaw、Claude Code、OpenCode、Cursor、AI エージェント向けの GPT Image API プロキシ Skill。設定可能な画像生成とローカル出力に対応します。</strong></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md"><img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.md">English</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.es.md">Español</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.pt.md">Português</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ja.md">日本語</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ko.md">한국어</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.de.md">Deutsch</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.fr.md">Français</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.tr.md">Türkçe</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-TW.md">繁體中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-CN.md">简体中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ru.md">Русский</a></p>

---

> **AI エージェントですか？** エージェント向けの手順は [**llms-install.md**](https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/llms-install.md) を参照してください。

## 📑 メニュー

- [これは何ですか？](#これは何ですか)
- [インストール](#インストール)
- [設定](#設定)
- [ショーケース](#ショーケース)
- [GPT Image API プロキシ生成](#gpt-image-api-プロキシ生成)
- [ファイル構成](#ファイル構成)
- [トラブルシューティング](#トラブルシューティング)
- [互換性](#互換性)
- [ライセンス](#ライセンス)

---

## これは何ですか？

**awesome-gpt-image-api-proxy-skills** は、OpenAI 互換の GPT Image API プロキシ向けの AI エージェント画像生成 Skill と npm インストーラーです。固定ゲートウェイは使わず、`.env` またはシステム環境から `GPT_IMAGE_BASE_URL` と `GPT_IMAGE_API_KEY` を読み取ります。

| Skill | 説明 | 既定モデル |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | テキストから画像、画像編集、バッチ生成、設定可能な API プロキシ、ローカル保存 | `gpt-image-2` |

---

## インストール

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

手動インストール:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## 設定

プロジェクトルートに `.env` を作成するか、システム環境変数を設定します。システム環境変数が優先されます。

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## ショーケース

| ポートレート | プロダクト | キャラクター |
|---|---|---|
| <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## GPT Image API プロキシ生成

- `--model=<model>`: モデル名。既定は `gpt-image-2`
- `--out=<path>`: 出力先。既定は `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: 参照画像。URL はそのまま送信し、ローカルファイルは base64 に変換します
- `--count=<1-10>`: バッチ生成数
- `--dry-run`: API を呼ばず payload を表示

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### 出力プロトコル

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## ファイル構成

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## トラブルシューティング

| 問題 | 対処 |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | `.env` またはシステム環境に設定します。 |
| `GPT_IMAGE_API_KEY is required` | 有効なトークンを設定します。 |
| ローカル画像がない | `IMAGE_URL` のダウンロードと `--out` の権限を確認します。 |
| モデルが違う | `--model=<model>` を明示します。 |

---

## 互換性

Codex、Claude Code、OpenCode、OpenClaw、Cursor、および skills ディレクトリを持つ任意のエージェント。

## ライセンス

MIT



