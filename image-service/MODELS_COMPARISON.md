# Replicate Image Models Comparison

## Quick Comparison Table

| Model | Quality | Speed | Cost per Image | Best For |
|-------|---------|-------|----------------|----------|
| **FLUX Schnell** | Good | ⚡ Fast (5s) | $0.0011 | Quick iterations, budget |
| **FLUX Dev** | Better | Medium (15s) | $0.003 | Balance of quality/cost |
| **FLUX Pro** | Best | Medium (20s) | $0.055 | Final production images |
| **SDXL** | Good | Medium (10s) | $0.0015 | Classic SD style |
| **Recraft V3** | Excellent | Medium (15s) | $0.03 | Text in images, logos |
| **Ideogram V2** | Excellent | Medium (20s) | $0.02 | Text accuracy |

## Model Details

### 1. FLUX Schnell (Default - Recommended)
- **Model**: `black-forest-labs/flux-schnell`
- **Cost**: ~$0.0011 per image
- **Speed**: 4-5 seconds
- **Quality**: Good, especially for the speed
- **Best for**: Your Jewish timeline project - fast and cheap!

### 2. FLUX Dev
- **Model**: `black-forest-labs/flux-dev`
- **Cost**: ~$0.003 per image
- **Speed**: 10-15 seconds
- **Quality**: Better details, more artistic
- **Best for**: When you need higher quality

### 3. FLUX Pro
- **Model**: `black-forest-labs/flux-1.1-pro`
- **Cost**: ~$0.055 per image
- **Speed**: 15-20 seconds
- **Quality**: State-of-the-art
- **Best for**: Hero images, final production

### 4. Stable Diffusion XL
- **Model**: `stability-ai/sdxl`
- **Cost**: ~$0.0015 per image
- **Speed**: 8-10 seconds
- **Quality**: Classic SD aesthetic
- **Best for**: Artistic/painterly style

### 5. Recraft V3
- **Model**: `recraft-ai/recraft-v3`
- **Cost**: ~$0.03 per image
- **Speed**: 10-15 seconds
- **Quality**: SOTA (State of the Art)
- **Best for**: Images with text, logos

### 6. Ideogram V2
- **Model**: `ideogram-ai/ideogram-v2`
- **Cost**: ~$0.02 per image
- **Speed**: 15-20 seconds
- **Quality**: Excellent text rendering
- **Best for**: Hebrew text in images

## For Your Jewish Timeline Project

### Recommended Approach:
1. **Start with FLUX Schnell** - Generate all 12 images for ~$0.013
2. **Upgrade specific images** - Use FLUX Dev/Pro for key scenes
3. **Special cases** - Use Ideogram if you need Hebrew text

### Cost Examples:
- All 12 images with Schnell: ~$0.013 (1 cent)
- All 12 images with Dev: ~$0.036 (4 cents)
- All 12 images with Pro: ~$0.66 (66 cents)
- Mix (8 Schnell + 4 Dev): ~$0.021 (2 cents)

## How to Switch Models

In `generate-with-replicate.js`, just uncomment the model you want:

```javascript
// Default (Schnell) - already active
const output = await replicate.run("black-forest-labs/flux-schnell", ...);

// To use FLUX Dev instead:
// Comment out Schnell, uncomment Dev section
```

## Free Tier Info
- Replicate gives you **free credits** when you sign up
- Enough to generate 50-100 images with Schnell
- No monthly fees - only pay for what you use after free credits