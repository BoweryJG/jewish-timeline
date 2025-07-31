import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IMAGES_DIR = path.join(__dirname, '../frontend/public/images/events');
const DOWNLOAD_TIMEOUT = 30000; // 30 seconds

// List of images to download/generate
const imagesToDownload = [
  {
    name: 'moses-parting-red-sea.jpg',
    prompt: 'Studio Ghibli style, Moses parting the Red Sea with walls of turquoise water towering on both sides, golden sunset sky with dramatic clouds, Israelites walking through on dry ground with wonder in their eyes, wide panoramic view, detailed environment, atmospheric perspective, golden hour lighting, uplifting composition, hopeful atmosphere, hand-painted aesthetic, watercolor textures, dreamy quality, Jewish historical themes, highly detailed, masterpiece quality',
    service: 'midjourney', // or 'dalle3', 'stable-diffusion'
    fallbackUrl: null // Can add a fallback URL if generation fails
  },
  {
    name: 'abraham-covenant.jpg',
    prompt: 'Studio Ghibli style transcendent moment: Abraham stands alone on a hilltop outside Harran beneath the most spectacular star-filled sky ever painted. The Milky Way arches overhead like a river of light, each star individually rendered. Abraham\'s face is illuminated by an otherworldly light source',
    service: 'midjourney',
    fallbackUrl: null
  },
  {
    name: 'ur-of-chaldees.jpg',
    prompt: 'Studio Ghibli style epic masterpiece: The great ziggurat of Ur rises like a mountain of sun-baked brick against a twilight sky painted in deep purples and burning oranges. The Euphrates river winds like liquid gold in the distance.',
    service: 'midjourney',
    fallbackUrl: null
  },
  {
    name: 'ancient-canaanites.jpg',
    prompt: 'Studio Ghibli style archaeological wonder: A fortified Canaanite city crowns a tel as the first light of dawn breaks over the Jordan Valley. Massive cyclopean stone walls with gates of Lebanese cedar.',
    service: 'midjourney',
    fallbackUrl: null
  }
];

// Helper function to ensure directory exists
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Download image from URL
async function downloadImageFromUrl(url, outputPath) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for better image loading
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the URL
    const response = await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: DOWNLOAD_TIMEOUT 
    });
    
    if (response && response.ok()) {
      // Get the image buffer
      const buffer = await response.buffer();
      
      // Save the image
      await fs.writeFile(outputPath, buffer);
      console.log(`✅ Downloaded: ${path.basename(outputPath)}`);
      return true;
    } else {
      console.error(`❌ Failed to download from ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error downloading image:`, error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Generate image using AI service (placeholder for now)
async function generateImageWithAI(prompt, service, outputPath) {
  console.log(`🎨 Generating image with ${service}...`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
  
  // This is where you would integrate with actual AI services
  // For now, we'll create a placeholder
  
  // Example integration points:
  switch(service) {
    case 'midjourney':
      // Would use Midjourney API or Discord bot
      console.log('⚠️  Midjourney integration not yet implemented');
      break;
    case 'dalle3':
      // Would use OpenAI API
      console.log('⚠️  DALL-E 3 integration not yet implemented');
      break;
    case 'stable-diffusion':
      // Would use Replicate or similar API
      console.log('⚠️  Stable Diffusion integration not yet implemented');
      break;
  }
  
  return false;
}

// Create a placeholder image with description
async function createPlaceholder(imageName, prompt) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Create an HTML page with a styled placeholder
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: Arial, sans-serif;
          }
          .placeholder {
            width: 1200px;
            height: 600px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
            box-sizing: border-box;
            border: 2px solid rgba(255, 255, 255, 0.2);
          }
          h1 {
            color: white;
            font-size: 36px;
            margin-bottom: 20px;
            text-align: center;
          }
          p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            text-align: center;
            max-width: 800px;
            line-height: 1.6;
          }
          .filename {
            color: #ffd700;
            font-size: 24px;
            margin-top: 30px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="placeholder">
          <h1>AI Image Placeholder</h1>
          <p class="filename">${imageName}</p>
          <p>${prompt.substring(0, 200)}...</p>
          <p style="margin-top: 30px; font-size: 14px; opacity: 0.7;">
            To generate this image, use an AI service like Midjourney, DALL-E 3, or Stable Diffusion
          </p>
        </div>
      </body>
      </html>
    `;
    
    await page.setContent(html);
    await page.setViewport({ width: 1200, height: 600 });
    
    // Take a screenshot
    const outputPath = path.join(IMAGES_DIR, imageName);
    await page.screenshot({ 
      path: outputPath,
      type: 'jpeg',
      quality: 90
    });
    
    console.log(`📸 Created placeholder: ${imageName}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating placeholder:`, error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image download/generation process...\n');
  
  // Ensure the images directory exists
  await ensureDir(IMAGES_DIR);
  
  for (const image of imagesToDownload) {
    console.log(`\n📥 Processing: ${image.name}`);
    
    const outputPath = path.join(IMAGES_DIR, image.name);
    
    // Check if image already exists
    try {
      await fs.access(outputPath);
      console.log(`✓ Image already exists, skipping...`);
      continue;
    } catch {
      // Image doesn't exist, proceed with download/generation
    }
    
    let success = false;
    
    // Try to generate with AI first
    if (image.service) {
      success = await generateImageWithAI(image.prompt, image.service, outputPath);
    }
    
    // If AI generation failed and we have a fallback URL, try downloading
    if (!success && image.fallbackUrl) {
      success = await downloadImageFromUrl(image.fallbackUrl, outputPath);
    }
    
    // If all else fails, create a placeholder
    if (!success) {
      await createPlaceholder(image.name, image.prompt);
    }
  }
  
  console.log('\n✨ Image processing complete!');
  console.log(`📁 Images saved to: ${IMAGES_DIR}`);
}

// Run the script
main().catch(console.error);