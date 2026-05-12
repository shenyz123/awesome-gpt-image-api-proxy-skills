## 致谢 / Acknowledgments

本项目基于 [原项目GitHub链接](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 进行开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>Skill de proxy GPT Image API para OpenClaw, Claude Code, OpenCode, Cursor y agentes de IA que necesitan generación configurable y salida local.</strong></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md"><img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.md">English</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.es.md">Español</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.pt.md">Português</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ja.md">日本語</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ko.md">한국어</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.de.md">Deutsch</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.fr.md">Français</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.tr.md">Türkçe</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-TW.md">繁體中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-CN.md">简体中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ru.md">Русский</a></p>

---

> **¿Agente de IA?** Abre [**llms-install.md**](https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/llms-install.md) para pasos de instalación pensados para agentes.

## 📑 Menú

- [¿Qué es esto?](#qué-es-esto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Galería](#galería)
- [Generación con proxy GPT Image API](#generación-con-proxy-gpt-image-api)
- [Estructura de archivos](#estructura-de-archivos)
- [Solución de problemas](#solución-de-problemas)
- [Compatibilidad](#compatibilidad)
- [Licencia](#licencia)

---

## ¿Qué es esto?

**awesome-gpt-image-api-proxy-skills** es un skill de generación de imágenes para agentes de IA y un instalador npm para proxies GPT Image compatibles con OpenAI. No usa una pasarela fija; lee `GPT_IMAGE_BASE_URL` y `GPT_IMAGE_API_KEY` desde `.env` o variables del sistema.

| Skill | Descripción | Modelo predeterminado |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Texto a imagen, edición, generación por lotes, proxy configurable y descargas locales | `gpt-image-2` |

---

## Instalación

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

Instalación manual:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto o define variables del sistema. Las variables del sistema tienen prioridad.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## Galería

| Retrato | Producto | Personaje |
|---|---|---|
| <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## Generación con proxy GPT Image API

- `--model=<model>`: modelo, por defecto `gpt-image-2`
- `--out=<path>`: directorio de salida, por defecto `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: imágenes de referencia; las URLs se envían igual y los archivos locales se convierten a base64
- `--count=<1-10>`: generación por lotes
- `--dry-run`: previsualiza el payload sin llamar a la API

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### Protocolo de salida

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## Estructura de archivos

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## Solución de problemas

| Problema | Solución |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | Configúralo en `.env` o en el sistema. |
| `GPT_IMAGE_API_KEY is required` | Configura un token válido. |
| Sin archivo local | Revisa la descarga de `IMAGE_URL` y permisos de `--out`. |
| Modelo incorrecto | Usa `--model=<model>`. |

---

## Compatibilidad

Codex, Claude Code, OpenCode, OpenClaw, Cursor y otros agentes con directorio de skills.

## Licencia

MIT



