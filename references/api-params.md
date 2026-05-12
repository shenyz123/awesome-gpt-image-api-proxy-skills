# GPT Image API Proxy Parameters

The generator calls an OpenAI-compatible image API proxy configured by environment variables.

## Environment

| Name | Required | Description |
| --- | --- | --- |
| GPT_IMAGE_BASE_URL | Yes for real requests | Base URL of the image API proxy. Do not include a trailing slash. |
| GPT_IMAGE_API_KEY | Yes for real requests | Bearer token sent as Authorization: Bearer <key>. |

Values can be stored in a project .env file or in system environment variables. System environment variables take precedence.

## Endpoints

~~~text
POST {GPT_IMAGE_BASE_URL}/v1/images/generations
GET  {GPT_IMAGE_BASE_URL}/v1/tasks/{task_id}
~~~

## Generator Options

| Option | Default | Description |
| --- | --- | --- |
| --model | gpt-image-2 | Model name sent as payload.model. |
| --out | ./gpt-image-files | Directory for downloaded image files. Created when missing. |
| --image | none | Comma-separated reference image URLs or local image file paths for editing. Local files are converted to base64 before submission. |
| --size | auto | auto, ratio such as 16:9, or pixels such as 1024x1024. |
| --resolution | 1K for ratio sizes | 1K, 2K, or 4K. Ignored for pixel sizes and auto. |
| --quality | medium | low, medium, or high. |
| --count | 1 | Number of images, 1 to 10. |
| --callback | none | HTTPS callback URL. |
| --dry-run | false | Print payload and create output directory without network calls. |

## Request Payload

~~~json
{
  "model": "gpt-image-2",
  "prompt": "image description",
  "size": "auto",
  "quality": "medium",
  "n": 1
}
~~~

Optional fields: resolution, image, callback_url.

### Image Input

The Right Code compatible request field for reference images is `image`.

- Remote URLs passed with `--image=https://...` are sent unchanged.
- Local paths passed with `--image=./input.png` or `--image=D:/images/input.png` are read from disk and sent as base64 strings.
- Multiple images can be comma-separated.

~~~json
{
  "model": "gpt-image-2",
  "prompt": "edit this image",
  "image": [
    "https://example.com/input.png",
    "iVBORw0KGgoAAAANSUhEUg..."
  ]
}
~~~

## Expected Responses

The proxy can return either an asynchronous task response or a synchronous OpenAI-compatible image response.

### Synchronous OpenAI-compatible Response

If the generation endpoint returns image URLs directly, the script downloads them immediately and does not poll a task endpoint:

~~~json
{
  "created": 1778568641,
  "data": [
    {
      "url": "https://cdn.example.com/image.png"
    }
  ],
  "usage": {
    "total_tokens": 6259
  }
}
~~~

### Asynchronous Task Response

Generation response should include id or task_id:

~~~json
{
  "id": "task-123",
  "status": "pending",
  "task_info": { "estimated_time": 60 }
}
~~~

Task status should eventually return status completed and image URLs in results, image_url, or url:

~~~json
{
  "id": "task-123",
  "status": "completed",
  "results": ["https://cdn.example.com/image.png"]
}
~~~

The script prints IMAGE_URL for each remote URL and IMAGE_FILE for each downloaded local file.

