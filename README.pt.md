## 致谢 / Acknowledgments

本项目基于 [原项目GitHub链接](https://github.com/EvoLinkAI/gpt-image-2-gen-skill) 进行开发，感谢作者 [evolink.ai](https://evolink.ai) 提供的优秀开源成果！

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>Skill de proxy GPT Image API para OpenClaw, Claude Code, OpenCode, Cursor e agentes de IA que precisam de geração configurável e saída local.</strong></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/references/api-params.md"><img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.md">English</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.es.md">Español</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.pt.md">Português</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ja.md">日本語</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ko.md">한국어</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.de.md">Deutsch</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.fr.md">Français</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.tr.md">Türkçe</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-TW.md">繁體中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.zh-CN.md">简体中文</a> | <a href="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/README.ru.md">Русский</a></p>

---

> **Agente de IA?** Abra [**llms-install.md**](https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/llms-install.md) para instruções de instalação feitas para agentes.

## 📑 Menu

- [O que é isto?](#o-que-é-isto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Galeria](#galeria)
- [Geração com proxy GPT Image API](#geração-com-proxy-gpt-image-api)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Solução de problemas](#solução-de-problemas)
- [Compatibilidade](#compatibilidade)
- [Licença](#licença)

---

## O que é isto?

**awesome-gpt-image-api-proxy-skills** é um skill de geração de imagens para agentes de IA e um instalador npm para proxies GPT Image compatíveis com OpenAI. Ele não usa gateway fixo; lê `GPT_IMAGE_BASE_URL` e `GPT_IMAGE_API_KEY` de `.env` ou variáveis do sistema.

| Skill | Descrição | Modelo padrão |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | Texto para imagem, edição, lotes, proxy configurável e downloads locais | `gpt-image-2` |

---

## Instalação

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

Instalação manual:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## Configuração

Crie um `.env` na raiz do projeto ou defina variáveis do sistema. Variáveis do sistema têm prioridade.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## Galeria

| Retrato | Produto | Personagem |
|---|---|---|
| <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="https://cdn.jsdelivr.net/npm/awesome-gpt-image-api-proxy-skills@latest/assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## Geração com proxy GPT Image API

- `--model=<model>`: modelo, padrão `gpt-image-2`
- `--out=<path>`: diretório de saída, padrão `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: imagens de referência; URLs são enviadas como estão e arquivos locais viram base64
- `--count=<1-10>`: geração em lote
- `--dry-run`: mostra o payload sem chamar a API

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### Protocolo de saída

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## Estrutura de arquivos

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## Solução de problemas

| Problema | Solução |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | Defina em `.env` ou no sistema. |
| `GPT_IMAGE_API_KEY is required` | Defina um token válido. |
| Sem arquivo local | Verifique o download de `IMAGE_URL` e permissões de `--out`. |
| Modelo incorreto | Use `--model=<model>`. |

---

## Compatibilidade

Codex, Claude Code, OpenCode, OpenClaw, Cursor e outros agentes com diretório de skills.

## Licença

MIT



