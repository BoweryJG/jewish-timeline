const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

// Timeline events with search keywords for historical images
const timelineEvents = [
  {
    id: 'abraham-journey',
    title: 'Abraham\'s Journey from Ur',
    searches: ['Abraham leaving Ur painting', 'Mesopotamian caravan ancient art', 'Biblical Abraham journey artwork']
  },
  {
    id: 'covenant-abraham',
    title: 'The Covenant with Abraham',
    searches: ['Covenant of Abraham painting', 'Abraham stars promise artwork', 'Biblical covenant scene art']
  },
  {
    id: 'isaac-binding',
    title: 'The Binding of Isaac',
    searches: ['Binding of Isaac Caravaggio', 'Sacrifice of Isaac Rembrandt', 'Akedah Jewish art']
  },
  {
    id: 'jacob-wrestling',
    title: 'Jacob Wrestling the Angel',
    searches: ['Jacob wrestling angel Rembrandt', 'Jacob wrestling angel Delacroix', 'Biblical Jacob angel art']
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph and His Dreams',
    searches: ['Joseph dreams biblical art', 'Joseph coat many colors painting', 'Joseph dreamer artwork']
  },
  {
    id: 'exodus-slavery',
    title: 'Slavery in Egypt',
    searches: ['Israelites slavery Egypt painting', 'Hebrew slaves pyramids art', 'Exodus bondage artwork']
  },
  {
    id: 'moses-burning-bush',
    title: 'Moses and the Burning Bush',
    searches: ['Moses burning bush painting', 'Moses burning bush Chagall', 'Biblical burning bush art']
  },
  {
    id: 'exodus-red-sea',
    title: 'Parting of the Red Sea',
    searches: ['Parting Red Sea painting', 'Moses parting sea artwork', 'Crossing Red Sea biblical art']
  },
  {
    id: 'receiving-torah-sinai',
    title: 'Receiving the Torah at Sinai',
    searches: ['Moses receiving Torah painting', 'Mount Sinai Ten Commandments art', 'Giving of Torah artwork']
  },
  {
    id: 'wilderness-tabernacle',
    title: 'The Tabernacle in the Wilderness',
    searches: ['Tabernacle wilderness painting', 'Biblical Tabernacle reconstruction', 'Mishkan artwork']
  },
  {
    id: 'king-david-jerusalem',
    title: 'King David Establishes Jerusalem',
    searches: ['King David Jerusalem painting', 'David bringing ark Jerusalem', 'King David dancing ark']
  },
  {
    id: 'solomon-temple-dedication',
    title: 'Solomon\'s Temple Dedication',
    searches: ['Solomon Temple dedication painting', 'First Temple Jerusalem art', 'Solomon Temple artwork']
  }
];

// Function to download image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = require('fs').createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

// Search and download from Wikimedia Commons
async function searchWikimediaCommons(browser, event) {
  console.log(`🔍 Searching Wikimedia Commons for: ${event.title}`);
  
  const page = await browser.newPage();
  try {
    for (const searchTerm of event.searches) {
      const searchUrl = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(searchTerm)}&title=Special:MediaSearch&type=image`;
      
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      
      // Wait for search results
      await page.waitForSelector('.sdms-search-results', { timeout: 10000 });
      
      // Get image URLs
      const images = await page.evaluate(() => {
        const imgs = document.querySelectorAll('.sdms-search-results img');
        return Array.from(imgs).slice(0, 5).map(img => ({
          thumb: img.src,
          page: img.closest('a')?.href
        })).filter(item => item.page);
      });
      
      if (images.length > 0) {
        // Visit the first image page to get full resolution
        await page.goto(images[0].page, { waitUntil: 'networkidle2' });
        
        // Get the full resolution image URL
        const fullImageUrl = await page.evaluate(() => {
          // Try to find the original file link
          const originalLink = document.querySelector('.fullMedia a, .fileInfo a');
          if (originalLink) return originalLink.href;
          
          // Otherwise get the displayed image
          const displayedImg = document.querySelector('#file img, .fullImageLink img');
          return displayedImg?.src;
        });
        
        if (fullImageUrl) {
          const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', `${event.id}.jpg`);
          console.log(`✅ Found image on Wikimedia Commons`);
          console.log(`📥 Downloading: ${fullImageUrl}`);
          
          try {
            await downloadImage(fullImageUrl, outputPath);
            console.log(`✅ Saved: ${event.id}.jpg`);
            await page.close();
            return true;
          } catch (error) {
            console.log(`❌ Download failed: ${error.message}`);
          }
        }
      }
    }
  } catch (error) {
    console.log(`❌ Wikimedia search failed: ${error.message}`);
  }
  
  await page.close();
  return false;
}

// Search Metropolitan Museum collection
async function searchMetMuseum(browser, event) {
  console.log(`🏛️  Searching Met Museum for: ${event.title}`);
  
  const page = await browser.newPage();
  try {
    for (const searchTerm of event.searches) {
      const searchUrl = `https://www.metmuseum.org/art/collection/search?q=${encodeURIComponent(searchTerm)}&showOnly=openAccess`;
      
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      
      // Wait for search results
      await page.waitForSelector('.collection-object', { timeout: 10000 });
      
      // Click on first result
      const firstResult = await page.$('.collection-object a');
      if (firstResult) {
        await firstResult.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        // Get the artwork image
        const imageUrl = await page.evaluate(() => {
          const img = document.querySelector('.artwork__image img, .image-container img');
          return img?.src;
        });
        
        if (imageUrl) {
          const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', `${event.id}.jpg`);
          console.log(`✅ Found image at Met Museum`);
          
          // Met Museum images are usually high quality
          const hdUrl = imageUrl.replace('web-large', 'original');
          
          try {
            await downloadImage(hdUrl, outputPath);
            console.log(`✅ Saved: ${event.id}.jpg`);
            await page.close();
            return true;
          } catch (error) {
            // Try regular URL if HD fails
            try {
              await downloadImage(imageUrl, outputPath);
              console.log(`✅ Saved: ${event.id}.jpg`);
              await page.close();
              return true;
            } catch (e) {
              console.log(`❌ Download failed: ${e.message}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(`❌ Met Museum search failed: ${error.message}`);
  }
  
  await page.close();
  return false;
}

// Main function
async function fetchHistoricalImages() {
  console.log('🎨 Fetching Historical Images for Jewish Timeline\n');
  console.log('📌 This script searches open-access museum collections and archives');
  console.log('📌 All images are public domain or open access\n');
  
  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  await fs.mkdir(outputDir, { recursive: true });
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  try {
    const results = [];
    
    for (const event of timelineEvents) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Processing: ${event.title}`);
      console.log(`${'='.repeat(60)}\n`);
      
      // Check if image already exists
      const imagePath = path.join(outputDir, `${event.id}.jpg`);
      try {
        await fs.access(imagePath);
        console.log(`✅ Image already exists: ${event.id}.jpg`);
        results.push(`✅ ${event.id}.jpg - ${event.title} (existing)`);
        continue;
      } catch (e) {
        // Image doesn't exist, fetch it
      }
      
      let found = false;
      
      // Try Wikimedia Commons first (largest collection)
      found = await searchWikimediaCommons(browser, event);
      
      // Try Met Museum if Wikimedia fails
      if (!found) {
        found = await searchMetMuseum(browser, event);
      }
      
      if (found) {
        results.push(`✅ ${event.id}.jpg - ${event.title} (downloaded)`);
      } else {
        results.push(`❌ ${event.id}.jpg - ${event.title} (not found)`);
        console.log(`⚠️  No suitable image found for: ${event.title}`);
      }
      
      // Pause between searches to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Generate report
    console.log('\n\n📊 Fetch Summary\n' + '='.repeat(60));
    console.log(results.join('\n'));
    
    await fs.writeFile(
      path.join(outputDir, 'historical-images-report.txt'),
      `Historical Images Fetch Report\n${'='.repeat(30)}\n\nFetched on: ${new Date().toISOString()}\n\n${results.join('\n')}\n\nSources:\n- Wikimedia Commons (Open Access)\n- Metropolitan Museum of Art (Open Access)\n`
    );
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    console.log('\n\n✅ Process complete!');
    await browser.close();
  }
}

// Run the script
if (require.main === module) {
  fetchHistoricalImages().catch(console.error);
}

module.exports = { fetchHistoricalImages };