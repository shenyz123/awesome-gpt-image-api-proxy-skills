## Agradecimentos

Este projeto foi desenvolvido com base no [projeto original no GitHub](https://github.com/EvoLinkAI/gpt-image-2-gen-skill). Agradecemos a [evolink.ai](https://evolink.ai) pelo excelente trabalho open source.

# image-gen-proxy

<p align="center"><strong>Skill de proxy para GPT Image API voltado ao Codex (OpenCode, Cursor e outros devem ser verificados por conta própria), ou para outros modelos conforme a interface fornecida pelo proxy de terceiros. Permite gerar e editar imagens, com gateway configurável, parâmetros de modelo e saída local de imagens.</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="image-gen-proxy banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/image-gen-proxy"><img src="https://img.shields.io/npm/v/image-gen-proxy?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **Agente de IA?** Abra [**llms-install.md**](llms-install.md) para instruções de instalação feitas para agentes.

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

**image-gen-proxy** é um skill de geração de imagens para agentes de IA e um instalador npm para proxies GPT Image compatíveis com OpenAI. Ele não usa gateway fixo; lê `GPT_IMAGE_BASE_URL` e `GPT_IMAGE_API_KEY` de `.env` ou variáveis do sistema.

| Skill | Descrição | Modelo padrão |
|---|---|---|
| **Image Gen Proxy** | Texto para imagem, edição, lotes, proxy configurável e downloads locais | `gpt-image-2` |

---

## Instalação

```bash
npx image-gen-proxy
npx image-gen-proxy -y --path ~/.codex/skills
npx image-gen-proxy -y --path ~/.claude/skills
```

Instalação manual:

```bash
cd image-gen-proxy
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
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

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



