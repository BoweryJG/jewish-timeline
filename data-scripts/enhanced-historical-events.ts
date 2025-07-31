import { createClient } from '@supabase/supabase-js'
import type { TimelineEvent } from '../frontend/src/lib/supabase'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables from parent directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

// Initialize Supabase client with service role key for seeding
const supabaseUrl = 'https://alkzliirqdofpygknsij.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_KEY is required in .env file')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Comprehensive historical events data - Part 1: Ancient to Medieval
const ancientEvents: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>[] = [
  // Origins and Pre-Abrahamic Era
  {
    epoch: 'Ancient',
    start_date: '0001-01-01',
    end_date: '0001-01-01',
    location: {
      lat: 30.9626, lng: 46.1025,
      name: 'Ur of the Chaldees',
      region: 'Mesopotamia',
      country: 'Ancient Sumer'
    },
    category: 'win',
    title: 'Origins in Ancient Mesopotamia',
    synopsis: '(c. 2000 BCE) In the shadow of the great ziggurat of Ur, where the Tigris and Euphrates rivers birthed civilization itself, dwelt the ancestors of a people destined to change the world. Here, in this metropolis of mud-brick and bronze, where cuneiform tablets recorded humanity\'s first laws and myths, the family of Terah lived among idol-worshippers and star-gazers. Yet from this polytheistic crucible would emerge a revolutionary idea: One God, invisible and eternal, creator of all.',
    severity_impact: 8,
    sources: [{
      title: 'Archaeological Evidence from Ur',
      url: 'https://www.penn.museum/collections/ur-digitization-project',
      type: 'archaeological'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-01',
    end_date: '0001-01-01',
    location: {
      lat: 31.2, lng: 34.7,
      name: 'Canaan',
      region: 'Levant',
      country: 'Ancient Canaan'
    },
    category: 'win',
    title: 'The Ancient Canaanites',
    synopsis: '(c. 3500-2000 BCE) The land between the River and the Sea - a narrow bridge connecting empires, where milk and honey flowed through valleys guarded by ancient fortified cities. Here dwelt the Canaanites, master traders and artisans, the Hittites with their iron secrets, the Jebusites in their mountain strongholds. Their blood would mingle with that of the Hebrews, their DNA a testament written in every Jewish genome today - we are not mere visitors to this land, but its very children, bone of its bone, flesh of its flesh.',
    severity_impact: 7,
    sources: [{
      title: 'Genomic History of Bronze Age Levant',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10212583/',
      type: 'scientific'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-01', 
    end_date: '0001-01-01',
    location: {
      lat: 36.8065, lng: 40.0853,
      name: 'Harran',
      region: 'Upper Mesopotamia',
      country: 'Ancient Aram'
    },
    category: 'win',
    title: 'Migration to Harran',
    synopsis: '(c. 2000-1900 BCE) The first exodus began not with Moses but with Terah, who gathered his household - including his son Abram and grandson Lot - and set forth from Ur\'s familiar streets into the unknown. Northward they journeyed, following the fertile crescent\'s arc, until they reached Harran, city of the moon-god Sin. Here, at the crossroads where caravans from east and west exchanged silk and spices, stories and gods, they paused. But for young Abram, this was merely a waystation on a journey toward an unimaginable destiny.',
    severity_impact: 7,
    sources: [{
      title: 'Book of Genesis 11:31',
      url: 'https://www.sefaria.org/Genesis.11.31',
      type: 'primary'
    }],
    verified: true
  },
  // Biblical Era - Using year 1 for BCE dates with note in synopsis
  {
    epoch: 'Ancient',
    start_date: '0001-01-01',
    end_date: '0001-01-02',
    location: {
      lat: 32.5, lng: 35.5,
      name: 'Canaan',
      region: 'Middle East'
    },
    category: 'win',
    title: 'Abraham\'s Covenant',
    synopsis: '(c. 1800 BCE) "Lech Lecha" - Go forth! The voice that spoke to Abraham shattered the silence of history. Leave your land, your birthplace, your father\'s house, and go to the land I will show you. With these words, monotheism entered the world stage. One man\'s willingness to answer an impossible call birthed a nation that would carry the torch of ethical monotheism through millennia of darkness. Under star-drunk skies, God sealed a covenant: your descendants shall be as numerous as the stars, and this land shall be theirs forever. The archaeological record confirms this era of Amorite migrations, but no tablet captures the revolution that began in one man\'s heart.',
    severity_impact: 10,
    sources: [{
      title: 'Book of Genesis',
      url: 'https://www.sefaria.org/Genesis',
      type: 'primary'
    }, {
      title: 'Ancient Near Eastern Migrations',
      url: 'https://www.jstor.org/stable/1356474',
      type: 'archaeological'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-02',
    end_date: '0001-01-03',
    location: {
      lat: 31.5, lng: 35.1,
      name: 'Hebron',
      region: 'Canaan'
    },
    category: 'win',
    title: 'The Patriarchs and Matriarchs',
    synopsis: '(c. 1800-1600 BCE) Three generations of dreamers and wrestlers with the divine laid the foundation of a people. Abraham, the knight of faith who argued with God to save Sodom; Sarah, who laughed at impossibility and gave birth to it; Isaac, the bridge between father and grandson; Rebecca, who secured the blessing for the younger son; Jacob, who wrestled with an angel through the night and emerged limping but victorious, earning the name Israel - "one who struggles with God." From his loins came twelve sons, each a tribe, each a different facet of the Jewish soul: Judah\'s leadership, Levi\'s priesthood, Joseph\'s dreams, Benjamin\'s fierce loyalty.',
    severity_impact: 9,
    sources: [{
      title: 'Book of Genesis',
      url: 'https://www.sefaria.org/Genesis',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient', 
    start_date: '0001-01-03',
    end_date: '0001-01-04',
    location: {
      lat: 30.5852, lng: 31.5018,
      name: 'Goshen',
      region: 'Egypt'
    },
    category: 'win',
    title: 'Descent into Egypt',
    synopsis: '(c. 1700 BCE) Dreams and famine wove the next chapter. Joseph, sold into slavery by jealous brothers, rose through prison and prophecy to stand at Pharaoh\'s right hand. When seven lean years devoured seven fat ones, Jacob\'s sons came crawling to Egypt for grain and found their brother crowned in glory. "I am Joseph," he wept. "Is my father still alive?" Thus began the sojourn in the Black Land, where 70 souls would multiply like stars, growing strong on the Nile\'s abundance. In Goshen\'s fertile pastures, they preserved their identity, their language, their covenant, even as they learned the wisdom of Egypt.',
    severity_impact: 8,
    population_after: 70,
    sources: [{
      title: 'Book of Genesis and Exodus',
      url: 'https://www.sefaria.org/Exodus',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-04',
    end_date: '0001-01-05',
    location: {
      lat: 30.5852, lng: 31.5018,
      name: 'Egypt',
      region: 'Nile Delta'
    },
    category: 'struggle',
    title: 'Egyptian Slavery',
    synopsis: '(c. 1600-1250 BCE) "A new Pharaoh arose who knew not Joseph" - and with that chilling line, paradise became prison. The descendants of the one who saved Egypt were now feared as a fifth column, their numbers a threat. Chains replaced freedom, the taskmaster\'s whip replaced Pharaoh\'s favor. Under the scorching sun, Hebrew hands built Pithom and Ramses, mighty store-cities whose bricks were mortared with blood and tears. Yet the more they were oppressed, the more they multiplied - as if suffering itself was the crucible that forged them from a family into a nation. In their cries, God heard the echo of an ancient promise.',
    severity_impact: 8,
    population_before: 70,
    population_after: 600000,
    sources: [{
      title: 'Book of Exodus',
      url: 'https://www.sefaria.org/Exodus.1',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-05',
    end_date: '0001-01-06',
    location: {
      lat: 30.3285, lng: 33.5359,
      name: 'Mount Sinai',
      region: 'Middle East'
    },
    category: 'win',
    title: 'Receiving of the Torah',
    synopsis: '(c. 1250 BCE) At Sinai, heaven kissed earth. The mountain smoked and trembled as the Infinite spoke to the finite. "I am the Lord your God who brought you out of Egypt" - thus began the Ten Commandments, carved by divine fire into stone. But more than law was given that day: 613 commandments formed a blueprint for holy living, a constitution for a kingdom of priests. The ragtag slaves who stood at Sinai\'s foot, still tasting freedom on their lips, said "Na\'aseh v\'nishma" - we will do and we will understand. In that moment of cosmic audacity, they accepted a burden and a blessing that would outlast empires.',
    severity_impact: 10,
    sources: [{
      title: 'Book of Exodus',
      url: 'https://www.sefaria.org/Exodus',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-06',
    end_date: '0001-01-07',
    location: {
      lat: 30.0, lng: 34.5,
      name: 'Wilderness of Sinai',
      region: 'Sinai Peninsula'
    },
    category: 'win',
    title: 'Formation of Jewish Law and Identity',
    synopsis: '(c. 1250-1210 BCE) Forty years in the wilderness - a generation of metamorphosis. Like a divine chrysalis, the desert transformed slaves into free people, subjects into citizens of eternity. They built the Mishkan, a portable palace for the Divine Presence, its gold and crimson curtains a splash of heaven in the austere desert. Here the priesthood was ordained, here the Levites sang, here the pillar of cloud by day and fire by night reminded them they were never alone. Through rebellion and plague, through the sin of the spies and the rebellion of Korach, through the death of Miriam and Aaron, they learned the hard lessons of freedom. By journey\'s end, Moses could look upon a people reborn.',
    severity_impact: 9,
    sources: [{
      title: 'Books of Exodus, Leviticus, Numbers, Deuteronomy',
      url: 'https://www.sefaria.org/Torah',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-07',
    end_date: '0001-01-08',
    location: {
      lat: 31.7683, lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East'
    },
    category: 'win',
    title: 'King David Establishes Jerusalem',
    synopsis: '(c. 1000 BCE) The sweet singer of Israel, the shepherd-king with blood on his hands and psalms on his lips, conquered the last Canaanite stronghold. Jerusalem - City of Peace, ironically won by war - became David\'s capital, chosen precisely because it belonged to no tribe and thus could belong to all. Here he brought the Ark of the Covenant with dancing and rejoicing, here he planned a Temple he would never build, here he united twelve fractious tribes into one nation under God. The city that had stood since time immemorial now began its eternal romance with the Jewish people.',
    severity_impact: 10,
    population_after: 100000,
    sources: [{
      title: 'Book of Samuel',
      url: 'https://www.sefaria.org/II_Samuel',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-07',
    end_date: '0001-01-08',
    location: {
      lat: 31.7767, lng: 35.2345,
      name: 'Jerusalem',
      region: 'Middle East'
    },
    category: 'win',
    title: 'First Temple Built',
    synopsis: '(c. 960 BCE) In seven years of sacred labor, Solomon transformed his father\'s dream into limestone and cedar, gold and bronze. The First Temple rose on Mount Moriah, where Abraham once bound Isaac, where heaven and earth are said to meet. Hiram\'s craftsmen from Tyre worked alongside Israelite builders to create a wonder of the ancient world. On dedication day, as thousands of offerings sent smoke heavenward, the Divine Presence descended in a cloud so thick the priests could not stand to minister. Solomon\'s prayer still echoes: "Will God indeed dwell on earth? Behold, the heavens cannot contain You, how much less this house I have built!"',
    severity_impact: 10,
    sources: [{
      title: 'Book of Kings',
      url: 'https://www.sefaria.org/I_Kings',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0001-01-09',
    end_date: '0001-01-10',
    location: {
      lat: 31.7683, lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East'
    },
    category: 'attack',
    title: 'Babylonian Destruction',
    synopsis: '(586 BCE) On the ninth of Av, the unthinkable happened. Nebuchadnezzar\'s Babylonian armies breached Jerusalem\'s walls after a siege that reduced mothers to eating their children. The Temple - that dwelling place of the Infinite - was put to the torch. As flames devoured cedar and gold melted into streams, the Levites sang psalms until their voices were stilled forever. The last Davidic king watched his sons slaughtered before his eyes were gouged out. In chains, the cream of Judah marched to Babylon, leaving behind a desolate land. By the rivers of Babylon, they would sit and weep, but they would not forget.',
    severity_impact: 10,
    population_before: 150000,
    population_after: 40000,
    sources: [{
      title: 'Babylonian Chronicles',
      url: 'https://www.britishmuseum.org',
      type: 'archaeological'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0070-08-01',
    end_date: '0070-08-30',
    location: {
      lat: 31.7683, lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East'
    },
    category: 'attack',
    title: 'Romans Destroy Second Temple',
    synopsis: '(70 CE) History stuttered and repeated its cruelest joke - again on the ninth of Av. Titus\' legions, after a siege that turned Jerusalem into a charnel house, broke through. Josephus records how the starving defenders fought over corpses for food, how the Romans crucified 500 Jews daily outside the walls until wood ran short. When the Temple caught fire - some say by accident, others by design - the gold melted between the stones. Roman soldiers pried apart the very foundations to retrieve it, fulfilling Jesus\' prophecy that not one stone would be left upon another. A million Jews died or were enslaved. The smoke that rose from the burning sanctuary would not clear for 2,000 years.',
    severity_impact: 10,
    population_before: 1200000,
    population_after: 200000,
    sources: [{
      title: 'The Jewish War - Josephus',
      url: 'https://www.gutenberg.org/ebooks/2850',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0132-01-01',
    end_date: '0135-12-31',
    location: {
      lat: 31.7683, lng: 35.2137,
      name: 'Judea',
      region: 'Middle East'
    },
    category: 'struggle',
    title: 'Bar Kokhba Revolt',
    synopsis: '(132-135 CE) "The Son of the Star" they called him - Bar Kokhba, a messianic warrior who for three glorious years made Rome tremble. Rabbi Akiva himself declared him the Messiah. Jewish coins proclaimed "Year One of the Redemption of Israel." But Hadrian summoned his best general and twelve legions. The final battle at Betar fell on the ninth of Av - that cursed date again. The Romans\'s revenge was genocide: 580,000 Jews killed, nearly a thousand villages razed. Hadrian renamed Jerusalem "Aelia Capitolina," banned Jews from entering except once a year to mourn, and renamed Judea "Syria Palaestina" to erase Jewish memory. The land promised to Abraham lay desolate, its children scattered to the four winds.',
    severity_impact: 10,
    population_before: 2000000,
    population_after: 500000,
    sources: [{
      title: 'Roman Historical Records',
      url: 'https://www.perseus.tufts.edu',
      type: 'secondary'
    }],
    verified: true
  }
]

// Medieval events
const medievalEvents: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    epoch: 'Medieval',
    start_date: '1096-05-25',
    end_date: '1096-05-27',
    location: {
      lat: 50.9375, lng: 6.9603,
      name: 'Worms',
      region: 'Europe',
      country: 'Germany'
    },
    category: 'attack',
    title: 'Worms Massacre - First Crusade',
    synopsis: '(1096) "God wills it!" cried the Crusaders marching to liberate the Holy Land, but they found their first infidels closer to home. In Worms, where Jews had lived peacefully for centuries, contributing Talmudic wisdom and trade wealth, the mob demanded conversion or death. Eight hundred souls faced the choice. Mothers slaughtered their babies rather than see them baptized, fathers blessed God before cutting their children\'s throats, then their own. "Hear O Israel, the Lord our God, the Lord is One" - the Shema on their lips as blood ran in the synagogue. The bishop who tried to protect them was overwhelmed. European soil drank deeply of Jewish blood that spring, and would develop a taste for it.',
    severity_impact: 9,
    population_before: 1000,
    population_after: 200,
    sources: [{
      title: 'Hebrew Chronicles of the Crusades',
      url: 'https://www.sefaria.org',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1190-03-16',
    end_date: '1190-03-17',
    location: {
      lat: 53.9600, lng: -1.0873,
      name: 'York',
      region: 'Europe',
      country: 'England'
    },
    category: 'attack',
    title: 'York Castle Massacre',
    synopsis: '150 Jews trapped in York Castle by a mob choose mass suicide rather than forced conversion, echoing the martyrdom of Masada.',
    severity_impact: 8,
    population_before: 150,
    population_after: 0,
    sources: [{
      title: 'Chronicles of William of Newburgh',
      url: 'https://www.britannica.com',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1290-07-18',
    end_date: '1290-07-18',
    location: {
      lat: 51.5074, lng: -0.1278,
      name: 'England',
      region: 'Europe',
      country: 'England'
    },
    category: 'struggle',
    title: 'Expulsion from England',
    synopsis: 'King Edward I expels all Jews from England, the first of many national expulsions that would define medieval Jewish life.',
    severity_impact: 7,
    population_before: 3000,
    population_after: 0,
    sources: [{
      title: 'Calendar of the Close Rolls',
      url: 'https://www.british-history.ac.uk',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1348-01-01',
    end_date: '1351-12-31',
    location: {
      lat: 48.8566, lng: 2.3522,
      name: 'Europe',
      region: 'Europe'
    },
    category: 'attack',
    title: 'Black Death Massacres',
    synopsis: 'Jews across Europe are blamed for the Black Death plague and massacred in hundreds of communities, despite papal protests of their innocence.',
    severity_impact: 9,
    population_before: 450000,
    population_after: 200000,
    sources: [{
      title: 'Medieval Chronicles of the Plague',
      url: 'https://www.historytoday.com',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1492-03-31',
    end_date: '1492-03-31',
    location: {
      lat: 40.4168, lng: -3.7038,
      name: 'Spain',
      region: 'Europe',
      country: 'Spain'
    },
    category: 'struggle',
    title: 'Spanish Expulsion - Alhambra Decree',
    synopsis: 'Ferdinand and Isabella expel all Jews from Spain, ending 1,500 years of Jewish life and scattering Sephardic Jews across the world.',
    severity_impact: 9,
    population_before: 200000,
    population_after: 0,
    sources: [{
      title: 'The Alhambra Decree',
      url: 'https://www.sephardicstudies.org/decree.html',
      type: 'primary'
    }],
    verified: true
  }
]

// Modern events
const modernEvents: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    epoch: 'Modern',
    start_date: '1648-01-01',
    end_date: '1649-12-31',
    location: {
      lat: 50.4501, lng: 30.5234,
      name: 'Ukraine',
      region: 'Europe',
      country: 'Poland-Lithuania'
    },
    category: 'attack',
    title: 'Chmielnicki Massacres',
    synopsis: 'Cossack leader Bohdan Chmielnicki leads devastating pogroms killing 100,000 Jews, destroying hundreds of communities in Ukraine.',
    severity_impact: 9,
    population_before: 450000,
    population_after: 350000,
    sources: [{
      title: 'Yeven Metzulah',
      url: 'https://www.sefaria.org',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1881-04-15',
    end_date: '1884-12-31',
    location: {
      lat: 46.4775, lng: 30.7326,
      name: 'Russian Empire',
      region: 'Europe',
      country: 'Russia'
    },
    category: 'attack',
    title: 'Russian Pogroms Begin',
    synopsis: 'Following the assassination of Tsar Alexander II, massive pogroms sweep the Russian Empire, sparking the first great wave of Jewish emigration to America and Palestine.',
    severity_impact: 8,
    population_before: 5000000,
    population_after: 4800000,
    sources: [{
      title: 'YIVO Archives',
      url: 'https://yivoarchives.org',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1894-10-15',
    end_date: '1906-07-12',
    location: {
      lat: 48.8566, lng: 2.3522,
      name: 'Paris',
      region: 'Europe',
      country: 'France'
    },
    category: 'struggle',
    title: 'Dreyfus Affair',
    synopsis: 'Jewish French officer Alfred Dreyfus is falsely convicted of treason, exposing deep antisemitism in modern Europe and inspiring Theodor Herzl to found political Zionism.',
    severity_impact: 7,
    sources: [{
      title: 'J\'Accuse by Émile Zola',
      url: 'https://www.marxists.org/archive/zola/1898/jaccuse.htm',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1903-04-06',
    end_date: '1903-04-08',
    location: {
      lat: 47.0105, lng: 28.8638,
      name: 'Kishinev',
      region: 'Europe',
      country: 'Russia'
    },
    category: 'attack',
    title: 'Kishinev Pogrom',
    synopsis: 'A brutal pogrom in Kishinev kills 49 Jews and wounds 500, shocking the world and accelerating Jewish emigration and Zionist organizing.',
    severity_impact: 8,
    population_before: 50000,
    population_after: 49951,
    sources: [{
      title: 'The City of Slaughter - Bialik',
      url: 'https://www.sefaria.org',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1917-11-02',
    end_date: '1917-11-02',
    location: {
      lat: 51.5074, lng: -0.1278,
      name: 'London',
      region: 'Europe',
      country: 'United Kingdom'
    },
    category: 'win',
    title: 'Balfour Declaration',
    synopsis: 'Britain declares support for "a national home for the Jewish people" in Palestine, giving international legitimacy to Zionist aspirations.',
    severity_impact: 9,
    sources: [{
      title: 'The Balfour Declaration',
      url: 'https://www.un.org/unispal/document/auto-insert-184793/',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1933-01-30',
    end_date: '1945-05-08',
    location: {
      lat: 52.5200, lng: 13.4050,
      name: 'Europe',
      region: 'Europe'
    },
    category: 'attack',
    title: 'The Holocaust - Shoah',
    synopsis: 'Nazi Germany systematically murders six million Jews - one third of world Jewry - in history\'s most methodical genocide, forever changing Jewish consciousness.',
    severity_impact: 10,
    population_before: 16600000,
    population_after: 11000000,
    sources: [{
      title: 'Yad Vashem',
      url: 'https://www.yadvashem.org',
      type: 'official'
    }],
    verified: true
  }
]

// Contemporary events - State of Israel era
const contemporaryEvents: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    epoch: 'Contemporary',
    start_date: '1948-05-14',
    end_date: '1948-05-14',
    location: {
      lat: 32.0853, lng: 34.7818,
      name: 'Tel Aviv',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'win',
    title: 'State of Israel Declared',
    synopsis: 'David Ben-Gurion declares independence as British Mandate ends. The ancient dream of return becomes reality after 2,000 years of exile.',
    severity_impact: 10,
    population_after: 650000,
    sources: [{
      title: 'Israel Declaration of Independence',
      url: 'https://www.knesset.gov.il/docs/eng/megilat_eng.htm',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1948-05-15',
    end_date: '1949-03-10',
    location: {
      lat: 31.5, lng: 34.5,
      name: 'Israel',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'struggle',
    title: 'War of Independence',
    synopsis: 'Five Arab armies invade the newborn state. Against all odds, Israel survives but loses 1% of its population - 6,373 killed.',
    severity_impact: 9,
    population_before: 650000,
    population_after: 644000,
    sources: [{
      title: 'Israel Ministry of Defense Archives',
      url: 'https://www.archives.mod.gov.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1967-06-05',
    end_date: '1967-06-10',
    location: {
      lat: 31.7683, lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'win',
    title: 'Six-Day War - Jerusalem Reunified',
    synopsis: 'Israel defeats Egypt, Jordan, and Syria in six days. Jerusalem is reunified and Jews return to pray at the Western Wall after 19 years.',
    severity_impact: 9,
    sources: [{
      title: 'IDF Historical Division',
      url: 'https://www.idf.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1972-09-05',
    end_date: '1972-09-06',
    location: {
      lat: 48.1351, lng: 11.5820,
      name: 'Munich',
      region: 'Europe',
      country: 'Germany'
    },
    category: 'attack',
    title: 'Munich Olympics Massacre',
    synopsis: 'Palestinian terrorists murder 11 Israeli Olympic athletes in Munich, bringing terrorism to the world stage.',
    severity_impact: 8,
    population_before: 11,
    population_after: 0,
    sources: [{
      title: 'Olympic Committee Archives',
      url: 'https://www.olympic.org',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1973-10-06',
    end_date: '1973-10-25',
    location: {
      lat: 31.0461, lng: 34.8516,
      name: 'Israel',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'struggle',
    title: 'Yom Kippur War',
    synopsis: 'Egypt and Syria launch surprise attack on Judaism\'s holiest day. Israel recovers from near-defeat but loses 2,656 soldiers.',
    severity_impact: 9,
    population_before: 3200000,
    population_after: 3197344,
    sources: [{
      title: 'Agranat Commission Report',
      url: 'https://www.archives.gov.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1976-07-04',
    end_date: '1976-07-04',
    location: {
      lat: 0.0445, lng: 32.4619,
      name: 'Entebbe',
      region: 'Africa',
      country: 'Uganda'
    },
    category: 'win',
    title: 'Operation Entebbe',
    synopsis: 'Israeli commandos fly 2,500 miles to rescue 102 Jewish hostages from Palestinian hijackers in Uganda, demonstrating Israel will protect Jews anywhere.',
    severity_impact: 8,
    sources: [{
      title: 'IDF Archives',
      url: 'https://www.idf.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1991-01-17',
    end_date: '1991-02-28',
    location: {
      lat: 32.0853, lng: 34.7818,
      name: 'Israel',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'struggle',
    title: 'Gulf War - Scud Attacks',
    synopsis: 'Iraq fires 39 Scud missiles at Israeli cities. Israelis sit in sealed rooms with gas masks, evoking Holocaust memories.',
    severity_impact: 7,
    sources: [{
      title: 'Israel Home Front Command',
      url: 'https://www.oref.org.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1991-05-24',
    end_date: '1991-05-25',
    location: {
      lat: 31.0461, lng: 34.8516,
      name: 'Israel',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'win',
    title: 'Operation Solomon',
    synopsis: 'Israel airlifts 14,325 Ethiopian Jews to Israel in 36 hours, fulfilling the prophecy of gathering exiles from the ends of the earth.',
    severity_impact: 8,
    population_after: 14325,
    sources: [{
      title: 'Jewish Agency Archives',
      url: 'https://www.jewishagency.org',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '2000-09-28',
    end_date: '2005-02-08',
    location: {
      lat: 31.7683, lng: 35.2137,
      name: 'Israel/Palestinian Territories',
      region: 'Middle East'
    },
    category: 'attack',
    title: 'Second Intifada',
    synopsis: 'Palestinian suicide bombings kill over 1,000 Israelis in cafes, buses, and markets. Israel builds security barrier that stops the attacks.',
    severity_impact: 9,
    population_before: 6400000,
    population_after: 6399000,
    sources: [{
      title: 'B\'Tselem Statistics',
      url: 'https://www.btselem.org',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '2005-08-15',
    end_date: '2005-09-12',
    location: {
      lat: 31.3547, lng: 34.3088,
      name: 'Gaza Strip',
      region: 'Middle East'
    },
    category: 'struggle',
    title: 'Gaza Disengagement',
    synopsis: 'Israel unilaterally withdraws from Gaza, evacuating 8,000 Jewish residents. Hamas takes control and begins launching rockets.',
    severity_impact: 7,
    population_before: 8000,
    population_after: 0,
    sources: [{
      title: 'Knesset Records',
      url: 'https://www.knesset.gov.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '2014-07-08',
    end_date: '2014-08-26',
    location: {
      lat: 31.3547, lng: 34.3088,
      name: 'Gaza/Israel',
      region: 'Middle East'
    },
    category: 'struggle',
    title: 'Operation Protective Edge',
    synopsis: 'Hamas fires thousands of rockets and uses terror tunnels. Israel discovers vast tunnel network built to massacre civilians.',
    severity_impact: 8,
    sources: [{
      title: 'IDF Spokesperson',
      url: 'https://www.idf.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '2018-03-30',
    end_date: '2019-12-27',
    location: {
      lat: 31.4167, lng: 34.3333,
      name: 'Gaza Border',
      region: 'Middle East'
    },
    category: 'struggle',
    title: 'March of Return Riots',
    synopsis: 'Hamas organizes violent border riots disguised as peaceful protests, using civilians as human shields while attempting to breach Israel\'s border.',
    severity_impact: 6,
    sources: [{
      title: 'UN Watch Reports',
      url: 'https://www.unwatch.org',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '2023-10-07',
    end_date: '2023-10-07',
    location: {
      lat: 31.2500, lng: 34.4000,
      name: 'Southern Israel',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'attack',
    title: 'October 7th Hamas Massacre',
    synopsis: 'Hamas terrorists breach Israel\'s border, systematically murdering 1,200 civilians including babies, raping women, and kidnapping 240 hostages in the deadliest day for Jews since the Holocaust.',
    severity_impact: 10,
    population_before: 1200,
    population_after: 0,
    sources: [{
      title: 'Israel Ministry of Foreign Affairs',
      url: 'https://www.gov.il/en/departments/news/swords-of-iron-7-oct-2023',
      type: 'official'
    }],
    verified: true
  }
]

// Combine all events
const allEvents = [...ancientEvents, ...medievalEvents, ...modernEvents, ...contemporaryEvents]

// Main seeding function
async function seedEnhancedDatabase() {
  console.log('Starting enhanced database seeding...')
  console.log(`Total events to seed: ${allEvents.length}`)
  
  try {
    // Clear existing events (optional - comment out if you want to append)
    console.log('Clearing existing events...')
    const { error: deleteError } = await supabase
      .from('timeline_events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (deleteError) {
      console.error('Error clearing events:', deleteError)
      return
    }

    // Insert events in batches
    const batchSize = 10
    for (let i = 0; i < allEvents.length; i += batchSize) {
      const batch = allEvents.slice(i, i + batchSize)
      console.log(`Inserting batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allEvents.length/batchSize)}...`)
      
      const { data, error } = await supabase
        .from('timeline_events')
        .insert(batch)
        .select()

      if (error) {
        console.error(`Error seeding batch starting at index ${i}:`, error)
        console.error('Failed batch:', batch)
        return
      }

      console.log(`Successfully inserted ${data.length} events`)
    }

    console.log(`Successfully seeded ${allEvents.length} historical events!`)
    
    // Add population snapshots
    const populationData = [
      { year: -1000, region: 'Ancient Israel', population: 500000 },
      { year: -586, region: 'Judea', population: 150000 },
      { year: 1, region: 'Roman Judea', population: 2500000 },
      { year: 70, region: 'Roman Judea', population: 1200000 },
      { year: 135, region: 'Global', population: 1000000 },
      { year: 1000, region: 'Global', population: 1500000 },
      { year: 1492, region: 'Global', population: 1000000 },
      { year: 1648, region: 'Global', population: 1500000 },
      { year: 1800, region: 'Global', population: 2500000 },
      { year: 1900, region: 'Global', population: 10600000 },
      { year: 1933, region: 'Global', population: 16600000 },
      { year: 1939, region: 'Global', population: 16600000 },
      { year: 1945, region: 'Global', population: 11000000 },
      { year: 1948, region: 'Israel', population: 650000 },
      { year: 1970, region: 'Global', population: 12630000 },
      { year: 2000, region: 'Global', population: 13200000 },
      { year: 2023, region: 'Global', population: 15800000 },
      { year: 2023, region: 'Israel', population: 7200000 }
    ]

    const { error: popError } = await supabase
      .from('population_snapshots')
      .upsert(populationData, { onConflict: 'year,region' })

    if (popError) {
      console.error('Error seeding population data:', popError)
    } else {
      console.log('Successfully seeded population snapshots')
    }

    console.log('Enhanced database seeding completed!')

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Run if called directly
if (import.meta.url === `file://${__filename}`) {
  seedEnhancedDatabase().then(() => {
    process.exit(0)
  }).catch((err) => {
    console.error('Failed to seed database:', err)
    process.exit(1)
  })
}

export { seedEnhancedDatabase, allEvents }
