const fs = require('fs').promises;
const path = require('path');

// October 7 and recent events with Ghibli-style prompts
const october7Events = [
  {
    id: 'october-7-attack',
    title: 'October 7 Hamas Attack',
    prompt: "Studio Ghibli style dawn scene with deep emotional resonance: Southern Israeli kibbutz at sunrise, peaceful agricultural fields with golden wheat swaying. Children's colorful playground equipment, small homes with gardens, laundry on lines. But ominous storm clouds gathering on horizon, dark shadows creeping across fields. Birds taking flight in alarm. Contrast between idyllic peace and approaching darkness. Soft watercolor style, muted morning colors transitioning to grey. Deeply emotional, foreboding atmosphere. No violence shown, only the last moment of peace."
  },
  {
    id: 'operation-swords-iron',
    title: 'Operation Swords of Iron',
    prompt: "Studio Ghibli style protective scene: Night sky over Israeli cities filled with Iron Dome interceptions creating protective umbrella of light trails. Defensive missiles arc gracefully across star-filled sky like protective spirits. Below, cities glow with warm lights, people visible taking shelter. IDF soldiers standing guard with determination. Blue and white colors prominent. Ethereal light effects, trails of light creating shield pattern. Sense of protection, resilience, and defense. Hopeful despite danger, masterful night scene composition."
  },
  {
    id: 'global-jewish-unity',
    title: 'Global Jewish Unity',
    prompt: "Studio Ghibli style global unity scene: Jewish communities worldwide connected by golden threads of light arcing across Earth. Vigils and rallies from New York to Paris to Tel Aviv to Buenos Aires. Thousands holding candles, Israeli flags, singing together. Star of David constellation visible in night sky. Golden light emanating from each gathering, connecting across continents. Prayers ascending like luminous doves. Deeply moving, warm golden tones, sense of solidarity and strength in unity. Hope overcoming darkness."
  },
  {
    id: 'hostage-release',
    title: 'First Hostage Release',
    prompt: "Studio Ghibli style emotional reunion: Red Cross vehicles at border crossing, families running toward each other with tears of joy. Released hostages embracing loved ones, children lifted high. White doves taking flight overhead. Golden hour light breaking through after long darkness. Israeli flags and yellow ribbons everywhere. Medical teams caring with compassion. Overwhelming emotion, tears of relief and joy. Soft, warm lighting, watercolor effects emphasizing human connection and love conquering separation."
  },
  {
    id: 'israel-resilience-2024',
    title: 'Resilience and Rebuilding',
    prompt: "Studio Ghibli style renewal scene: Israeli communities rebuilding with determination and hope. Construction crews working alongside volunteers, new homes rising. Children playing in rebuilt playgrounds, elderly planting new gardens. Memorial walls with photos transforming into living memories. Phoenix imagery subtle in clouds. Flowers blooming in former destruction, olive trees bearing fruit. Sunrise over renewed landscape. Vibrant life colors returning, community spirit visible. Architecture blending memorial with future hope. Deeply optimistic while acknowledging loss."
  }
];

// FLUX.1-schnell API configuration
const API_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell';
const API_KEY = process.env.HUGGINGFACE_API_KEY;

async function generateImage(prompt, outputPath) {
  if (!API_KEY) {
    console.error('❌ HUGGINGFACE_API_KEY not found in environment variables');
    console.log('Please set: export HUGGINGFACE_API_KEY="your-key-here"');
    return false;
  }

  console.log(`🎨 Generating image...`);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 1024,
          height: 768,
          num_inference_steps: 4,
          guidance_scale: 0.0
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${error}`);
    }

    const buffer = await response.buffer();
    await fs.writeFile(outputPath, buffer);
    console.log(`✅ Saved to: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating image: ${error.message}`);
    return false;
  }
}

async function generateAllImages() {
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  
  // Ensure directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  console.log('🚀 Starting October 7 events image generation...\n');
  console.log('Using FLUX.1-schnell for high-quality, fast generation\n');

  for (const event of october7Events) {
    console.log(`\n📸 Processing: ${event.title}`);
    console.log(`   ID: ${event.id}`);
    
    const outputPath = path.join(outputDir, `${event.id}.jpg`);
    
    // Check if image already exists
    try {
      await fs.access(outputPath);
      console.log(`⚠️  Image already exists, skipping...`);
      continue;
    } catch {
      // File doesn't exist, proceed with generation
    }
    
    const success = await generateImage(event.prompt, outputPath);
    
    if (success) {
      // Wait a bit between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n✨ October 7 image generation complete!');
  console.log('\nNext steps:');
  console.log('1. Review generated images in frontend/public/images/events/');
  console.log('2. Run: cd data-scripts && npm run seed');
  console.log('3. Start the app: cd frontend && npm run dev');
}

// Alternative: Generate with local instructions if no API key
async function generateInstructionsOnly() {
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  await fs.mkdir(outputDir, { recursive: true });
  
  console.log('📝 Creating image generation instructions...\n');
  
  for (const event of october7Events) {
    const instructions = `
Image Generation Instructions: ${event.title}
=============================================

Filename: ${event.id}.jpg

Full Prompt:
${event.prompt}

Quick Generation Options:
1. Bing Image Creator (Free): https://www.bing.com/create
2. Stable Diffusion: https://stablediffusionweb.com/
3. DALL-E 3: https://www.openai.com/dall-e-3
4. Midjourney: https://www.midjourney.com/

Style Guidelines:
- Studio Ghibli aesthetic (watercolor, emotional depth)
- High resolution (at least 1024x768)
- Appropriate emotional tone for the event
- Focus on human stories and emotion
- Avoid graphic violence, focus on resilience

Generated: ${new Date().toISOString()}
`;
    
    const instructionsPath = path.join(outputDir, `${event.id}.instructions.txt`);
    await fs.writeFile(instructionsPath, instructions);
    console.log(`📄 Created instructions for: ${event.title}`);
  }
  
  console.log('\n✅ Instructions created! Use these to generate images manually.');
}

// Run the script
if (require.main === module) {
  // For now, just generate instructions since we don't have dependencies installed
  generateInstructionsOnly().catch(console.error);
}

module.exports = { generateAllImages };