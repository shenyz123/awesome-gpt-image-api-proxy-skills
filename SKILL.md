---
name: image-gen-proxy
description: Generate and edit images through an OpenAI-compatible GPT Image API proxy. Use when Codex needs text-to-image, image editing with reference URLs, batch image generation, custom model selection with --model, local output download with --out, or runtime configuration from GPT_IMAGE_BASE_URL and GPT_IMAGE_API_KEY in .env or environment variables.
---

# Image Gen Proxy

Use this skill to generate or edit images through a configurable GPT Image API proxy.

## Runtime Configuration

Before generating images, ensure these variables exist in the current project .env file or in the system environment:

- GPT_IMAGE_BASE_URL: base URL of the image API proxy, for example https://your-proxy.example.com
- GPT_IMAGE_API_KEY: bearer token for that proxy

System environment variables take precedence over values from .env. The script searches for .env from the current working directory upward.

## Script

Resolve SKILL_DIR as the directory containing this SKILL.md, then run:

~~~bash
node {SKILL_DIR}/scripts/gpt-image-gen.js "prompt" [options]
~~~

Options:

- --model=<model> or --model <model>: model name, default gpt-image-2
- --out=<path> or --out <path>: output directory, default ./gpt-image-files from the current working directory
- --image=<url-or-local-path[,url-or-local-path...]>: reference images for editing; URLs are sent unchanged, local files are converted to base64
- --size=<auto|ratio|WxH>: default auto
- --resolution=<1K|2K|4K>: used with ratio sizes, default 1K when a ratio is provided
- --quality=<low|medium|high>: default medium
- --count=<1-10>: default 1
- --callback=<https://...>: optional completion callback URL
- --dry-run: print payload and create the output directory without calling the API

The Bash wrapper remains available for Unix shells:

~~~bash
{SKILL_DIR}/scripts/gpt-image-gen.sh "prompt" --model=gpt-image-2
~~~

## Agent Flow

1. Confirm GPT_IMAGE_BASE_URL and GPT_IMAGE_API_KEY are available in .env or environment variables. Do not ask for these if the user already configured them.
2. Determine whether the user wants text-to-image or image editing. If image URLs are present, treat the request as editing.
3. Use defaults unless the user asks otherwise: model gpt-image-2, size auto, quality medium, count 1, output directory ./gpt-image-files.
4. Tell the user generation is starting before running the script.
5. Run the script once. After TASK_SUBMITTED appears, do not retry unless the user explicitly asks because the remote task may already consume credits.
6. Relay STATUS_UPDATE lines during long generations.
7. Return both IMAGE_URL and IMAGE_FILE lines. IMAGE_FILE is the local saved output.

The script supports both response styles:

- async task response: the generation endpoint returns id/task_id, then the script polls /v1/tasks/{task_id}
- sync OpenAI-compatible response: the generation endpoint returns data[].url, then the script downloads files immediately

When the user provides local files with --image, pass the local paths directly. The script reads each file and sends base64 strings in the Right Code compatible payload field `image`.

## Examples

~~~bash
node {SKILL_DIR}/scripts/gpt-image-gen.js "a cinematic product photo of a glass perfume bottle" --model=gpt-image-2 --out=D:/gpt-images/
node {SKILL_DIR}/scripts/gpt-image-gen.js "add soft studio lighting" --image=https://example.com/input.png --size=1:1
node {SKILL_DIR}/scripts/gpt-image-gen.js "remove the background" --image=D:/images/input.png --out=D:/gpt-images/
node {SKILL_DIR}/scripts/gpt-image-gen.js "pixel art robot" --count=4 --quality=high --dry-run
~~~

## Output Protocol

- TASK_SUBMITTED: task_id=<id> estimated=<Ns>
- STATUS_UPDATE: <message>
- IMAGE_URL=<remote-url>
- IMAGE_FILE=<local-path>
- ELAPSED=<Ns>
- POLL_TIMEOUT: task_id=<id> dashboard=<base-url>
- ERROR: <message>

See references/api-params.md for API shape and parameter details.
