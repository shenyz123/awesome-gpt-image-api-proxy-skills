## Agradecimientos

Este proyecto se desarrolla a partir del [proyecto original en GitHub](https://github.com/EvoLinkAI/gpt-image-2-gen-skill). Gracias a [evolink.ai](https://evolink.ai) por su excelente trabajo de código abierto.

# image-gen-proxy

<p align="center"><strong>Skill de proxy para GPT Image API orientado a Codex (OpenCode, Cursor y otros deben verificarlo por su cuenta), o para otros modelos según la interfaz que ofrezca el proxy de terceros. Permite generar y editar imágenes, con gateway configurable, parámetros de modelo y salida local de imágenes.</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="image-gen-proxy banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/image-gen-proxy"><img src="https://img.shields.io/npm/v/image-gen-proxy?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **¿Agente de IA?** Abre [**llms-install.md**](llms-install.md) para pasos de instalación pensados para agentes.

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

**image-gen-proxy** es un skill de generación de imágenes para agentes de IA y un instalador npm para proxies GPT Image compatibles con OpenAI. No usa una pasarela fija; lee `GPT_IMAGE_BASE_URL` y `GPT_IMAGE_API_KEY` desde `.env` o variables del sistema.

| Skill | Descripción | Modelo predeterminado |
|---|---|---|
| **Image Gen Proxy** | Texto a imagen, edición, generación por lotes, proxy configurable y descargas locales | `gpt-image-2` |

---

## Instalación

```bash
npx image-gen-proxy
npx image-gen-proxy -y --path ~/.codex/skills
npx image-gen-proxy -y --path ~/.claude/skills
```

Instalación manual:

```bash
cd image-gen-proxy
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
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

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



