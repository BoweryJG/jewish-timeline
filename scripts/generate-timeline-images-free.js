const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Timeline events with optimized prompts for AI generation
const timelineEvents = [
  {
    id: 'abraham-journey',
    title: 'Abraham\'s Journey from Ur',
    prompt: 'Ancient Middle Eastern caravan crossing desert at sunset, man in robes leading people and camels, ziggurats in distance, golden hour lighting, epic biblical scene, oil painting style'
  },
  {
    id: 'covenant-abraham',
    title: 'The Covenant with Abraham',
    prompt: 'Elderly bearded man looking at starry night sky, arms raised in prayer, altar with fire, mystical atmosphere, thousands of stars, biblical scene, dramatic lighting'
  },
  {
    id: 'isaac-binding',
    title: 'The Binding of Isaac',
    prompt: 'Mountain top altar scene at dawn, father and son biblical moment, ram in bushes, divine light from clouds, emotional religious art, classical painting style'
  },
  {
    id: 'jacob-wrestling',
    title: 'Jacob Wrestling the Angel',
    prompt: 'Man wrestling with glowing angelic figure by river at night, supernatural struggle, moonlight and mist, dynamic action, biblical art, dramatic composition'
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph and His Dreams',
    prompt: 'Young man sleeping with dream visions above, wheat sheaves bowing, sun moon and stars, colorful coat nearby, surreal biblical dream art'
  },
  {
    id: 'exodus-slavery',
    title: 'Slavery in Egypt',
    prompt: 'Ancient Egyptian pyramid construction, workers moving stones, taskmasters watching, harsh desert sun, biblical exodus scene, historical painting'
  },
  {
    id: 'moses-burning-bush',
    title: 'Moses and the Burning Bush',
    prompt: 'Man kneeling before burning bush in desert, flames not consuming branches, divine light, mountain background, biblical miracle scene'
  },
  {
    id: 'exodus-red-sea',
    title: 'Parting of the Red Sea',
    prompt: 'Massive walls of water held back, people walking on dry seabed, Moses with raised staff, Egyptian chariots behind, epic biblical miracle, dramatic art'
  },
  {
    id: 'receiving-torah-sinai',
    title: 'Receiving the Torah at Sinai',
    prompt: 'Mountain peak with lightning and clouds, man ascending into divine light, stone tablets glowing, crowd below, biblical revelation scene'
  },
  {
    id: 'wilderness-tabernacle',
    title: 'The Tabernacle in the Wilderness',
    prompt: 'Ornate tent temple in desert, golden decorations, priests in robes, pillar of cloud above, ancient Israelite camp, biblical architecture'
  },
  {
    id: 'king-david-jerusalem',
    title: 'King David Establishes Jerusalem',
    prompt: 'King dancing before golden ark, crowds celebrating, ancient Jerusalem walls, musicians and joy, biblical celebration scene'
  },
  {
    id: 'solomon-temple-dedication',
    title: 'Solomon\'s Temple Dedication',
    prompt: 'Magnificent ancient temple, golden architecture, cloud of glory descending, king in royal robes, crowds of priests, biblical dedication ceremony'
  }
];

// Function to download image from URL
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

// Generate using Craiyon (free, no API key required)
async function generateWithCraiyon(browser, event) {
  console.log(`🎨 Generating with Craiyon: ${event.title}`);
  
  const page = await browser.newPage();
  try {
    await page.goto('https://www.craiyon.com/', { waitUntil: 'networkidle2' });
    
    // Wait for the prompt input
    await page.waitForSelector('#prompt', { timeout: 10000 });
    
    // Type the prompt
    await page.type('#prompt', event.prompt);
    
    // Click generate button
    await page.click('button[type="submit"]');
    
    // Wait for images to generate (this can take 1-2 minutes)
    console.log('⏳ Waiting for generation (this may take 1-2 minutes)...');
    await page.waitForSelector('img[alt*="generated"]', { timeout: 120000 });
    
    // Wait a bit more for all images to load
    await page.waitForTimeout(5000);
    
    // Get all generated image URLs
    const imageUrls = await page.evaluate(() => {
      const images = document.querySelectorAll('img[alt*="generated"]');
      return Array.from(images).map(img => img.src);
    });
    
    if (imageUrls.length > 0) {
      // Download the first image
      const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', `${event.id}.jpg`);
      console.log(`📥 Downloading image to: ${outputPath}`);
      
      // For Craiyon, we need to handle the blob URL differently
      // Take a screenshot of the first image instead
      const firstImage = await page.$('img[alt*="generated"]');
      await firstImage.screenshot({ path: outputPath });
      
      console.log(`✅ Saved: ${event.id}.jpg`);
    }
    
  } catch (error) {
    console.error(`❌ Error generating ${event.id}:`, error.message);
  } finally {
    await page.close();
  }
}

// Generate using Stable Diffusion Web UI
async function generateWithStableDiffusionWeb(browser, event) {
  console.log(`🎨 Attempting Stable Diffusion Web: ${event.title}`);
  
  const page = await browser.newPage();
  try {
    // Try several free Stable Diffusion web UIs
    const sdSites = [
      'https://stablediffusionweb.com/',
      'https://playgroundai.com/',
      'https://clipdrop.co/stable-diffusion'
    ];
    
    for (const site of sdSites) {
      try {
        console.log(`   Trying ${site}...`);
        await page.goto(site, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Generic approach - look for text input and generate button
        const inputSelectors = ['textarea', 'input[type="text"]', '#prompt', '.prompt-input'];
        const buttonSelectors = ['button:has-text("Generate")', 'button:has-text("Create")', 'button[type="submit"]'];
        
        let inputFound = false;
        for (const selector of inputSelectors) {
          try {
            await page.waitForSelector(selector, { timeout: 5000 });
            await page.type(selector, event.prompt);
            inputFound = true;
            break;
          } catch (e) {
            continue;
          }
        }
        
        if (inputFound) {
          // Try to click generate button
          for (const selector of buttonSelectors) {
            try {
              await page.click(selector);
              break;
            } catch (e) {
              continue;
            }
          }
          
          // Wait for image generation
          await page.waitForTimeout(30000);
          
          // Try to find and save generated images
          const images = await page.$$eval('img', imgs => 
            imgs.map(img => img.src).filter(src => 
              src.includes('data:image') || src.includes('generated') || src.includes('output')
            )
          );
          
          if (images.length > 0) {
            console.log(`✅ Found generated image at ${site}`);
            // Screenshot the result area
            const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', `${event.id}.jpg`);
            await page.screenshot({ path: outputPath, fullPage: false });
            return true;
          }
        }
      } catch (error) {
        console.log(`   Site ${site} didn't work:`, error.message);
        continue;
      }
    }
    
  } catch (error) {
    console.error(`❌ Error with Stable Diffusion Web:`, error.message);
  } finally {
    await page.close();
  }
  return false;
}

// Main function to generate all images
async function generateAllImages() {
  console.log('🚀 Starting AI Image Generation for Jewish Timeline\n');
  
  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  await fs.mkdir(outputDir, { recursive: true });
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized']
  });

  try {
    console.log('📌 This script will try multiple free AI image generators.');
    console.log('📌 Some may require manual interaction or have rate limits.\n');
    
    for (const event of timelineEvents) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Processing: ${event.title}`);
      console.log(`${'='.repeat(60)}\n`);
      
      // Check if image already exists
      const imagePath = path.join(outputDir, `${event.id}.jpg`);
      try {
        await fs.access(imagePath);
        console.log(`✅ Image already exists: ${event.id}.jpg`);
        continue;
      } catch (e) {
        // Image doesn't exist, generate it
      }
      
      // Try different generation methods
      let generated = false;
      
      // Method 1: Try Craiyon (most reliable free option)
      try {
        await generateWithCraiyon(browser, event);
        generated = true;
      } catch (error) {
        console.log('Craiyon failed, trying alternatives...');
      }
      
      // Method 2: Try Stable Diffusion web UIs
      if (!generated) {
        generated = await generateWithStableDiffusionWeb(browser, event);
      }
      
      // Method 3: If all else fails, create a high-quality placeholder
      if (!generated) {
        console.log('⚠️  Creating enhanced placeholder...');
        const page = await browser.newPage();
        await page.setContent(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              }
              .card {
                width: 90%;
                max-width: 800px;
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 60px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
              }
              h1 {
                color: #2d3748;
                font-size: 3em;
                margin-bottom: 20px;
                font-weight: 800;
              }
              .prompt {
                color: #4a5568;
                font-size: 1.2em;
                line-height: 1.8;
                margin: 30px 0;
                font-style: italic;
              }
              .icon {
                font-size: 100px;
                margin: 30px 0;
                opacity: 0.8;
              }
              .watermark {
                position: absolute;
                bottom: 20px;
                right: 20px;
                opacity: 0.5;
                font-size: 14px;
                color: white;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="icon">🎨</div>
              <h1>${event.title}</h1>
              <p class="prompt">${event.prompt}</p>
              <p style="color: #718096; margin-top: 40px;">AI-Generated Image Placeholder</p>
            </div>
            <div class="watermark">Jewish Timeline Project</div>
          </body>
          </html>
        `);
        
        await page.waitForTimeout(1000);
        await page.screenshot({ 
          path: path.join(outputDir, `${event.id}.jpg`),
          fullPage: true 
        });
        await page.close();
        console.log(`✅ Created placeholder: ${event.id}.jpg`);
      }
      
      // Brief pause between generations to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    // Create summary
    console.log('\n📊 Generation Summary\n' + '='.repeat(60));
    const summary = [];
    for (const event of timelineEvents) {
      const imagePath = path.join(outputDir, `${event.id}.jpg`);
      try {
        await fs.access(imagePath);
        const stats = await fs.stat(imagePath);
        summary.push(`✅ ${event.id}.jpg - ${event.title} (${Math.round(stats.size / 1024)}KB)`);
      } catch (e) {
        summary.push(`❌ ${event.id}.jpg - ${event.title} (missing)`);
      }
    }
    
    console.log(summary.join('\n'));
    
    await fs.writeFile(
      path.join(outputDir, 'generation-report.txt'),
      `AI Image Generation Report\n${'='.repeat(30)}\n\nGenerated on: ${new Date().toISOString()}\n\n${summary.join('\n')}\n`
    );
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    console.log('\n\n✅ Process complete! Press Enter to close browser...');
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    await browser.close();
  }
}

// Run the generation
generateAllImages().catch(console.error);