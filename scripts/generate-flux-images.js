const fs = require('fs').promises;
const path = require('path');

// Timeline events with the exact prompts from ENHANCED_IMAGE_PROMPTS.md
const timelineEvents = [
  {
    id: 'abraham-journey',
    title: "Abraham's Journey from Ur",
    prompt: "Studio Ghibli style epic journey scene: Abraham leading a vast caravan across golden Mesopotamian plains at sunset. Hundreds of people, livestock, and laden camels stretch to the horizon. Abraham stands tall in flowing robes, staff in hand, looking toward distant mountains. Ancient ziggurats of Ur visible in background. Warm golden hour lighting, dust particles in air, vast cloudscapes. Highly detailed, painterly style, emotional depth, 4K quality."
  },
  {
    id: 'covenant-abraham',
    title: 'The Covenant with Abraham',
    prompt: "Studio Ghibli style transcendent moment: Abraham stands alone on a hilltop outside Harran beneath the most spectacular star-filled sky ever painted. The Milky Way arches overhead like a river of light, each star individually rendered. Abraham's face is illuminated by an otherworldly light source. His robes and beard blow in a wind that seems to come from eternity itself. Below, the landscape stretches endlessly. An altar of unhewn stones stands ready. Ancient olive trees frame the scene. Ultra-detailed star field, perfect historical costume detail, emotional and spiritual depth beyond measure"
  },
  {
    id: 'isaac-binding',
    title: 'The Binding of Isaac',
    prompt: "Studio Ghibli style dramatic mountaintop scene: Mount Moriah at dawn, ancient altar of rough stones. Abraham with raised hand frozen in time, divine light breaking through clouds. Young Isaac peaceful, trusting. Ram caught in thicket glowing with otherworldly light. Angels barely visible in clouds. Emotional intensity, morning mist, dramatic lighting, symbolic elements, masterful composition."
  },
  {
    id: 'jacob-wrestling',
    title: 'Jacob Wrestling the Angel',
    prompt: "Studio Ghibli style mystical struggle: Jacob wrestling luminous angelic being by Jabbok river at night. Angel semi-transparent with wings of light, Jacob determined and strong. River reflects supernatural glow, ancient trees frame scene. Dawn breaking on horizon. Dynamic action, spiritual energy, motion blur, ethereal atmosphere, powerful symbolism."
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph and His Dreams',
    prompt: "Studio Ghibli style emotional climax: The moment Joseph reveals himself to his brothers in his Egyptian palace. The vizier's chamber is adorned with lotus columns, walls painted with scenes of the Nile's abundance. Joseph, dressed in fine Egyptian linen with gold collar and headdress, tears streaming down his face as he embraces Benjamin. Egyptian scribes and guards look on in amazement. Through massive windows, the Nile flows. Hieroglyphics accurately depicted on every surface. Perfect emotional resonance, Ghibli at its most heart-touching"
  },
  {
    id: 'exodus-slavery',
    title: 'Slavery in Egypt',
    prompt: "Studio Ghibli style epic construction scene: Massive pyramid construction, thousands of Hebrew slaves moving enormous stones. Taskmasters on platforms, whips cracking. In foreground, strong Hebrew workers sharing water, showing solidarity. Pharaoh's palace distant. Harsh sunlight, dust, sweat, but also human dignity. Detailed crowd scenes, emotional depth, historical accuracy."
  },
  {
    id: 'moses-burning-bush',
    title: 'Moses and the Burning Bush',
    prompt: "Studio Ghibli style divine encounter: Moses barefoot before miraculous burning bush that flames but doesn't consume. Bush radiates otherworldly light, each leaf visible through flames. Moses shielding eyes from divine radiance. Mount Horeb rocky and ancient. Sheep scattered nearby. Supernatural atmosphere, detailed fire effects, sacred geometry in flames, awe-inspiring."
  },
  {
    id: 'exodus-red-sea',
    title: 'Parting of the Red Sea',
    prompt: "Studio Ghibli style miraculous scene: Massive walls of water held back by divine power, creating canyon of dry seabed. Moses with staff raised, powerful winds, Hebrew masses crossing between towering water walls filled with visible sea life. Egyptian chariots approaching. Dawn light through water creates prisms. Epic scale, detailed water physics, dramatic composition, divine intervention visible."
  },
  {
    id: 'receiving-torah-sinai',
    title: 'Receiving the Torah at Sinai',
    prompt: "Studio Ghibli style theophany: Mount Sinai wreathed in divine fire and smoke, lightning and thunder. Moses ascending into cloud, tablets glowing with holy light. Israelite camp below in reverent fear. Supernatural phenomena, cosmic significance, detailed crowd, mystical atmosphere, sacred moment captured in time."
  },
  {
    id: 'wilderness-tabernacle',
    title: 'The Tabernacle in the Wilderness',
    prompt: "Studio Ghibli style sacred architecture: Ornate Tabernacle in desert, gold overlays gleaming, embroidered curtains flowing. Pillar of cloud/fire above. Priests in detailed vestments performing rituals. Israelite camp in concentric circles around. Golden hour light, incense smoke, holy atmosphere, intricate details, architectural precision."
  },
  {
    id: 'king-david-jerusalem',
    title: 'King David Establishes Jerusalem',
    prompt: "Studio Ghibli style celebration scene: David dancing before Ark of Covenant entering Jerusalem. Massive crowds celebrating, music and joy. Ancient Jerusalem walls and buildings. David in royal but simple garments, leaping with abandon. Ark carried by Levites, glowing with divine presence. Festive atmosphere, dynamic movement, cultural authenticity, joyous energy."
  },
  {
    id: 'solomon-temple-dedication',
    title: "Solomon's Temple Dedication",
    prompt: "Studio Ghibli style architectural wonder: First Temple in full glory, Shekinah glory descending as cloud filling temple. Solomon in royal robes, hands raised. Thousands of priests and Levites with instruments. Temple details: gold, cedar, carved cherubim. Divine light breaking through clouds. Majestic scale, ornate details, sacred atmosphere, historical grandeur."
  }
];

async function generateWithFlux() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              Jewish Timeline - Flux Image Generation          ║
╚═══════════════════════════════════════════════════════════════╝
`);

  console.log('🎨 Ready to generate with FLUX.1\n');
  console.log('📋 Image prompts loaded from ENHANCED_IMAGE_PROMPTS.md\n');
  
  // Check if images directory exists
  const outputDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events');
  await fs.mkdir(outputDir, { recursive: true });

  console.log('🔧 Using the prompts you already created!\n');
  console.log('Here are the images that will be generated:\n');
  
  // List all the images
  timelineEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.title}`);
    console.log(`   File: ${event.id}.jpg`);
    console.log(`   Prompt preview: ${event.prompt.substring(0, 100)}...\n`);
  });

  console.log('📌 To generate with Flux:\n');
  console.log('1. Use HuggingFace Spaces: https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell');
  console.log('2. Or use the MCP tool: mcp__huggingface__FLUX_1-schnell-infer\n');
  
  // Create a prompts file for easy copy-paste
  const promptsContent = timelineEvents.map(event => 
    `IMAGE: ${event.id}.jpg\nTITLE: ${event.title}\nPROMPT:\n${event.prompt}\n\n${'='.repeat(80)}\n`
  ).join('\n');
  
  const promptsFile = path.join(outputDir, 'flux-prompts.txt');
  await fs.writeFile(promptsFile, promptsContent);
  
  console.log(`✅ Created prompts file at: ${promptsFile}`);
  console.log('\n📝 All your prompts are ready to use with Flux!');
  console.log('\n💡 Tip: You can also use the Huggingface MCP tool directly in this chat!');
}

// Run the script
generateWithFlux().catch(console.error);