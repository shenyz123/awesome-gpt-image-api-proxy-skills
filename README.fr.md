## Remerciements

Ce projet est développé à partir du [projet GitHub original](https://github.com/EvoLinkAI/gpt-image-2-gen-skill). Merci à [evolink.ai](https://evolink.ai) pour son excellent travail open source.

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>Skill de proxy GPT Image API pour OpenClaw, Claude Code, OpenCode, Cursor et agents IA avec génération configurable et sortie locale.</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **Agent IA ?** Ouvrez [**llms-install.md**](llms-install.md) pour les étapes d’installation conçues pour les agents.

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
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

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



