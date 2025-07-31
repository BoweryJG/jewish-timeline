import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../frontend/public/images/events');

// Image generation configuration
const IMAGE_CONFIG = {
  width: 1200,
  height: 600,
  quality: 'high',
  style: 'Studio Ghibli, Hayao Miyazaki style, hand-painted aesthetic'
};

// All timeline events that need images
const timelineImages = [
  // Origins
  {
    filename: 'ur-of-chaldees.jpg',
    title: 'Origins in Ancient Mesopotamia',
    prompt: 'Studio Ghibli style epic masterpiece: The great ziggurat of Ur rises like a mountain of sun-baked brick against a twilight sky painted in deep purples and burning oranges. In the foreground, the family of Terah stands silhouetted. The Euphrates river winds like liquid gold in the distance. Market stalls with ceramic oil lamps cast warm pools of light. Palm trees sway gently. Volumetric light rays pierce through dusty air. Hand-painted watercolor aesthetic, extraordinary detail, museum-quality archaeological accuracy',
    category: 'origins'
  },
  {
    filename: 'ancient-canaanites.jpg',
    title: 'The Ancient Canaanites',
    prompt: 'Studio Ghibli style archaeological wonder: A fortified Canaanite city crowns a tel as the first light of dawn breaks over the Jordan Valley. Massive cyclopean stone walls with gates of Lebanese cedar. Bronze Age warriors with distinctive duck-billed axes stand guard. Terraced vineyards and olive groves cascade down hillsides. A caravan of traders approaches. The Mediterranean Sea glimmers on the western horizon. Eagles soar overhead. Wild flowers - red anemones and white rockroses - dot the landscape. Perfect archaeological details, living history, hand-painted perfection',
    category: 'origins'
  },
  {
    filename: 'migration-to-harran.jpg',
    title: 'Migration to Harran',
    prompt: "Studio Ghibli style epic migration: Terah's caravan pauses at a caravanserai outside Harran as the sun sets behind the city's distinctive beehive houses. Dozens of camels laden with goods from Ur. Young Abram helps water the animals at a stone well. The city walls of Harran rise in the background with the temple of Sin (the moon god) prominent. A full moon rises opposite the sunset creating magical dual lighting. Cooking fires send aromatic smoke spiraling up. Every textile pattern authentic, masterpiece of visual storytelling",
    category: 'migration'
  },
  {
    filename: 'abraham-covenant.jpg',
    title: "Abraham's Covenant",
    prompt: "Studio Ghibli style transcendent moment: Abraham stands alone on a hilltop beneath the most spectacular star-filled sky ever painted. The Milky Way arches overhead like a river of light. Abraham's face is illuminated by an otherworldly light. His robes and beard blow in a wind that seems to come from eternity. Below, the landscape stretches endlessly. In the near distance, his tent encampment where Sarah waits. Sheep and goats rest nearby. An altar of unhewn stones stands ready. Shooting stars arc across the sky. Ultra-detailed star field, perfect historical costume detail",
    category: 'covenant'
  },
  {
    filename: 'patriarchs-matriarchs.jpg',
    title: 'The Patriarchs and Matriarchs',
    prompt: 'Studio Ghibli style multi-generational tableau: At the ancient wells of Beersheba, three generations gather. Abraham sits beneath a tamarisk tree, while Isaac and Rebekah watch their twin boys Jacob and Esau play. Servants draw water from stone-lined wells. Flocks of sheep and goats spread across the Negev landscape. Tents of woven goat hair with intricate patterns. The landscape shows wildflowers blooming. Camels rest in the shade. Women spinning thread, grinding grain. Every face tells a story, masterwork of visual narrative complexity',
    category: 'origins'
  },
  {
    filename: 'joseph-reunion-egypt.jpg',
    title: 'Descent into Egypt',
    prompt: "Studio Ghibli style emotional climax: The moment Joseph reveals himself to his brothers in his Egyptian palace. The vizier's chamber adorned with lotus columns, walls painted with scenes of the Nile. Joseph dressed in fine Egyptian linen with gold collar, tears streaming as he embraces Benjamin. Through massive windows, the Nile flows with feluccas sailing. The pyramids of Giza visible in the distance. Hieroglyphics accurately depicted. Egyptian furniture inlaid with ebony and ivory. Extraordinary attention to Egyptian material culture, Ghibli at its most heart-touching",
    category: 'migration'
  },
  {
    filename: 'egyptian-slavery.jpg',
    title: 'Egyptian Slavery',
    prompt: "Studio Ghibli style epic of endurance: The construction site of Pharaoh's store-cities under a punishing sun. Hebrews labor making bricks. Despite hardship, dignity remains - a young mother nurses her baby in shade, men share bread, children play with mud dolls. Massive construction shows Egyptian architectural ambition. The Nile with crocodiles basking. Heat shimmer rises from the baking earth. A sense of solidarity and hidden strength. Some quietly pray, others sing work songs. Every brick detailed, maintaining human dignity even in oppression",
    category: 'struggle'
  },
  {
    filename: 'moses-parting-red-sea.jpg',
    title: 'The Exodus from Egypt',
    prompt: 'Studio Ghibli style, Moses parting the Red Sea with walls of turquoise water towering on both sides, golden sunset sky with dramatic clouds, Israelites walking through on dry ground with wonder in their eyes, men women children and elderly, carrying their belongings, wide panoramic view, detailed environment, atmospheric perspective, golden hour lighting, uplifting composition, hopeful atmosphere, hand-painted aesthetic, watercolor textures, dreamy quality, Jewish historical themes, highly detailed, masterpiece quality',
    category: 'win'
  },
  {
    filename: 'receiving-torah-sinai.jpg',
    title: 'Receiving of the Torah',
    prompt: 'Studio Ghibli style ultimate theophany: Mount Sinai transformed into a cosmic interface between heaven and earth. The mountain alive with divine energy visualized as flowing patterns of light. At the peak, clouds part to reveal infinity itself. Lightning connects summit to heavens. The Israelite camp spreads below in perfect order by tribes. Moses descends, face luminous, carrying glowing tablets. The people below - some prostrating, some dancing, some hiding faces. Supernatural wind bends all vegetation. Even the animals kneel. Perfect blend of awesome power and Ghibli humanity',
    category: 'covenant'
  },
  {
    filename: 'wilderness-tabernacle.jpg',
    title: 'Formation of Jewish Law and Identity',
    prompt: 'Studio Ghibli style sacred beauty: The Tabernacle complex in full glory at the heart of the Israelite camp during golden hour. The Mishkan glows - gold-plated boards, silver sockets, blue purple scarlet coverings. Pillar of cloud/fire hovers above. Priests in white linen perform evening service. The vast camp - hundreds of thousands of tents arranged by tribes with unique banners. Families heading home, children playing, elders discussing Torah. The desert blooms with manna. Every detail of priestly garments perfect, a vision of divine order in the wilderness',
    category: 'spiritual'
  },
  {
    filename: 'king-david-jerusalem.jpg',
    title: 'King David Establishes Jerusalem',
    prompt: "Studio Ghibli style royal epic: The moment David brings the Ark of the Covenant into Jerusalem. The scene explodes with celebration - David dances with wild abandon before the Ark. The procession winds through Jerusalem's narrow streets: thousands participating - musicians with Biblical instruments, women with tambourines, children throwing flower petals. The Jebusite architecture mingles with new Israelite construction. Warriors provide honor guard. Citizens of every tribe identifiable by dress. Every instrument historically accurate, capturing both wild joy and profound spiritual significance",
    category: 'win'
  },
  {
    filename: 'solomon-temple-dedication.jpg',
    title: 'First Temple Built',
    prompt: 'Studio Ghibli style architectural miracle: The dedication of the First Temple as the Shekinah glory descends. The Temple in breathtaking detail - Lebanese cedar beams, walls overlaid with gold, bronze pillars Jachin and Boaz. The moment when cloud of divine presence fills the sanctuary - visualized as luminous mist flowing like liquid light. Solomon stands on bronze platform, arms raised. Courts packed with representatives from every corner of the kingdom. Thousands of sacrifices create sacred smoke. The Levitical choir sings. Every architectural detail realized',
    category: 'spiritual'
  }
];

// Helper functions
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Generate image using Bing Image Creator (free alternative)
async function generateWithBingCreator(prompt, outputPath) {
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true in production
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to Bing Image Creator
    await page.goto('https://www.bing.com/create', { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });
    
    // Wait for the prompt input
    await page.waitForSelector('textarea[name="q"]', { timeout: 30000 });
    
    // Enter the prompt
    await page.type('textarea[name="q"]', prompt);
    
    // Click create button
    await page.click('button[type="submit"]');
    
    // Wait for images to generate (this can take a while)
    await page.waitForSelector('.gil_imgContainer img', { timeout: 120000 });
    
    // Get all generated images
    const imageUrls = await page.evaluate(() => {
      const images = document.querySelectorAll('.gil_imgContainer img');
      return Array.from(images).map(img => img.src);
    });
    
    if (imageUrls.length > 0) {
      // Download the first image
      const imageUrl = imageUrls[0];
      const viewSource = await page.goto(imageUrl);
      const buffer = await viewSource.buffer();
      await fs.writeFile(outputPath, buffer);
      
      console.log(`✅ Generated and saved: ${path.basename(outputPath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error with Bing Creator:`, error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Generate using OpenAI DALL-E (requires API key)
async function generateWithDallE(prompt, outputPath) {
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  No OpenAI API key found in environment');
    return false;
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
        style: 'vivid'
      })
    });
    
    const data = await response.json();
    
    if (data.data && data.data[0] && data.data[0].url) {
      // Download the generated image
      const imageResponse = await fetch(data.data[0].url);
      const buffer = await imageResponse.arrayBuffer();
      await fs.writeFile(outputPath, Buffer.from(buffer));
      
      console.log(`✅ Generated with DALL-E: ${path.basename(outputPath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error with DALL-E:`, error.message);
    return false;
  }
}

// Create a high-quality placeholder
async function createArtisticPlaceholder(image) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Create an artistic placeholder with the event details
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Crimson+Text:ital@0;1&display=swap');
          
          body {
            margin: 0;
            width: 1200px;
            height: 600px;
            overflow: hidden;
            position: relative;
            font-family: 'Crimson Text', serif;
          }
          
          .background {
            position: absolute;
            inset: 0;
            background: ${getGradientForCategory(image.category)};
            filter: brightness(0.7);
          }
          
          .overlay {
            position: absolute;
            inset: 0;
            background: 
              radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(255,215,0,0.1) 0%, transparent 50%);
          }
          
          .content {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px;
            text-align: center;
            color: white;
            z-index: 1;
          }
          
          .title {
            font-family: 'Cinzel', serif;
            font-size: 48px;
            font-weight: 600;
            margin-bottom: 30px;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5);
            letter-spacing: 2px;
          }
          
          .description {
            font-size: 20px;
            line-height: 1.8;
            max-width: 800px;
            opacity: 0.9;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            font-style: italic;
          }
          
          .watermark {
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 14px;
            opacity: 0.5;
            font-family: 'Cinzel', serif;
          }
          
          .decorative {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            background-image: url('data:image/svg+xml,${encodeURIComponent(getDecorativeSVG())}');
            background-size: 300px;
            background-repeat: repeat;
          }
        </style>
      </head>
      <body>
        <div class="background"></div>
        <div class="decorative"></div>
        <div class="overlay"></div>
        <div class="content">
          <h1 class="title">${image.title}</h1>
          <p class="description">${image.prompt.substring(0, 150)}...</p>
        </div>
        <div class="watermark">AI Image Placeholder</div>
      </body>
      </html>
    `;
    
    await page.setContent(html);
    await page.setViewport({ width: 1200, height: 600 });
    
    const outputPath = path.join(IMAGES_DIR, image.filename);
    await page.screenshot({ 
      path: outputPath,
      type: 'jpeg',
      quality: 95
    });
    
    console.log(`🎨 Created artistic placeholder: ${image.filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating placeholder:`, error.message);
    return false;
  } finally {
    await browser.close();
  }
}

function getGradientForCategory(category) {
  const gradients = {
    origins: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    migration: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    covenant: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    spiritual: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    win: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    struggle: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    attack: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    cultural: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    golden_age: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    innovation: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    resilience: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)'
  };
  return gradients[category] || gradients.origins;
}

function getDecorativeSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50 15 L65 45 L35 45 Z M50 85 L35 55 L65 55 Z" fill="white" opacity="0.3"/>
  </svg>`;
}

// Main execution
async function main() {
  console.log('🎨 Starting AI image generation process...\n');
  console.log(`📁 Images will be saved to: ${IMAGES_DIR}\n`);
  
  await ensureDir(IMAGES_DIR);
  
  const generationMethod = process.argv[2] || 'placeholder';
  
  for (const image of timelineImages) {
    const outputPath = path.join(IMAGES_DIR, image.filename);
    
    // Check if image already exists
    try {
      await fs.access(outputPath);
      console.log(`✓ ${image.filename} already exists, skipping...`);
      continue;
    } catch {
      // Image doesn't exist, proceed
    }
    
    console.log(`\n🖼️  Generating: ${image.title}`);
    
    let success = false;
    
    switch (generationMethod) {
      case 'dalle':
        success = await generateWithDallE(image.prompt, outputPath);
        break;
      case 'bing':
        success = await generateWithBingCreator(image.prompt, outputPath);
        break;
      case 'placeholder':
      default:
        success = await createArtisticPlaceholder(image);
        break;
    }
    
    if (!success && generationMethod !== 'placeholder') {
      console.log('⚠️  Falling back to placeholder...');
      await createArtisticPlaceholder(image);
    }
    
    // Add a delay between generations to avoid rate limiting
    if (generationMethod !== 'placeholder') {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log('\n✨ Image generation complete!');
  console.log('\nUsage options:');
  console.log('  npm run generate-images          # Create placeholders');
  console.log('  npm run generate-images dalle    # Use DALL-E 3 (requires API key)');
  console.log('  npm run generate-images bing     # Use Bing Creator (free, manual)');
}

main().catch(console.error);