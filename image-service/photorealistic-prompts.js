// Ultra-Photorealistic Prompts for Jewish Timeline
// Total cost: ~$0.21 for all 26 museum-quality images

const photorealisticTimelineEvents = [
  // ANCIENT ERA (1800 BCE - 1 CE) - Use FLUX Dev ($0.003/image)
  {
    id: 'abraham-journey',
    title: "Abraham's Journey from Ur",
    era: 'ancient',
    prompt: "Ultra-photorealistic 8K: 75-year-old Abraham with weathered bronze skin, deep-set dark eyes showing divine purpose, authentic 1800 BCE rough-woven wool robes with tzitzit-like fringes. Leading massive caravan - 318 fighting men plus families, thousands of sheep, goats, camels loaded with possessions. Mesopotamian sunset, golden dust clouds, massive Ziggurat of Ur silhouetted against orange sky. Sarah visible on camel, mixture of fear and faith. Shot on Phase One XF IQ4 150MP, 90mm lens, f/5.6. Every detail archaeologically perfect - pottery, tools, clothing from Ur III period excavations."
  },
  {
    id: 'covenant-abraham',
    title: 'The Covenant with Abraham',
    era: 'ancient',
    prompt: "Night photography masterpiece: Abraham alone on Judean hilltop, the Milky Way exploding overhead exactly as it appeared in 1800 BCE (archaeoastronomy accurate). His face illuminated by supernatural light seeming to emanate from the stars themselves. Tears of awe on weathered cheeks, rough hands raised to heaven. Unhewn stone altar, ancient olive trees (botanically accurate Olea europaea). Shot like Ansel Adams meets biblical epic - Hasselblad H6D-400c, 30-second exposure, ISO 400. Make viewers feel they're witnessing the moment monotheism was born."
  },
  {
    id: 'ancient-canaanites',
    title: 'Among the Ancient Canaanites',
    era: 'ancient',
    prompt: "Documentary photography: Abraham's family among Canaanite peoples, cultural exchange visible. Bronze Age market scene - pottery, textiles, metalwork archaeologically accurate to 1700 BCE Canaan. Multiple ethnicities, languages suggested through dress and gestures. Abraham distinguishable by simpler dress, different bearing. Natural light, ethnographic photography style like Sebastião Salgado. Medium format clarity showing every face tells a story."
  },
  {
    id: 'migration-to-harran',
    title: 'Migration to Harran',
    era: 'ancient',
    prompt: "Photojournalistic style: Abraham's extended family resting at ancient Harran, crossroads of civilizations. Beehive houses of mud-brick, typical of ancient Harran architecture. Merchants from many lands - Hittites, Hurrians, Amorites - authentic costumes and facial features. Terah (Abraham's father) aged and weary, Abraham looking toward unknown horizon. Documentary style, Steve McCurry approach, showing human journey."
  },
  {
    id: 'isaac-binding',
    title: 'The Binding of Isaac',
    era: 'ancient',
    prompt: "Cinematic still: The pivotal moment - Abraham's hand raised but stopped, divine light breaking through clouds. Isaac's face showing perfect trust, not fear. Ram caught in authentic Middle Eastern thicket (Pistacia palaestina). Mount Moriah rocky terrain, future Temple Mount location. Jerusalem stone altar. Shot like climactic moment in Terrence Malick film - Arri Alexa 65, anamorphic lens, catching the instant faith transcends logic."
  },
  {
    id: 'patriarchs-matriarchs',
    title: 'The Patriarchs and Matriarchs',
    era: 'ancient',
    prompt: "Multi-generational family portrait: Abraham and Sarah (elderly), Isaac and Rebecca (middle-aged), Jacob and his wives (young adults) - three generations showing family continuity. Authentic Bronze Age tent setting, period-accurate clothing showing progression of wealth. Each face distinct, showing genetic heritage. Shot like Richard Avedon's family portraits but in ancient setting. Large format camera feel, every detail sharp."
  },
  {
    id: 'jacob-wrestling',
    title: 'Jacob Wrestling the Angel',
    era: 'ancient',
    prompt: "Sports photography meets spiritual art: Jacob mid-wrestle with angelic being at Jabbok ford. Angel semi-translucent, emanating light. Water droplets frozen mid-splash, muscles straining, dawn light breaking. Jacob's face showing determination transforming to revelation. Shot at 1/8000s to freeze action, Sony α1, 600mm lens. Blend of physical and metaphysical reality."
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph and His Dreams',
    era: 'ancient',
    prompt: "Emotional photography: The reunion moment - Joseph revealing himself to brothers in Egyptian palace. Authentic 15th Dynasty Egyptian architecture, hieroglyphs readable on walls. Joseph in accurate vizier regalia - gold pectoral, fine linen, kohl-lined eyes, tears streaming. Brothers' faces showing shock, recognition, shame, relief. Shot like Annie Leibovitz portrait - medium format, perfect staging, raw emotion."
  },
  {
    id: 'joseph-reunion-egypt',
    title: 'Descent into Egypt',
    era: 'ancient',
    prompt: "Documentary epic: Jacob's entire clan arriving in Goshen - 70 souls becoming a nation. Egyptian border officials documenting arrivals (historically accurate to Hyksos period). Emotional reunion between aged Jacob and powerful Joseph. Nile Delta's green abundance contrasting with Canaan's drought. Wide establishing shot like David Lean film, 65mm film quality."
  },
  {
    id: 'egyptian-slavery',
    title: 'Egyptian Slavery',
    era: 'ancient',
    prompt: "Photojournalistic documentation: Hebrew slaves building Pithom and Ramesses. Authentic 19th Dynasty construction techniques - mud bricks with straw, copper tools. Exhausted workers but maintaining dignity, sharing water, protecting elderly. Egyptian overseers with authentic military gear. Harsh noon sun, architectural accuracy based on archaeological excavations. Shot like Sebastião Salgado's Workers series."
  },
  {
    id: 'moses-burning-bush',
    title: 'Moses and the Burning Bush',
    era: 'ancient',
    prompt: "Supernatural realism: Moses barefoot on holy ground, bush ablaze but branches unconsumed - each leaf visible through flames that defy physics. Moses' Egyptian-raised features (shaved, fine linen) contrasting with shepherd's staff. Scattered sheep, Mount Horeb's volcanic rocks. Fire creates impossible light patterns. Shot like Emmanuel Lubezki cinematography - natural light doing impossible things."
  },
  {
    id: 'exodus-red-sea',
    title: 'Exodus - Parting the Red Sea',
    era: 'ancient',
    prompt: "Epic documentary moment: Walls of water 100 feet high, held by invisible force. Seabed exposed showing coral, shells, maritime archaeology. 600,000 people between water walls - individual faces visible showing evolution from terror to awe. Egyptian chariots entering water corridor. Dawn light through water creating rainbow prisms. Shot like blend of National Geographic and Cecil B. DeMille - scientifically accurate but miraculous."
  },
  {
    id: 'moses-parting-red-sea',
    title: 'Moses Parting the Red Sea',
    era: 'ancient',
    prompt: "Heroic photography: Moses with staff raised high, powerful winds visible in his robes and beard. Behind him, the sea splits revealing dry ground. Water walls showing fish, coral, marine life suspended. Hebrew masses beginning to cross, faces transforming from fear to faith. Egyptian army visible on far shore. Shot like classical heroic painting but photorealistic - Rembrandt lighting on Moses, epic scale."
  },
  {
    id: 'receiving-torah-sinai',
    title: 'Receiving the Torah at Sinai',
    era: 'ancient',
    prompt: "Cosmic event photography: Mount Sinai wreathed in supernatural fire and smoke, lightning writing in the sky. Moses ascending into the cloud, silhouetted against divine light. 2 million people below in perfect formation by tribes. Authentic Bronze Age camp layout. Shot like storm photography meets spiritual art - long exposure capturing lightning, sharp detail in camp. Make viewers hear the thunder."
  },
  {
    id: 'wilderness-tabernacle',
    title: 'The Tabernacle in the Wilderness',
    era: 'ancient',
    prompt: "Architectural photography: The Mishkan in full detail - gold overlays gleaming, embroidered curtains moving in desert wind, pillar of cloud/fire above. Priests in exact biblical vestments performing service. Incense smoke, golden vessels, architectural precision based on biblical specifications. Shot like Julius Shulman architectural photography but for sacred space."
  },
  
  // KINGDOM & CLASSICAL ERA (1000 BCE - 70 CE) - Use FLUX Dev ($0.003/image)
  {
    id: 'king-david-jerusalem',
    title: 'King David Establishes Jerusalem',
    era: 'classical',
    prompt: "Photojournalistic celebration: David dancing with abandon before the Ark entering Jerusalem. Thousands celebrating, authentic Iron Age Jerusalem architecture. David in simple linen ephod, crown discarded, leaping with pure joy. Ark carried by Levites, showing ancient craftsmanship. Shot like Henri Cartier-Bresson's decisive moment - capturing ecstatic spirituality."
  },
  {
    id: 'solomon-temple-dedication',
    title: "Solomon's Temple Dedication",
    era: 'classical',
    prompt: "Architectural grandeur: First Temple at dedication - cedar beams, gold overlays, massive bronze pillars (Jachin and Boaz), carved cherubim. Shekinah glory descending as cloud filling temple. Solomon in royal robes, thousands of priests with authentic instruments. Shot like architectural photography meets divine encounter - tilt-shift lens showing massive scale, light beams through incense."
  },
  {
    id: 'temple-destruction',
    title: 'Babylonian Destruction',
    era: 'classical',
    prompt: "War photography: The moment of First Temple destruction - Babylonian soldiers with authentic armor and weapons, flames consuming cedar beams, priests trying to save sacred vessels. Nebuchadnezzar's army archaeologically accurate. Jerusalem's population fleeing. Shot like James Nachtwey war documentation - showing humanity amid destruction."
  },
  {
    id: 'babylonian-exile',
    title: 'Exile to Babylon',
    era: 'classical',
    prompt: "Ethnographic documentation: Jewish exiles by Babylon's canals, maintaining identity in foreign land. Hanging harps on willow trees, elderly teaching children Hebrew, scribes preserving scrolls. Babylon's ziggurat and Ishtar Gate visible. Faces showing sorrow but determination. Shot like Eugene Richards - intimate, emotional, documenting cultural survival."
  },
  {
    id: 'second-temple-building',
    title: 'Return from Exile',
    era: 'classical',
    prompt: "Hope renewed photography: Exiles returning to Jerusalem, elderly who remember the First Temple weeping, young people beginning reconstruction. Persian period accurate clothing and tools. Foundation stones being laid, makeshift altar already functioning. Shot showing continuity across catastrophe - three generations united in rebuilding."
  },
  {
    id: 'maccabean-revolt',
    title: 'The Maccabean Revolt',
    era: 'classical',
    prompt: "Action photography: Judah Maccabee and brothers in guerrilla warfare against Seleucid Greeks. Authentic Hellenistic armor versus Jewish fighters with improvised weapons. Temple Mount visible, defiled but soon to be reclaimed. Dynamic combat frozen at decisive moment. Shot like sports photography meets historical epic."
  },
  {
    id: 'second-temple-destruction',
    title: 'Second Temple Destruction',
    era: 'classical',
    prompt: "Apocalyptic documentation: Roman legions under Titus breaching Jerusalem's walls, Second Temple aflame. Josephus' descriptions made visual - blood flowing, stones falling, defenders' last stand. Archaeologically perfect Roman military equipment. Shot like combination of war photography and historical painting - terrible beauty of ending era."
  },
  
  // MODERN ERA (1492 - Present) - Use Recraft V3 ($0.03/image)
  {
    id: 'spanish-expulsion',
    title: 'Spanish Inquisition and Expulsion',
    era: 'modern',
    prompt: "Historical documentation: 1492 - Jewish families at Spanish ports, clutching keys to homes they'll never see again. Some boarding ships, others converting under duress. Spanish soldiers, Inquisition officials watching. Alhambra visible in distance. Shot like migration photography - showing human cost of expulsion. Photorealistic style emphasizing human emotion over historical pageantry."
  },
  {
    id: 'warsaw-ghetto-uprising',
    title: 'Warsaw Ghetto Uprising',
    era: 'modern',
    prompt: "Resistance photography: 1943 - Starved but determined fighters with few weapons facing Nazi forces. Smoke from burning buildings, teenage fighters with Molotov cocktails. Based on actual photographs but showing human dignity in extremity. Shot respectfully, like combination of war documentation and memorial art. Black and white photography style, grain and contrast of 1940s photojournalism."
  },
  {
    id: 'holocaust-liberation',
    title: 'Liberation from Camps',
    era: 'modern',
    prompt: "Documentary moment: Allied soldiers discovering camp survivors - skeletal but alive, eyes showing disbelief at freedom. Soldiers' faces showing shock at what they're witnessing. Based on actual liberation photographs but focused on moment of human connection. Black and white photography style, historically accurate. Shot with deep respect, showing humanity emerging from darkness."
  },
  {
    id: 'israel-independence',
    title: 'Establishment of Israel',
    era: 'modern',
    prompt: "Historic moment: Ben-Gurion declaring independence under Herzl's portrait, diverse founding generation - European refugees, Yemenite Jews, sabras. Tel Aviv museum hall, everyone aware they're making history. Shot like combination of formal historical photography and candid photojournalism. Grainy black and white transitioning to color, symbolizing new era beginning."
  }
];

// Additional modern events that need generation
const additionalModernEvents = [
  {
    id: 'western-wall-liberation',
    title: 'Six Day War - Western Wall Liberation',
    era: 'modern',
    prompt: "Iconic moment: Israeli paratroopers at Western Wall, June 1967. Rabbi Goren blowing shofar, soldiers weeping at ancient stones. Mix of military gear and prayer shawls. Actual photograph recreation but with added detail and emotion. Shot in style of David Rubinger's famous image but expanded view showing more soldiers, more emotion."
  },
  {
    id: 'operation-solomon',
    title: 'Ethiopian Aliyah',
    era: 'modern',
    prompt: "Documentary photography: Ethiopian Jews boarding planes during Operation Solomon, 1991. Ancient traditions meeting modern rescue - elders in traditional white robes, children wide-eyed at aircraft. Israeli soldiers helping elderly aboard. Joy, tears, prayers. Shot like James Nachtwey humanitarian photography - dignity in transition."
  },
  {
    id: 'modern-israel-innovation',
    title: 'Modern Israel Innovation',
    era: 'modern',
    prompt: "Contemporary documentary: Split-screen effect showing ancient Jerusalem walls and modern Tel Aviv tech hub. Startup nation - diverse young Israelis coding, agricultural tech making desert bloom, medical breakthroughs. Traditional and secular working together. Shot like modern tech photography meets National Geographic cultural documentation."
  },
  {
    id: 'october-7-attack',
    title: 'October 7 Hamas Attack',
    era: 'modern',
    prompt: "Memorial photography: Not showing violence but aftermath of resilience. Nova festival site transformed into memorial with photos of victims becoming butterflies. Families lighting candles at dawn where darkness fell. Shot with extreme sensitivity - focus on light overcoming darkness, memory preserving life. Contemporary documentary style."
  },
  {
    id: 'operation-swords-iron',
    title: 'Operation Swords of Iron',
    era: 'modern',
    prompt: "Contemporary war documentation: Israeli soldiers writing messages on artillery shells - not of hate but prayers for peace. Reservists from all walks of life - teachers, doctors, artists - united in defense. Iron Dome streaks protecting cities below. Shot like modern conflict photography but emphasizing defense not aggression, unity not division."
  },
  {
    id: 'global-jewish-unity',
    title: 'Global Jewish Unity',
    era: 'modern',
    prompt: "Global solidarity photography: Split-screen showing simultaneous rallies - Western Wall, Times Square, Eiffel Tower, Sydney Opera House. Thousands holding candles, Israeli flags, signs in many languages. Young and old, religious and secular, united. Drone photography style showing scale of global support. Colors of sunset uniting all locations."
  },
  {
    id: 'hostage-release',
    title: 'First Hostage Release',
    era: 'modern',
    prompt: "Emotional photojournalism: The moment of reunion - silhouettes running toward each other, families embracing. No faces visible to protect privacy, but body language showing overwhelming emotion. Red Cross vehicles, Israeli flags, dawn light symbolizing hope. Shot like Pulitzer-winning photography - universal human emotion transcending politics."
  },
  {
    id: 'israel-resilience-2024',
    title: 'Resilience and Rebuilding',
    era: 'modern',
    prompt: "Hope photography: Children planting trees in areas hit by rockets, their drawings of peace posted on construction walls. Communities rebuilding together - Orthodox and secular, Jewish and Arab citizens working side by side. Spring flowers blooming through debris. Shot like Steve McCurry - color, hope, human resilience. Golden hour light on faces showing determination."
  },
  {
    id: 'ur-of-chaldees',
    title: 'Ur of the Chaldees',
    era: 'ancient',
    prompt: "Archaeological photography: The great Ziggurat of Ur at sunset, 2000 BCE. Massive stepped pyramid dominating Mesopotamian plain. Urban civilization at its height - markets, scribes with cuneiform tablets, priests in ritual garments. Abraham's family compound visible among the houses. Shot like documentary archaeology photography - scientific accuracy with artistic composition. Golden hour lighting on mud-brick architecture."
  }
];

// Combine all events
const allEvents = [...photorealisticTimelineEvents, ...additionalModernEvents];

// Model selection based on era
const getModel = (era) => {
  if (era === 'modern') {
    return {
      name: 'recraft-ai/recraft-v3',
      cost: 0.03,
      config: {
        style: 'realistic_image',
        width: 1920,
        height: 1080
      }
    };
  }
  return {
    name: 'black-forest-labs/flux-dev',
    cost: 0.003,
    config: {
      aspect_ratio: '16:9',
      output_format: 'jpg',
      output_quality: 95,
      num_inference_steps: 28
    }
  };
};

// Cost calculation
const calculateTotalCost = () => {
  const ancientCount = allEvents.filter(e => e.era === 'ancient').length;
  const classicalCount = allEvents.filter(e => e.era === 'classical').length;
  const modernCount = allEvents.filter(e => e.era === 'modern').length;
  
  const ancientCost = ancientCount * 0.003;
  const classicalCost = classicalCount * 0.003;
  const modernCost = modernCount * 0.03;
  
  return {
    ancient: { count: ancientCount, cost: ancientCost },
    classical: { count: classicalCount, cost: classicalCost },
    modern: { count: modernCount, cost: modernCost },
    total: ancientCost + classicalCost + modernCost
  };
};

module.exports = {
  allEvents,
  getModel,
  calculateTotalCost
};