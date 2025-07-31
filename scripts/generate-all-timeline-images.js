#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║        Jewish Timeline - Image Generation Suite               ║
╠═══════════════════════════════════════════════════════════════╣
║  This tool provides multiple methods to generate images for   ║
║  the Jewish Timeline project. Choose the best option below.   ║
╚═══════════════════════════════════════════════════════════════╝
`);

const options = [
  {
    name: '🎨 AI Image Generation (Free)',
    script: 'generate-timeline-images-free.js',
    description: 'Uses free AI services like Craiyon to generate images'
  },
  {
    name: '🖼️  Bing Image Creator (Microsoft Account Required)',
    script: 'generate-timeline-images-bing.js',
    description: 'High-quality AI images using Bing (requires Microsoft login)'
  },
  {
    name: '🏛️  Historical Images from Museums',
    script: 'fetch-historical-images.js',
    description: 'Fetches public domain artworks from museums and archives'
  },
  {
    name: '🎯 Generate Placeholder Images',
    script: 'generate-ai-images.js',
    description: 'Creates artistic placeholder images quickly'
  },
  {
    name: '📊 Check Current Status',
    script: null,
    description: 'See which images are already generated'
  }
];

async function checkImageStatus() {
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  const events = [
    'abraham-journey', 'covenant-abraham', 'isaac-binding', 'jacob-wrestling',
    'joseph-dreams', 'exodus-slavery', 'moses-burning-bush', 'exodus-red-sea',
    'receiving-torah-sinai', 'wilderness-tabernacle', 'king-david-jerusalem',
    'solomon-temple-dedication'
  ];
  
  console.log('\n📊 Current Image Status:\n' + '═'.repeat(60));
  
  let existCount = 0;
  for (const eventId of events) {
    const imagePath = path.join(outputDir, `${eventId}.jpg`);
    try {
      const stats = await fs.stat(imagePath);
      const size = Math.round(stats.size / 1024);
      console.log(`✅ ${eventId}.jpg (${size}KB)`);
      existCount++;
    } catch (e) {
      console.log(`❌ ${eventId}.jpg (missing)`);
    }
  }
  
  console.log(`\n📈 Progress: ${existCount}/${events.length} images (${Math.round(existCount/events.length*100)}%)`);
}

async function main() {
  console.log('\n🔧 Available Options:\n');
  
  options.forEach((option, index) => {
    console.log(`${index + 1}. ${option.name}`);
    console.log(`   ${option.description}\n`);
  });
  
  console.log('Enter your choice (1-5) or Q to quit: ');
  
  // Set up stdin for user input
  process.stdin.setEncoding('utf8');
  
  process.stdin.on('data', async (input) => {
    const choice = input.trim().toLowerCase();
    
    if (choice === 'q') {
      console.log('\n👋 Goodbye!');
      process.exit(0);
    }
    
    const optionIndex = parseInt(choice) - 1;
    
    if (optionIndex >= 0 && optionIndex < options.length) {
      const selected = options[optionIndex];
      
      if (selected.script === null) {
        // Check status option
        await checkImageStatus();
        console.log('\nPress Enter to return to menu...');
        return;
      }
      
      console.log(`\n🚀 Starting: ${selected.name}\n`);
      
      try {
        // Execute the selected script
        execSync(`node ${path.join(__dirname, selected.script)}`, {
          stdio: 'inherit'
        });
      } catch (error) {
        console.error(`\n❌ Error running script: ${error.message}`);
      }
      
      console.log('\n✅ Script completed!');
      process.exit(0);
    } else {
      console.log('\n❌ Invalid choice. Please enter 1-5 or Q to quit: ');
    }
  });
}

// Run the main menu
main().catch(console.error);