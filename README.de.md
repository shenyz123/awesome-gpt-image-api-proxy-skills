## Danksagung

Dieses Projekt wurde auf Basis des [ursprünglichen GitHub-Projekts](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) entwickelt. Vielen Dank an [evolink.ai](https://evolink.ai) für die hervorragende Open-Source-Arbeit.

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>GPT Image API Proxy Skill für OpenClaw, Claude Code, OpenCode, Cursor und KI-Agenten mit konfigurierbarer Bilderzeugung und lokaler Ausgabe.</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **KI-Agent?** Öffne [**llms-install.md**](llms-install.md) für agentenfreundliche Installationsschritte.

## 📑 Menü

- [Was ist das?](#was-ist-das)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Showcase](#showcase)
- [GPT Image API Proxy Generierung](#gpt-image-api-proxy-generierung)
- [Dateistruktur](#dateistruktur)
- [Fehlerbehebung](#fehlerbehebung)
- [Kompatibilität](#kompatibilität)
- [Lizenz](#lizenz)

---

## Was ist das?

**awesome-gpt-image-api-proxy-skills** ist ein Bildgenerierungs-Skill für KI-Agenten und ein npm-Installer für OpenAI-kompatible GPT-Image-API-Proxys. Es gibt kein festes Gateway; `GPT_IMAGE_BASE_URL` und `GPT_IMAGE_API_KEY` werden aus `.env` oder Systemvariablen gelesen.

| Skill | Beschreibung | Standardmodell |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Text-zu-Bild, Bildbearbeitung, Batch-Generierung, konfigurierbarer Proxy, lokale Downloads | `gpt-image-2` |

---

## Installation

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

Manuell:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## Konfiguration

Erstelle eine `.env` im Projektstamm oder setze Systemvariablen. Systemvariablen haben Vorrang.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## Showcase

| Portrait | Produkt | Charakter |
|---|---|---|
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## GPT Image API Proxy Generierung

- `--model=<model>`: Modellname, Standard `gpt-image-2`
- `--out=<path>`: Ausgabeverzeichnis, Standard `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: Referenzbilder; URLs bleiben unverändert, lokale Dateien werden zu base64 konvertiert
- `--count=<1-10>`: Batch-Größe
- `--dry-run`: Payload ohne API-Aufruf anzeigen

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### Ausgabeprotokoll

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## Dateistruktur

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## Fehlerbehebung

| Problem | Lösung |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | In `.env` oder Systemumgebung setzen. |
| `GPT_IMAGE_API_KEY is required` | Gültigen Proxy-Token setzen. |
| Keine lokale Bilddatei | `IMAGE_URL`-Download und `--out`-Rechte prüfen. |
| Falsches Modell | `--model=<model>` explizit setzen. |

---

## Kompatibilität

Codex, Claude Code, OpenCode, OpenClaw, Cursor und andere Agents mit Skills-Verzeichnis.

## Lizenz

MIT



