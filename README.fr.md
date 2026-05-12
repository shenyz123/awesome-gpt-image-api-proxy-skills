## 致谢 / Acknowledgments

本项目基于 [原项目GitHub链接](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 进行开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>Skill de proxy GPT Image API pour OpenClaw, Claude Code, OpenCode, Cursor et agents IA avec génération configurable et sortie locale.</strong></p>
<p align="center"><a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md"><img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.md">English</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.es.md">Español</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.pt.md">Português</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.ja.md">日本語</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.ko.md">한국어</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.de.md">Deutsch</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.fr.md">Français</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.tr.md">Türkçe</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.zh-TW.md">繁體中文</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.zh-CN.md">简体中文</a> | <a href="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/README.ru.md">Русский</a></p>

---

> **Agent IA ?** Ouvrez [**llms-install.md**](https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/llms-install.md) pour les étapes d’installation conçues pour les agents.

## 📑 Menu

- [Qu’est-ce que c’est ?](#quest-ce-que-cest-)
- [Installation](#installation)
- [Configuration](#configuration)
- [Aperçu](#aperçu)
- [Génération avec proxy GPT Image API](#génération-avec-proxy-gpt-image-api)
- [Structure des fichiers](#structure-des-fichiers)
- [Dépannage](#dépannage)
- [Compatibilité](#compatibilité)
- [Licence](#licence)

---

## Qu’est-ce que c’est ?

**awesome-gpt-image-api-proxy-skills** est un skill de génération d’images pour agents IA et un installateur npm pour les proxies GPT Image compatibles OpenAI. Il n’utilise pas de passerelle fixe ; `GPT_IMAGE_BASE_URL` et `GPT_IMAGE_API_KEY` sont lus depuis `.env` ou l’environnement système.

| Skill | Description | Modèle par défaut |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Texte vers image, édition, génération par lot, proxy configurable, téléchargements locaux | `gpt-image-2` |

---

## Installation

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

Installation manuelle :

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## Configuration

Créez un fichier `.env` à la racine du projet ou définissez des variables système. Les variables système sont prioritaires.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## Aperçu

| Portrait | Produit | Personnage |
|---|---|---|
| <img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="https://unpkg.com/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## Génération avec proxy GPT Image API

- `--model=<model>` : modèle, par défaut `gpt-image-2`
- `--out=<path>` : dossier de sortie, par défaut `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>` : images de référence ; les URLs sont envoyées telles quelles et les fichiers locaux sont convertis en base64
- `--count=<1-10>` : génération par lot
- `--dry-run` : affiche le payload sans appeler l’API

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### Protocole de sortie

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## Structure des fichiers

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## Dépannage

| Problème | Solution |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | Définissez-le dans `.env` ou l’environnement système. |
| `GPT_IMAGE_API_KEY is required` | Définissez un token valide. |
| Aucun fichier local | Vérifiez le téléchargement `IMAGE_URL` et les droits de `--out`. |
| Mauvais modèle | Passez explicitement `--model=<model>`. |

---

## Compatibilité

Codex, Claude Code, OpenCode, OpenClaw, Cursor et tout agent avec un répertoire de skills.

## Licence

MIT



