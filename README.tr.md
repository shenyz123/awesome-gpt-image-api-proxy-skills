## 致谢 / Acknowledgments

本项目基于 [原项目GitHub链接](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 进行开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>OpenClaw, Claude Code, OpenCode, Cursor ve yerel çıktı isteyen AI ajanları için yapılandırılabilir GPT Image API proxy skill’i.</strong></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md"><img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.md">English</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.es.md">Español</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.pt.md">Português</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ja.md">日本語</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ko.md">한국어</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.de.md">Deutsch</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.fr.md">Français</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.tr.md">Türkçe</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-TW.md">繁體中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-CN.md">简体中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ru.md">Русский</a></p>

---

> **AI ajanı mı?** Ajanlar için hazırlanmış kurulum adımları için [**llms-install.md**](https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/llms-install.md) dosyasını açın.

## 📑 Menü

- [Bu nedir?](#bu-nedir)
- [Kurulum](#kurulum)
- [Yapılandırma](#yapılandırma)
- [Vitrin](#vitrin)
- [GPT Image API Proxy Üretimi](#gpt-image-api-proxy-üretimi)
- [Dosya yapısı](#dosya-yapısı)
- [Sorun giderme](#sorun-giderme)
- [Uyumluluk](#uyumluluk)
- [Lisans](#lisans)

---

## Bu nedir?

**awesome-gpt-image-api-proxy-skills**, OpenAI uyumlu GPT Image API proxy’leri için bir AI ajan görüntü üretim skill’i ve npm kurucusudur. Sabit gateway kullanmaz; `GPT_IMAGE_BASE_URL` ve `GPT_IMAGE_API_KEY` değerlerini `.env` veya sistem ortamından okur.

| Skill | Açıklama | Varsayılan model |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Metinden görsel, düzenleme, toplu üretim, yapılandırılabilir proxy, yerel indirme | `gpt-image-2` |

---

## Kurulum

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

Manuel kurulum:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## Yapılandırma

Proje kökünde `.env` oluşturun veya sistem ortam değişkenlerini ayarlayın. Sistem değişkenleri önceliklidir.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## Vitrin

| Portre | Ürün | Karakter |
|---|---|---|
| <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## GPT Image API Proxy Üretimi

- `--model=<model>`: model adı, varsayılan `gpt-image-2`
- `--out=<path>`: çıktı dizini, varsayılan `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: referans görseller; URL değişmeden gönderilir, yerel dosyalar base64 olur
- `--count=<1-10>`: toplu üretim sayısı
- `--dry-run`: API çağırmadan payload gösterir

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### Çıktı protokolü

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## Dosya yapısı

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## Sorun giderme

| Sorun | Çözüm |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | `.env` veya sistem ortamında ayarlayın. |
| `GPT_IMAGE_API_KEY is required` | Geçerli bir token ayarlayın. |
| Yerel dosya yok | `IMAGE_URL` indirmesini ve `--out` izinlerini kontrol edin. |
| Yanlış model | `--model=<model>` belirtin. |

---

## Uyumluluk

Codex, Claude Code, OpenCode, OpenClaw, Cursor ve skills dizini olan diğer ajanlar.

## Lisans

MIT



