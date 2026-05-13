## Благодарности

Этот проект разработан на основе [исходного проекта на GitHub](https://github.com/EvoLinkAI/gpt-image-2-gen-skill). Спасибо [evolink.ai](https://evolink.ai) за отличную работу с открытым исходным кодом.

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>Skill прокси GPT Image API для OpenClaw, Claude Code, OpenCode, Cursor и AI-агентов с настраиваемой генерацией и локальным выводом файлов.</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **AI-агент?** Инструкции для агентов находятся в [**llms-install.md**](llms-install.md).

## 📑 Меню

- [Что это?](#что-это)
- [Установка](#установка)
- [Настройка](#настройка)
- [Примеры](#примеры)
- [Генерация через GPT Image API proxy](#генерация-через-gpt-image-api-proxy)
- [Структура файлов](#структура-файлов)
- [Устранение проблем](#устранение-проблем)
- [Совместимость](#совместимость)
- [Лицензия](#лицензия)

---

## Что это?

**awesome-gpt-image-api-proxy-skills** — это skill генерации изображений для AI-агентов и npm-установщик для OpenAI-совместимых прокси GPT Image API. Он не использует фиксированный gateway; `GPT_IMAGE_BASE_URL` и `GPT_IMAGE_API_KEY` читаются из `.env` или системного окружения.

| Skill | Описание | Модель по умолчанию |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Text-to-image, редактирование, пакетная генерация, настраиваемый proxy, локальные загрузки | `gpt-image-2` |

---

## Установка

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

Ручная установка:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## Настройка

Создайте `.env` в корне проекта или задайте системные переменные. Системные переменные имеют приоритет.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## Примеры

| Портрет | Продукт | Персонаж |
|---|---|---|
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## Генерация через GPT Image API proxy

- `--model=<model>`: имя модели, по умолчанию `gpt-image-2`
- `--out=<path>`: каталог вывода, по умолчанию `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: изображения-референсы; URL передаются как есть, локальные файлы конвертируются в base64
- `--count=<1-10>`: пакетная генерация
- `--dry-run`: показать payload без вызова API

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### Протокол вывода

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## Структура файлов

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## Устранение проблем

| Проблема | Решение |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | Задайте в `.env` или системном окружении. |
| `GPT_IMAGE_API_KEY is required` | Укажите действительный token. |
| Нет локального файла | Проверьте загрузку `IMAGE_URL` и права `--out`. |
| Неверная модель | Укажите `--model=<model>`. |

---

## Совместимость

Codex, Claude Code, OpenCode, OpenClaw, Cursor и другие агенты с каталогом skills.

## Лицензия

MIT



