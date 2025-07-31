# Image Generation Architecture for Jewish Timeline

## Problem
- Current limits: Huggingface (rate limits), Claude (context limits), GitHub (size limits)
- Need: Unlimited generation, persistence, sync with codebase
- Goal: Generate thousands of images without restrictions

## Recommended Architecture

### Directory Structure
```
jews/
├── frontend/                    # Main app (keep light)
│   └── public/images/events/   # Low-res placeholders only
├── image-service/              # Separate service for generation
│   ├── queue/                  # Generation queue
│   ├── generated/              # Temp storage
│   ├── scripts/               
│   └── package.json           
├── .gitignore                  # Ignore generated images
└── supabase/                   # Database + Storage
```

## Implementation Options

### Option 1: Replicate API (Recommended for Quick Start)
```javascript
// image-service/generate-unlimited.js
const Replicate = require('replicate');
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Pay per image (~$0.0011 per image)
// No rate limits
// High quality Flux output
```

### Option 2: Local Flux with MLX (Mac M1/M2)
```bash
# Install MLX Flux
pip install mlx-flux

# Run locally - unlimited, free, but slower
python -m mlx_flux.generate --prompt "..." --model flux-schnell
```

### Option 3: Self-Hosted GPU Server
```yaml
# docker-compose.yml for Vultr/RunPod GPU instance
version: '3'
services:
  comfyui:
    image: comfyui/comfyui:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

## Storage Strategy

### 1. Supabase Storage (Integrated with your DB)
```javascript
// Upload generated images
const { data, error } = await supabase.storage
  .from('timeline-images')
  .upload(`events/${eventId}.jpg`, imageBuffer);

// Get public URL
const { publicUrl } = supabase.storage
  .from('timeline-images')
  .getPublicUrl(`events/${eventId}.jpg`);
```

### 2. Update Database with URLs
```sql
-- Add image_url column to events
ALTER TABLE timeline_events 
ADD COLUMN image_url TEXT,
ADD COLUMN image_cdn_url TEXT,
ADD COLUMN image_generated_at TIMESTAMP;
```

## Batch Generation Script

```javascript
// image-service/batch-generate.js
const events = require('./events-to-generate.json');
const queue = require('bull')('image-generation');

// Add all events to queue
events.forEach(event => {
  queue.add('generate-image', {
    id: event.id,
    prompt: event.prompt,
    retries: 3
  });
});

// Process queue with concurrency limit
queue.process('generate-image', 5, async (job) => {
  const image = await generateWithReplicate(job.data.prompt);
  await uploadToSupabase(job.data.id, image);
  await updateDatabase(job.data.id, imageUrl);
});
```

## Frontend Integration

```typescript
// frontend/src/lib/images.ts
export function getImageUrl(eventId: string): string {
  // Development: use local placeholders
  if (import.meta.env.DEV) {
    return `/images/events/${eventId}.jpg`;
  }
  
  // Production: use CDN URLs from database
  return event.image_cdn_url || event.image_url || `/images/events/placeholder.jpg`;
}
```

## GitHub Sync Strategy

### What to Commit:
- ✅ Placeholder images (low-res, < 100KB each)
- ✅ Generation scripts
- ✅ Image metadata/prompts
- ❌ Full resolution images (store externally)

### .gitignore:
```
# Ignore high-res generated images
image-service/generated/
image-service/queue/
*.tiff
*.png
*-highres.jpg

# Keep placeholders
!frontend/public/images/events/*.jpg
```

## CI/CD Pipeline

```yaml
# .github/workflows/generate-missing-images.yml
name: Generate Missing Images
on:
  schedule:
    - cron: '0 0 * * 0' # Weekly
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check missing images
        run: node image-service/check-missing.js
      - name: Generate images
        run: node image-service/generate-missing.js
        env:
          REPLICATE_API_TOKEN: ${{ secrets.REPLICATE_API_TOKEN }}
```

## Cost Analysis

### Replicate (Pay-per-use)
- Flux Schnell: ~$0.0011 per image
- 1000 images = ~$1.10
- No rate limits, instant scaling

### Self-Hosted GPU
- Vultr GPU: ~$0.50/hour ($360/month)
- Unlimited generation
- Full control, no external dependencies

### Huggingface Inference API
- $9/month for PRO: 12,500 requests
- ~$0.0007 per image
- Rate limited but affordable

## Quick Start Commands

```bash
# Set up image service
cd image-service
npm init -y
npm install replicate supabase-js bull dotenv

# Configure environment
cp .env.example .env
# Add REPLICATE_API_TOKEN and SUPABASE credentials

# Generate all images
npm run generate:all

# Generate specific image
npm run generate -- --id abraham-journey

# Upload to CDN
npm run upload:all
```

## Migration Plan

1. **Phase 1**: Keep current placeholders, set up image-service
2. **Phase 2**: Generate high-res versions with Replicate/local
3. **Phase 3**: Upload to Supabase Storage
4. **Phase 4**: Update frontend to use CDN URLs in production
5. **Phase 5**: Automate with GitHub Actions

## Key Decisions

1. **Separate Service**: Decouple image generation from main app
2. **External Storage**: Don't bloat Git repo with binary files  
3. **Queue System**: Handle failures and retries gracefully
4. **Progressive Enhancement**: Placeholders → High-res as needed
5. **Cost Optimization**: Start with pay-per-use, move to self-hosted if volume increases

This architecture gives you unlimited generation capacity while keeping your repo clean and your app fast!