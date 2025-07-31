# Jewish Timeline Image Service

## Quick Start (Get Images NOW!)

### Option 1: Replicate (Recommended - Unlimited)
```bash
# 1. Sign up at https://replicate.com (free)
# 2. Get API token: https://replicate.com/account/api-tokens
# 3. Install and configure:
cd image-service
npm install
cp .env.example .env
# Edit .env and add your REPLICATE_API_TOKEN

# 4. Generate ALL images (~1 cent total):
npm run generate

# 5. Generate single image:
npm run generate:single abraham-journey
```

### Option 2: Use Flux via Huggingface MCP
Just ask Claude: "Generate abraham-journey image with Flux"

### Option 3: Local Generation (Free, Mac M1/M2)
```bash
pip install mlx-flux
python -m mlx_flux.generate --prompt "..." --steps 4 --model schnell
```

## Why This Architecture?

1. **No Limits**: Replicate = pay-per-use, no rate limits
2. **Clean Git**: Images stored externally, not in repo
3. **Fast Dev**: Placeholders locally, CDN in production
4. **Scalable**: Generate 10 or 10,000 images

## Costs
- Replicate: $0.0011 per image
- 12 images: ~$0.013 (1 cent)
- 1000 images: ~$1.10

## The Prompts
All your carefully crafted prompts are already loaded in the script!