#!/usr/bin/env node
require('dotenv').config();
const Replicate = require('replicate');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { allEvents, getModel, calculateTotalCost } = require('./photorealistic-prompts');

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function generateImage(event) {
  console.log(`\n🎨 Generating: ${event.id}`);
  console.log(`📝 Era: ${event.era || 'ancient'}`);
  console.log(`📝 Prompt: ${event.prompt.substring(0, 100)}...`);
  
  try {
    // Get the appropriate model based on era
    const model = getModel(event.era || 'ancient');
    console.log(`🤖 Using model: ${model.name} (Cost: $${model.cost})`);
    
    // Run the appropriate model
    let output;
    if (model.name === 'recraft-ai/recraft-v3') {
      // Recraft for modern photojournalism
      output = await replicate.run(
        model.name,
        {
          input: {
            prompt: event.prompt,
            ...model.config
          }
        }
      );
    } else {
      // FLUX Dev for ancient/classical eras
      output = await replicate.run(
        model.name,
        {
          input: {
            prompt: event.prompt,
            ...model.config
          }
        }
      );
    }
    
    // Download the generated image
    const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', `${event.id}.jpg`);
    const imageUrl = Array.isArray(output) ? output[0] : output;
    await downloadImage(imageUrl, outputPath);
    
    console.log(`✅ Saved: ${event.id}.jpg`);
    return { success: true, path: outputPath };
    
  } catch (error) {
    console.error(`❌ Error generating ${event.id}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function generateAll() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║        Jewish Timeline - Ultra-Photorealistic Generation       ║
╚════════════════════════════════════════════════════════════════╝
`);

  // Check for API token
  if (!process.env.REPLICATE_API_TOKEN) {
    console.log('\n❌ ERROR: REPLICATE_API_TOKEN not found in environment variables\n');
    console.log('To use this script:');
    console.log('1. Sign up at https://replicate.com');
    console.log('2. Get your API token from https://replicate.com/account/api-tokens');
    console.log('3. Create a .env file in image-service/ with:');
    console.log('   REPLICATE_API_TOKEN=your_token_here\n');
    process.exit(1);
  }

  // Create output directory
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  await fs.mkdir(outputDir, { recursive: true });

  const costBreakdown = calculateTotalCost();
  console.log(`\n📊 Generating ${allEvents.length} photorealistic images...`);
  console.log('💰 Cost breakdown:');
  console.log(`   - Ancient Era: ${costBreakdown.ancient.count} images × $${0.003} = $${costBreakdown.ancient.cost.toFixed(3)}`);
  console.log(`   - Classical Era: ${costBreakdown.classical.count} images × $${0.003} = $${costBreakdown.classical.cost.toFixed(3)}`);
  console.log(`   - Modern Era: ${costBreakdown.modern.count} images × $${0.03} = $${costBreakdown.modern.cost.toFixed(3)}`);
  console.log(`   📍 Total: $${costBreakdown.total.toFixed(2)}\n`);

  const results = [];
  
  // Process in batches to avoid rate limits
  const batchSize = 3;
  for (let i = 0; i < allEvents.length; i += batchSize) {
    const batch = allEvents.slice(i, i + batchSize);
    
    console.log(`\n📦 Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allEvents.length/batchSize)}`);
    
    const batchPromises = batch.map(event => generateImage(event));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Small delay between batches
    if (i + batchSize < allEvents.length) {
      console.log('⏳ Waiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n\n📊 Generation Complete!\n' + '═'.repeat(60));
  const successful = results.filter(r => r.success).length;
  console.log(`✅ Successfully generated: ${successful}/${allEvents.length} images`);
  
  if (successful < allEvents.length) {
    console.log('\n❌ Failed images:');
    results.forEach((result, index) => {
      if (!result.success) {
        console.log(`   - ${allEvents[index].id}: ${result.error}`);
      }
    });
  }
  
  console.log('\n📁 Images saved to: frontend/public/images/events/');
  console.log(`💰 Total cost: ~$${costBreakdown.total.toFixed(2)}`);
  console.log('\n🎯 Next steps:');
  console.log('   1. Review generated images');
  console.log('   2. Upload high-res versions to Supabase Storage');
  console.log('   3. Update database with CDN URLs');
}

// Single image generation mode
async function generateSingle(eventId) {
  const event = allEvents.find(e => e.id === eventId);
  if (!event) {
    console.error(`❌ Event ID "${eventId}" not found`);
    console.log('\nAvailable IDs:');
    allEvents.forEach(e => console.log(`  - ${e.id}`));
    process.exit(1);
  }
  
  await generateImage(event);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === '--single' && args[1]) {
    generateSingle(args[1]);
  } else if (args[0] === '--list') {
    console.log('Available event IDs:');
    allEvents.forEach(e => console.log(`  - ${e.id} (${e.era}): ${e.title}`));
  } else {
    generateAll().catch(console.error);
  }
}

module.exports = { generateImage, generateAll };