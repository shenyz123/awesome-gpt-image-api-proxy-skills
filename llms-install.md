# image-gen-proxy Agent Installation Guide

You are an AI agent. Install and use this skill when the user wants GPT Image generation through a configurable API proxy.

## Install

~~~bash
npx image-gen-proxy@latest -y --path {SKILLS_DIR}
~~~

Use the relevant skills directory:

| Agent | SKILLS_DIR |
| --- | --- |
| Codex | ~/.codex/skills |
| Claude Code | ~/.claude/skills |
| OpenCode | ~/.opencode/skills |
| OpenClaw | ~/.openclaw/skills |
| Other | ask the user |

## Configure

Check for GPT_IMAGE_BASE_URL and GPT_IMAGE_API_KEY in the current project .env file or system environment.

Example .env:

~~~bash
GPT_IMAGE_BASE_URL=https://your-image-api-proxy.example.com
GPT_IMAGE_API_KEY=your_key_here
~~~

## Load Skill

~~~bash
npx image-gen-proxy@latest --skill
~~~

Then follow SKILL.md. Use --dry-run for local validation without remote API calls.
