## 감사의 말

이 프로젝트는 [원본 GitHub 프로젝트](https://github.com/EvoLinkAI/gpt-image-2-gen-skill)를 기반으로 개발되었습니다. 훌륭한 오픈소스 결과물을 제공해 준 [evolink.ai](https://evolink.ai)에 감사드립니다.

# awesome-gpt-image-api-proxy-skills

<p align="center"><strong>OpenClaw, Claude Code, OpenCode, Cursor 및 AI 에이전트를 위한 GPT Image API 프록시 Skill입니다. 설정 가능한 이미지 생성과 로컬 출력에 대응합니다.</strong></p>
<p align="center"><a href="references/api-params.md"><img src="assets/banner.jpg" alt="awesome-gpt-image-api-proxy-skills banner" width="100%" /></a></p>
<p align="center"><a href="https://www.npmjs.com/package/awesome-gpt-image-api-proxy-skills"><img src="https://img.shields.io/npm/v/awesome-gpt-image-api-proxy-skills?color=cb3837&label=npm" alt="NPM version"></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a> <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node.js >=18"> <img src="https://img.shields.io/badge/API-Proxy-6f42c1" alt="Configurable API proxy"></p>
<p align="center"><a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.pt.md">Português</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.tr.md">Türkçe</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.ru.md">Русский</a></p>

---

> **AI 에이전트인가요?** 에이전트용 설치 절차는 [**llms-install.md**](llms-install.md)를 확인하세요.

## 📑 메뉴

- [이것은 무엇인가요?](#이것은-무엇인가요)
- [설치](#설치)
- [설정](#설정)
- [쇼케이스](#쇼케이스)
- [GPT Image API 프록시 생성](#gpt-image-api-프록시-생성)
- [파일 구조](#파일-구조)
- [문제 해결](#문제-해결)
- [호환성](#호환성)
- [라이선스](#라이선스)

---

## 이것은 무엇인가요?

**awesome-gpt-image-api-proxy-skills** 는 OpenAI 호환 GPT Image API 프록시용 AI 에이전트 이미지 생성 Skill 및 npm 설치 도구입니다. 고정 게이트웨이를 사용하지 않고 `.env` 또는 시스템 환경에서 `GPT_IMAGE_BASE_URL` 과 `GPT_IMAGE_API_KEY` 를 읽습니다.

| Skill | 설명 | 기본 모델 |
|---|---|---|
| **Awesome GPT Image API Proxy Skills** | 텍스트 이미지 생성, 이미지 편집, 배치 생성, 설정 가능한 API 프록시, 로컬 저장 | `gpt-image-2` |

---

## 설치

```bash
npx awesome-gpt-image-api-proxy-skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.codex/skills
npx awesome-gpt-image-api-proxy-skills -y --path ~/.claude/skills
```

수동 설치:

```bash
cd awesome-gpt-image-api-proxy-skills
node ./bin/cli.js -y --path ~/.codex/skills
```

---

## 설정

프로젝트 루트에 `.env` 를 만들거나 시스템 환경 변수를 설정하세요. 시스템 환경 변수가 우선합니다.

```bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
```

---

## 쇼케이스

| 인물 | 제품 | 캐릭터 |
|---|---|---|
| <img src="assets/showcase/portrait.jpg" alt="Portrait example" width="100%"> | <img src="assets/showcase/product.jpg" alt="Product example" width="100%"> | <img src="assets/showcase/character.jpg" alt="Character example" width="100%"> |

---

## GPT Image API 프록시 생성

- `--model=<model>`: 모델 이름, 기본값 `gpt-image-2`
- `--out=<path>`: 출력 디렉터리, 기본값 `./gpt-image-files`
- `--image=<url-or-local-path[,url-or-local-path...]>`: 참조 이미지. URL은 그대로 보내고 로컬 파일은 base64로 변환합니다
- `--count=<1-10>`: 배치 생성 수
- `--dry-run`: API 호출 없이 payload 표시

```bash
node ./scripts/gpt-image-gen.js "A beautiful sunset over the ocean"
node ./scripts/gpt-image-gen.js "Cinematic cityscape" --model=gpt-image-2 --out=D:/gpt-images/ --size=16:9 --resolution=4K --quality=high
node ./scripts/gpt-image-gen.js "Test prompt" --dry-run
```

### 출력 프로토콜

```text
TASK_SUBMITTED: task_id=<id> estimated=<Ns>
IMAGE_URL=<remote-url>
IMAGE_FILE=<local-path>
ELAPSED=<Ns>
ERROR: <message>
```

---

## 파일 구조

```text
.
├── README.md / README.*.md
├── SKILL.md
├── bin/cli.js
├── references/api-params.md
└── scripts/gpt-image-gen.js
```

---

## 문제 해결

| 문제 | 해결 |
|---|---|
| `GPT_IMAGE_BASE_URL is required` | `.env` 또는 시스템 환경에 설정하세요. |
| `GPT_IMAGE_API_KEY is required` | 유효한 토큰을 설정하세요. |
| 로컬 이미지 파일 없음 | `IMAGE_URL` 다운로드와 `--out` 권한을 확인하세요. |
| 모델이 다름 | `--model=<model>` 을 명시하세요. |

---

## 호환성

Codex, Claude Code, OpenCode, OpenClaw, Cursor 및 skills 디렉터리를 가진 모든 에이전트.

## 라이선스

MIT




