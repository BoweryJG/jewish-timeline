#!/usr/bin/env node

// This script generates images using HuggingFace's FLUX model
// Set your API key first: export HUGGINGFACE_API_KEY="your-key-here"

const https = require('https');
const fs = require('fs');
const path = require('path');

// The images we need to generate
const images = [
  { name: 'october-7-attack.jpg', prompt: 'Southern Israeli kibbutz at peaceful dawn, golden wheat fields, children playground, homes with gardens, but dark storm clouds gathering on horizon, Studio Ghibli watercolor style' },
  { name: 'operation-swords-iron.jpg', prompt: 'Iron Dome defense missiles creating protective light trails in night sky over Israeli cities, blue and white colors, Studio Ghibli style' },
  { name: 'global-jewish-unity.jpg', prompt: 'Jewish communities worldwide connected by golden threads of light, candle vigils, prayers ascending like doves, Studio Ghibli style' },
  { name: 'hostage-release.jpg', prompt: 'Emotional family reunion at border crossing, Red Cross vehicles, embracing with tears of joy, white doves, golden hour, Studio Ghibli style' },
  { name: 'israel-resilience-2024.jpg', prompt: 'Communities rebuilding, children playing in new playgrounds, flowers blooming, phoenix in clouds, sunrise over renewed land, Studio Ghibli style' }
];

function generateImage(prompt, filename) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      inputs: prompt,
      parameters: { width: 1024, height: 768 }
    });

    const options = {
      hostname: 'api-inference.huggingface.co',
      path: '/models/black-forest-labs/FLUX.1-schnell',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_YOUR_KEY_HERE'}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          const buffer = Buffer.concat(chunks);
          const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', filename);
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Generated: ${filename}`);
          resolve();
        } else {
          console.error(`❌ Failed: ${filename} - ${res.statusCode}`);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function generateAll() {
  console.log('🎨 Generating October 7 images...\n');
  
  for (const img of images) {
    try {
      await generateImage(img.prompt, img.name);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s between requests
    } catch (error) {
      console.error(`Failed to generate ${img.name}:`, error.message);
    }
  }
  
  console.log('\n✅ Done! Check frontend/public/images/events/');
}

generateAll();