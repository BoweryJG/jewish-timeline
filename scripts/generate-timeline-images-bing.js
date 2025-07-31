const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Enhanced timeline events with detailed prompts
const timelineEvents = [
  {
    id: 'abraham-journey',
    title: 'Abraham\'s Journey from Ur',
    prompt: 'Studio Ghibli style epic journey scene: Abraham leading a vast caravan across golden Mesopotamian plains at sunset. Hundreds of people, livestock, and laden camels stretch to the horizon. Abraham stands tall in flowing robes, staff in hand, looking toward distant mountains. Ancient ziggurats of Ur visible in background. Warm golden hour lighting, dust particles in air, vast cloudscapes. Highly detailed, painterly style, emotional depth, 4K quality.'
  },
  {
    id: 'covenant-abraham',
    title: 'The Covenant with Abraham',
    prompt: 'Studio Ghibli style mystical covenant scene: Night sky filled with countless stars forming divine patterns. Abraham in deep reverence, arms raised, surrounded by ethereal light. Altar with sacred fire, smoke rising to heavens forming Hebrew letters. Landscape bathed in supernatural blue-silver moonlight. Stars seem close enough to touch. Magical realism, spiritual atmosphere, intricate details, luminous quality.'
  },
  {
    id: 'isaac-binding',
    title: 'The Binding of Isaac',
    prompt: 'Studio Ghibli style dramatic mountaintop scene: Mount Moriah at dawn, ancient altar of rough stones. Abraham with raised hand frozen in time, divine light breaking through clouds. Young Isaac peaceful, trusting. Ram caught in thicket glowing with otherworldly light. Angels barely visible in clouds. Emotional intensity, morning mist, dramatic lighting, symbolic elements, masterful composition.'
  },
  {
    id: 'jacob-wrestling',
    title: 'Jacob Wrestling the Angel',
    prompt: 'Studio Ghibli style mystical struggle: Jacob wrestling luminous angelic being by Jabbok river at night. Angel semi-transparent with wings of light, Jacob determined and strong. River reflects supernatural glow, ancient trees frame scene. Dawn breaking on horizon. Dynamic action, spiritual energy, motion blur, ethereal atmosphere, powerful symbolism.'
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph and His Dreams',
    prompt: 'Studio Ghibli style surreal dream sequence: Joseph sleeping, above him swirling dreamscape with golden wheat sheaves bowing, sun moon and stars in cosmic dance. Coat of many colors draped nearby glowing with rainbow light. Dream elements blend with reality. Magical realism, vibrant colors, flowing transitions, ornate patterns, visionary quality.'
  },
  {
    id: 'exodus-slavery',
    title: 'Slavery in Egypt',
    prompt: 'Studio Ghibli style epic construction scene: Massive pyramid construction, thousands of Hebrew slaves moving enormous stones. Taskmasters on platforms, whips cracking. In foreground, strong Hebrew workers sharing water, showing solidarity. Pharaoh\'s palace distant. Harsh sunlight, dust, sweat, but also human dignity. Detailed crowd scenes, emotional depth, historical accuracy.'
  },
  {
    id: 'moses-burning-bush',
    title: 'Moses and the Burning Bush',
    prompt: 'Studio Ghibli style divine encounter: Moses barefoot before miraculous burning bush that flames but doesn\'t consume. Bush radiates otherworldly light, each leaf visible through flames. Moses shielding eyes from divine radiance. Mount Horeb rocky and ancient. Sheep scattered nearby. Supernatural atmosphere, detailed fire effects, sacred geometry in flames, awe-inspiring.'
  },
  {
    id: 'exodus-red-sea',
    title: 'Parting of the Red Sea',
    prompt: 'Studio Ghibli style miraculous scene: Massive walls of water held back by divine power, creating canyon of dry seabed. Moses with staff raised, powerful winds, Hebrew masses crossing between towering water walls filled with visible sea life. Egyptian chariots approaching. Dawn light through water creates prisms. Epic scale, detailed water physics, dramatic composition, divine intervention visible.'
  },
  {
    id: 'receiving-torah-sinai',
    title: 'Receiving the Torah at Sinai',
    prompt: 'Studio Ghibli style theophany: Mount Sinai wreathed in divine fire and smoke, lightning and thunder. Moses ascending into cloud, tablets glowing with holy light. Israelite camp below in reverent fear. Supernatural phenomena, cosmic significance, detailed crowd, mystical atmosphere, sacred moment captured in time.'
  },
  {
    id: 'wilderness-tabernacle',
    title: 'The Tabernacle in the Wilderness',
    prompt: 'Studio Ghibli style sacred architecture: Ornate Tabernacle in desert, gold overlays gleaming, embroidered curtains flowing. Pillar of cloud/fire above. Priests in detailed vestments performing rituals. Israelite camp in concentric circles around. Golden hour light, incense smoke, holy atmosphere, intricate details, architectural precision.'
  },
  {
    id: 'king-david-jerusalem',
    title: 'King David Establishes Jerusalem',
    prompt: 'Studio Ghibli style celebration scene: David dancing before Ark of Covenant entering Jerusalem. Massive crowds celebrating, music and joy. Ancient Jerusalem walls and buildings. David in royal but simple garments, leaping with abandon. Ark carried by Levites, glowing with divine presence. Festive atmosphere, dynamic movement, cultural authenticity, joyous energy.'
  },
  {
    id: 'solomon-temple-dedication',
    title: 'Solomon\'s Temple Dedication',
    prompt: 'Studio Ghibli style architectural wonder: First Temple in full glory, Shekinah glory descending as cloud filling temple. Solomon in royal robes, hands raised. Thousands of priests and Levites with instruments. Temple details: gold, cedar, carved cherubim. Divine light breaking through clouds. Majestic scale, ornate details, sacred atmosphere, historical grandeur.'
  }
];

async function generateImagesWithBing() {
  console.log('🎨 Starting Bing Image Creator automation...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = await browser.newPage();
    
    console.log('📝 Instructions for using Bing Image Creator:');
    console.log('1. The browser will open to Bing Image Creator');
    console.log('2. You\'ll need to sign in with a Microsoft account');
    console.log('3. The script will help you generate each image');
    console.log('4. After each image generates, right-click and save it');
    console.log('5. Save to: frontend/public/images/events/');
    console.log('\nPress Enter to continue...');
    
    // Wait for user to press enter
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });

    // Navigate to Bing Image Creator
    await page.goto('https://www.bing.com/images/create', { waitUntil: 'networkidle2' });
    
    console.log('\n⏳ Waiting for you to sign in...');
    console.log('After signing in, press Enter to continue...');
    
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });

    // Generate each image
    for (const event of timelineEvents) {
      console.log(`\n🎨 Generating: ${event.title}`);
      console.log('─'.repeat(50));
      
      // Find and clear the prompt input
      try {
        // Wait for the textarea to be available
        await page.waitForSelector('#sb_form_q, textarea[name="q"], .b_searchbox', { timeout: 10000 });
        
        // Try different selectors
        const inputSelector = await page.evaluate(() => {
          const selectors = ['#sb_form_q', 'textarea[name="q"]', '.b_searchbox', 'input[type="text"]'];
          for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return selector;
          }
          return null;
        });

        if (inputSelector) {
          // Clear and type the prompt
          await page.click(inputSelector, { clickCount: 3 });
          await page.keyboard.press('Backspace');
          await page.type(inputSelector, event.prompt);
          
          // Submit the prompt
          await page.keyboard.press('Enter');
          
          console.log('⏳ Waiting for images to generate...');
          console.log('📥 When ready, save the best image as:');
          console.log(`   frontend/public/images/events/${event.id}.jpg`);
          console.log('\nPress Enter when saved to continue to next image...');
          
          await new Promise(resolve => {
            process.stdin.once('data', resolve);
          });
        } else {
          console.log('❌ Could not find prompt input. Please:');
          console.log('1. Manually paste this prompt:');
          console.log(`\n${event.prompt}\n`);
          console.log('2. Generate the image');
          console.log('3. Save as: frontend/public/images/events/${event.id}.jpg');
          console.log('4. Press Enter to continue...');
          
          await new Promise(resolve => {
            process.stdin.once('data', resolve);
          });
        }
        
      } catch (error) {
        console.log('❌ Error finding prompt input:', error.message);
        console.log('\n📋 Please manually paste this prompt:');
        console.log(`\n${event.prompt}\n`);
        console.log('Press Enter when done...');
        
        await new Promise(resolve => {
          process.stdin.once('data', resolve);
        });
      }
    }

    console.log('\n✅ All images generated!');
    console.log('\n📁 Please verify all images are saved in:');
    console.log('   frontend/public/images/events/');
    
    // Create a summary file
    const summary = timelineEvents.map(event => 
      `${event.id}.jpg - ${event.title}`
    ).join('\n');
    
    await fs.writeFile(
      path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', 'generated-images.txt'),
      `Generated Timeline Images\n${'='.repeat(30)}\n\n${summary}\n\nGenerated on: ${new Date().toISOString()}\n`
    );

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    console.log('\n🎯 Press Enter to close the browser...');
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    await browser.close();
  }
}

// Run the script
generateImagesWithBing().catch(console.error);