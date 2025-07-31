#!/usr/bin/env node
require('dotenv').config();
const Replicate = require('replicate');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Initialize Replicate (you'll need to set REPLICATE_API_TOKEN in .env)
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Your prompts from ENHANCED_IMAGE_PROMPTS.md
const timelineEvents = [
  {
    id: 'abraham-journey',
    prompt: "Studio Ghibli style epic journey scene: Abraham leading a vast caravan across golden Mesopotamian plains at sunset. Hundreds of people, livestock, and laden camels stretch to the horizon. Abraham stands tall in flowing robes, staff in hand, looking toward distant mountains. Ancient ziggurats of Ur visible in background. Warm golden hour lighting, dust particles in air, vast cloudscapes. Highly detailed, painterly style, emotional depth, 4K quality."
  },
  {
    id: 'covenant-abraham',
    prompt: "Studio Ghibli style transcendent moment: Abraham stands alone on a hilltop outside Harran beneath the most spectacular star-filled sky ever painted. The Milky Way arches overhead like a river of light, each star individually rendered. Abraham's face is illuminated by an otherworldly light source. His robes and beard blow in a wind that seems to come from eternity itself. Below, the landscape stretches endlessly. Ultra-detailed star field, perfect historical costume detail."
  },
  {
    id: 'isaac-binding',
    prompt: "Studio Ghibli style dramatic mountaintop scene: Mount Moriah at dawn, ancient altar of rough stones. Abraham with raised hand frozen in time, divine light breaking through clouds. Young Isaac peaceful, trusting. Ram caught in thicket glowing with otherworldly light. Angels barely visible in clouds. Emotional intensity, morning mist, dramatic lighting, symbolic elements, masterful composition."
  },
  {
    id: 'jacob-wrestling',
    prompt: "Studio Ghibli style mystical struggle: Jacob wrestling luminous angelic being by Jabbok river at night. Angel semi-transparent with wings of light, Jacob determined and strong. River reflects supernatural glow, ancient trees frame scene. Dawn breaking on horizon. Dynamic action, spiritual energy, motion blur, ethereal atmosphere, powerful symbolism."
  },
  {
    id: 'joseph-dreams',
    prompt: "Studio Ghibli style emotional climax: The moment Joseph reveals himself to his brothers in his Egyptian palace. The vizier's chamber adorned with lotus columns. Joseph dressed in fine Egyptian linen with gold collar and headdress, tears streaming. Egyptian scribes look on in amazement. Through massive windows, the Nile flows. Hieroglyphics accurately depicted. Perfect emotional resonance."
  },
  {
    id: 'exodus-slavery',
    prompt: "Studio Ghibli style epic construction scene: Massive pyramid construction, thousands of Hebrew slaves moving enormous stones. Taskmasters on platforms, whips cracking. In foreground, strong Hebrew workers sharing water, showing solidarity. Pharaoh's palace distant. Harsh sunlight, dust, sweat, but also human dignity. Detailed crowd scenes, emotional depth, historical accuracy."
  },
  {
    id: 'moses-burning-bush',
    prompt: "Studio Ghibli style divine encounter: Moses barefoot before miraculous burning bush that flames but doesn't consume. Bush radiates otherworldly light, each leaf visible through flames. Moses shielding eyes from divine radiance. Mount Horeb rocky and ancient. Sheep scattered nearby. Supernatural atmosphere, detailed fire effects, sacred geometry in flames, awe-inspiring."
  },
  {
    id: 'exodus-red-sea',
    prompt: "Studio Ghibli style miraculous scene: Massive walls of water held back by divine power, creating canyon of dry seabed. Moses with staff raised, powerful winds, Hebrew masses crossing between towering water walls filled with visible sea life. Egyptian chariots approaching. Dawn light through water creates prisms. Epic scale, detailed water physics, dramatic composition."
  },
  {
    id: 'receiving-torah-sinai',
    prompt: "Studio Ghibli style theophany: Mount Sinai wreathed in divine fire and smoke, lightning and thunder. Moses ascending into cloud, tablets glowing with holy light. Israelite camp below in reverent fear. Supernatural phenomena, cosmic significance, detailed crowd, mystical atmosphere, sacred moment captured in time."
  },
  {
    id: 'wilderness-tabernacle',
    prompt: "Studio Ghibli style sacred architecture: Ornate Tabernacle in desert, gold overlays gleaming, embroidered curtains flowing. Pillar of cloud/fire above. Priests in detailed vestments performing rituals. Israelite camp in concentric circles around. Golden hour light, incense smoke, holy atmosphere, intricate details, architectural precision."
  },
  {
    id: 'king-david-jerusalem',
    prompt: "Studio Ghibli style celebration scene: David dancing before Ark of Covenant entering Jerusalem. Massive crowds celebrating, music and joy. Ancient Jerusalem walls and buildings. David in royal but simple garments, leaping with abandon. Ark carried by Levites, glowing with divine presence. Festive atmosphere, dynamic movement, cultural authenticity."
  },
  {
    id: 'solomon-temple-dedication',
    prompt: "Studio Ghibli style architectural wonder: First Temple in full glory, Shekinah glory descending as cloud filling temple. Solomon in royal robes, hands raised. Thousands of priests and Levites with instruments. Temple details: gold, cedar, carved cherubim. Divine light breaking through clouds. Majestic scale, ornate details, sacred atmosphere, historical grandeur."
  }
];

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
  console.log(`📝 Prompt: ${event.prompt.substring(0, 100)}...`);
  
  try {
    // Choose your model (uncomment the one you want):
    
    // Option 1: FLUX Schnell (FASTEST, good quality, ~$0.0011/image)
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: event.prompt,
          aspect_ratio: "16:9",
          output_format: "jpg",
          output_quality: 95
        }
      }
    );
    
    // Option 2: FLUX Dev (BETTER quality, ~$0.003/image)
    // const output = await replicate.run(
    //   "black-forest-labs/flux-dev",
    //   {
    //     input: {
    //       prompt: event.prompt,
    //       aspect_ratio: "16:9",
    //       output_format: "jpg",
    //       output_quality: 95,
    //       num_inference_steps: 28
    //     }
    //   }
    // );
    
    // Option 3: FLUX Pro (BEST quality, ~$0.055/image)
    // const output = await replicate.run(
    //   "black-forest-labs/flux-1.1-pro",
    //   {
    //     input: {
    //       prompt: event.prompt,
    //       aspect_ratio: "16:9",
    //       output_format: "jpg",
    //       output_quality: 95
    //     }
    //   }
    // );
    
    // Option 4: Stable Diffusion XL (Classic, ~$0.0015/image)
    // const output = await replicate.run(
    //   "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    //   {
    //     input: {
    //       prompt: event.prompt,
    //       width: 1024,
    //       height: 576,
    //       num_inference_steps: 30,
    //       refine: "expert_ensemble_refiner"
    //     }
    //   }
    // );
    
    // Option 5: Recraft V3 (SOTA quality, great for text, ~$0.03/image)
    // const output = await replicate.run(
    //   "recraft-ai/recraft-v3",
    //   {
    //     input: {
    //       prompt: event.prompt,
    //       style: "realistic_image",
    //       width: 1024,
    //       height: 576
    //     }
    //   }
    // );
    
    // Option 6: Ideogram V2 (Great for text in images, ~$0.02/image)
    // const output = await replicate.run(
    //   "ideogram-ai/ideogram-v2",
    //   {
    //     input: {
    //       prompt: event.prompt,
    //       aspect_ratio: "16:9",
    //       style_type: "photographic"
    //     }
    //   }
    // );
    
    // Download the generated image
    const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', `${event.id}.jpg`);
    await downloadImage(output[0], outputPath);
    
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
║            Jewish Timeline - Replicate Image Generation        ║
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

  console.log('\n📊 Generating 12 images with Flux...');
  console.log('💰 Cost: ~$0.013 total (about 1 cent)\n');

  const results = [];
  
  // Process in batches to avoid rate limits
  const batchSize = 3;
  for (let i = 0; i < timelineEvents.length; i += batchSize) {
    const batch = timelineEvents.slice(i, i + batchSize);
    
    console.log(`\n📦 Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(timelineEvents.length/batchSize)}`);
    
    const batchPromises = batch.map(event => generateImage(event));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Small delay between batches
    if (i + batchSize < timelineEvents.length) {
      console.log('⏳ Waiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n\n📊 Generation Complete!\n' + '═'.repeat(60));
  const successful = results.filter(r => r.success).length;
  console.log(`✅ Successfully generated: ${successful}/${timelineEvents.length} images`);
  
  if (successful < timelineEvents.length) {
    console.log('\n❌ Failed images:');
    results.forEach((result, index) => {
      if (!result.success) {
        console.log(`   - ${timelineEvents[index].id}: ${result.error}`);
      }
    });
  }
  
  console.log('\n📁 Images saved to: frontend/public/images/events/');
  console.log('💰 Total cost: ~$' + (successful * 0.0011).toFixed(3));
}

// Single image generation mode
async function generateSingle(eventId) {
  const event = timelineEvents.find(e => e.id === eventId);
  if (!event) {
    console.error(`❌ Event ID "${eventId}" not found`);
    console.log('\nAvailable IDs:');
    timelineEvents.forEach(e => console.log(`  - ${e.id}`));
    process.exit(1);
  }
  
  await generateImage(event);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === '--single' && args[1]) {
    generateSingle(args[1]);
  } else {
    generateAll().catch(console.error);
  }
}

module.exports = { generateImage, generateAll };