import heroImg from '@/src/assets/images/hero_bali_resort_1791004276796.jpg';
import echoBeachImg from '@/src/assets/images/wina_echo_beach_room_1791004290768.jpg';
import villaPoolImg from '@/src/assets/images/wina_villa_pool_1791004304004.jpg';
import ambienceImg from '@/src/assets/images/bali_canggu_ambience_1791004314788.jpg';

export type BlogCategory =
  | 'Bali Travel Guide'
  | 'Canggu Accommodation Guide'
  | 'The Wina Hospitality'
  | 'Bali Stay Tips';

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleId: string;
  metaDescEn: string;
  metaDescId: string;
  category: BlogCategory;
  categoryEn: string;
  categoryId: string;
  readTime: string;
  publishDate: string;
  coverImage: string;
  recommendedPropertyId?: string;
  isPropertySpecific?: boolean;
  targetKeywords: string[];
  canonicalUrl: string;
  contentEn: {
    heading?: string;
    subheading?: string;
    paragraphs: string[];
    listItems?: string[];
  }[];
  contentId: {
    heading?: string;
    subheading?: string;
    paragraphs: string[];
    listItems?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  // ==========================================
  // Category: Bali Travel Guide
  // ==========================================
  {
    id: 'post-1',
    slug: 'things-to-do-in-canggu',
    titleEn: 'Things to Do in Canggu, Bali: Surfing, Sunsets, & Beyond',
    titleId: 'Aktivitas Seru di Canggu, Bali: Dari Selancar Hingga Menikmati Senja',
    metaDescEn: 'Looking for the best things to do in Canggu, Bali? Explore famous surf spots, sunset beachfront venues, artisanal cafes, and quiet coastal escapes.',
    metaDescId: 'Temukan hal-hal terbaik yang bisa dilakukan di Canggu, Bali. Panduan selancar, kafe estetis, sunset di Echo Beach, hingga relaksasi nyaman.',
    category: 'Bali Travel Guide',
    categoryEn: 'Bali Travel Guide',
    categoryId: 'Panduan Wisata Bali',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: heroImg,
    recommendedPropertyId: 'echo-beach',
    targetKeywords: ['Things to Do in Canggu', 'Canggu activities', 'Echo Beach surf', 'Batu Bolong sunset', 'what to do in Canggu Bali'],
    canonicalUrl: '/blog/things-to-do-in-canggu',
    contentEn: [
      {
        heading: 'Discovering the Rhythm of Canggu',
        paragraphs: [
          'Canggu has earned its reputation as Bali’s most dynamic coastal village. Unlike traditional resort enclaves, Canggu feels vibrant, alive, and rooted in an outdoor lifestyle. The day begins at dawn with surfers paddling out to the reef breaks and yoga practitioners heading to open-air pavilions, before rolling into relaxed brunch mornings and golden coastal afternoons.',
          'Whether you are visiting for three days or planning a longer island stay, knowing where to spend your hours makes all the difference.'
        ],
      },
      {
        subheading: '1. Catch Morning Waves at Echo Beach & Batu Bolong',
        paragraphs: [
          'Echo Beach is renowned for its consistent reef waves, attracting experienced surfers looking for steep lefts and fast rights. If you are beginner or intermediate, the softer sand-bottom waves of Batu Bolong provide an inviting space to rent a longboard or book a private lesson with a local instructor.',
          'Staying close to the shoreline—such as at The Wina Echo Beach Guest House (just 350 meters from the sand)—means you can easily check surf conditions at sunrise before the afternoon onshore winds kick in.'
        ],
      },
      {
        subheading: '2. Enjoy the Legendary Canggu Sunset',
        paragraphs: [
          'As 5:00 PM approaches, the coastline transforms. Travelers gather along the dark volcanic sands of Echo Beach and Nelayan Beach. Grab a fresh young coconut from a local warung, sit on the seawall, and watch the sun dip below the Indian Ocean horizon in deep shades of gold and amber.',
          'For travelers staying nearby at The Wina Guest House 2 or The Wina Guest House 3, heading to the beach takes only a few minutes by scooter or a brisk walk through coastal pathways.'
        ],
      },
      {
        subheading: '3. Explore Local Cuisine & Artisan Coffee',
        paragraphs: [
          'Canggu is celebrated across Southeast Asia for its culinary creativity. Within a single square kilometer around Batu Bolong, you will find traditional Balinese Warungs serving aromatic Nasi Campur right beside specialty sourdough bakeries, plant-based cafes, and wood-fired pizzerias.'
        ],
        listItems: [
          'Echo Beach: Ideal for early morning surf checks and beachfront sunset dinners.',
          'Batu Bolong: The heart of specialty coffee, boutiques, and organic markets.',
          'Jalan Nelayan: A quieter coastal avenue connecting village charm with the ocean.',
        ]
      }
    ],
    contentId: [
      {
        heading: 'Menikmati Suasana Unik Canggu',
        paragraphs: [
          'Canggu telah menjadi destinasi pesisir paling populer di Bali. Hari di Canggu dimulai sejak fajar saat para peselancar berlayar ke laut, berlanjut dengan sarapan santai di kafe, dan ditutup dengan pemandangan matahari terbenam yang memukau di tepi pantai.',
          'Memilih akomodasi yang tenang dan dekat dengan pantai akan memberikan pengalaman liburan yang maksimal.'
        ],
      },
      {
        subheading: '1. Surfing Pagi di Echo Beach dan Batu Bolong',
        paragraphs: [
          'Echo Beach dikenal dengan ombak karang yang menantang bagi peselancar berpengalaman, sementara Batu Bolong sangat ramah untuk pemula yang ingin belajar dengan papan selancar sewa atau instruktur lokal.',
          'Menginap dekat pantai seperti di The Wina Echo Beach Guest House memudahkan Anda memeriksa kondisi ombak di pagi hari tanpa perlu terjebak kemacetan.'
        ],
      },
      {
        subheading: '2. Pemandangan Sunset Spektakuler',
        paragraphs: [
          'Menjelang pukul 17.00 WITA, pantai-pantai di Canggu mulai dipadati wisatawan untuk menikmati senja keemasan. Dari warung kelapa muda lokal hingga kafe estetik, senja di Canggu selalu memberikan ketenangan tersendiri.'
        ],
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'canggu-travel-guide-first-timers',
    titleEn: 'Canggu Travel Guide for First-Time Visitors: What to Know Before You Go',
    titleId: 'Panduan Wisata Canggu untuk Pemula: Hal Penting Sebelum Berlibur',
    metaDescEn: 'First time in Canggu? Practical Bali travel guide covering airport transfers, getting around, scooter tips, safety, and choosing comfortable accommodation.',
    metaDescId: 'Panduan lengkap pertama kali liburan ke Canggu Bali: transportasi bandara, sewa motor, tips keamanan, hingga memilih akomodasi yang nyaman dan tenang.',
    category: 'Bali Travel Guide',
    categoryEn: 'Bali Travel Guide',
    categoryId: 'Panduan Wisata Bali',
    readTime: '7 min read',
    publishDate: 'October 2026',
    coverImage: ambienceImg,
    recommendedPropertyId: 'guest-house-2',
    targetKeywords: ['Canggu Travel Guide for First-Time Visitors', 'first time in Canggu', 'how to get around Canggu', 'Bali travel tips Canggu'],
    canonicalUrl: '/blog/canggu-travel-guide-first-timers',
    contentEn: [
      {
        heading: 'Arriving in Canggu: Distance & Airport Transfer',
        paragraphs: [
          'Canggu sits roughly 18 to 22 kilometers northwest of Ngurah Rai International Airport (DPS). Depending on the time of day, travel time typically ranges from 50 to 80 minutes. For first-time visitors, booking an airport pickup in advance with your accommodation host is the simplest way to avoid taxi haggling after a long flight.',
          'Once you arrive in Canggu, you will notice that narrow residential lanes and famous shortcuts connect the main beach avenues of Batu Bolong, Nelayan, and Echo Beach.'
        ],
      },
      {
        subheading: 'Getting Around: Scooters, Walking, & Rideshares',
        paragraphs: [
          'The scooter is Canggu’s primary mode of transport. If you have valid motorcycle riding experience and an International Driving Permit, renting a scooter gives you unmatched flexibility to explore the coast. For those who prefer not to ride, ride-hailing apps like Grab and Gojek are widely available, or you can choose a central accommodation where beaches and cafes are accessible on foot.'
        ],
      },
      {
        subheading: 'Choosing Where to Sleep: Avoiding the Noise',
        paragraphs: [
          'A key tip for first-timers is that Canggu’s main streets can stay lively late into the evening. To guarantee deep, restful sleep, choose a guest house situated down a peaceful side gang (alley) rather than directly facing a main commercial road.',
          'Both The Wina Guest House 2 (located in the serene Subak Ambengan neighborhood near Jalan Nelayan) and The Wina Guest House 3 provide quiet, shaded grounds with outdoor swimming pools just minutes from the action.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Perjalanan Awal ke Canggu',
        paragraphs: [
          'Canggu berjarak sekitar 20 km dari Bandara Ngurah Rai Bali. Mengatur penjemputan bandara terlebih dahulu akan membuat kedatangan Anda jauh lebih nyaman dan terhindar dari repot mencari taksi.',
          'Canggu terhubung oleh jalan-jalan kecil dan shortcut yang menghubungkan kawasan Batu Bolong, Nelayan, dan Echo Beach.'
        ],
      },
      {
        subheading: 'Pentingnya Memilih Lokasi yang Tenang',
        paragraphs: [
          'Jalan utama Canggu cukup ramai di malam hari. Memilih akomodasi yang berada di dalam gang pemukiman tenang seperti The Wina Guest House 2 atau The Wina Guest House 3 menjamin kualitas tidur yang nyenyak setelah seharian beraktivitas.'
        ],
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'best-beaches-near-canggu',
    titleEn: 'Best Beaches Near Canggu: Echo Beach, Batu Bolong, & Nelayan',
    titleId: 'Pantai Terbaik di Sekitar Canggu: Echo Beach, Batu Bolong, & Nelayan',
    metaDescEn: 'Explore the top beaches in Canggu Bali: Echo Beach for surf and seafood, Batu Bolong for sunsets, and Nelayan Beach for quiet coastal walks.',
    metaDescId: 'Ulasan lengkap pantai-pantai terbaik di Canggu: Pantai Echo Beach untuk surfing, Batu Bolong untuk sunset, dan Pantai Nelayan yang tenang.',
    category: 'Bali Travel Guide',
    categoryEn: 'Bali Travel Guide',
    categoryId: 'Panduan Wisata Bali',
    readTime: '5 min read',
    publishDate: 'October 2026',
    coverImage: echoBeachImg,
    recommendedPropertyId: 'echo-beach',
    targetKeywords: ['Best Beaches Near Canggu', 'Echo Beach Canggu', 'Batu Bolong beach', 'Nelayan beach Bali', 'Canggu surf beaches'],
    canonicalUrl: '/blog/best-beaches-near-canggu',
    contentEn: [
      {
        heading: 'Canggu’s Unique Volcanic Shoreline',
        paragraphs: [
          'The coastline of Canggu is defined by shimmering dark volcanic sand, wide ocean panoramas, and consistent Indian Ocean swells. Each beach along this stretch offers its own distinct character, catering to surfers, sunset lovers, and travelers seeking quiet strolls.'
        ],
      },
      {
        subheading: 'Echo Beach (Pantai Batu Mejan)',
        paragraphs: [
          'Echo Beach is Canggu’s most famous coastal landmark. Named after the historic Hindu temple on its rocky bluff, it is known internationally for punchy surf breaks and coastal dining. At low tide, rock pools emerge along the shore, making it a picturesque spot for evening walks.',
          'Guests at The Wina Echo Beach Guest House enjoy the privilege of walking to Echo Beach in approximately 4 minutes (350 meters).'
        ],
      },
      {
        subheading: 'Batu Bolong Beach',
        paragraphs: [
          'Directly in front of Jalan Pantai Batu Bolong, this is the social heart of Canggu’s beach scene. With dozens of sun loungers, umbrella rentals, and gentle rolling waves, it is the island’s favorite destination for longboard surfing and sunset watching.'
        ],
      },
      {
        subheading: 'Nelayan Beach',
        paragraphs: [
          'Tucked quietly between Batu Bolong and Berawa, Nelayan Beach is home to local fishing boats and tranquil sands. It is significantly quieter than neighboring breaks, making it the perfect escape for meditation or morning jogs. The Wina Guest House 2 is located just an 800-meter scooter ride away.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Karakter Pesisir Pantai Canggu',
        paragraphs: [
          'Garis pantai Canggu memiliki pasir hitam vulkanis yang eksotis dengan panorama laut lepas. Setiap pantai memiliki keunikan tersendiri yang cocok untuk berbagai aktivitas liburan Anda.'
        ],
      },
      {
        subheading: 'Pantai Echo Beach & Pantai Nelayan',
        paragraphs: [
          'Pantai Echo Beach sangat tersohor bagi peselancar dan penikmat kuliner pesisir, sedangkan Pantai Nelayan menawarkan suasana yang lebih hening dan alami.',
          'Akomodasi The Wina Hospitality berlokasi strategis untuk menjangkau pantai-pantai ini dengan mudah.'
        ],
      }
    ]
  },

  // ==========================================
  // Category: Canggu Accommodation Guide
  // ==========================================
  {
    id: 'post-4',
    slug: 'where-to-stay-in-canggu',
    titleEn: 'Where to Stay in Canggu, Bali: Best Areas & Accommodation Guide',
    titleId: 'Panduan Memilih Tempat Menginap di Canggu: Area & Rekomendasi Terbaik',
    metaDescEn: 'Where to stay in Canggu Bali? Compare top areas including Echo Beach, Batu Bolong, and Subak Canggu. Find guest houses and private villas to match your budget.',
    metaDescId: 'Panduan memilih area menginap di Canggu Bali: kelebihan Echo Beach, Batu Bolong, dan Subak Canggu, lengkap dengan tips guest house dan villa privat.',
    category: 'Canggu Accommodation Guide',
    categoryEn: 'Canggu Accommodation Guide',
    categoryId: 'Panduan Akomodasi Canggu',
    readTime: '7 min read',
    publishDate: 'October 2026',
    coverImage: heroImg,
    recommendedPropertyId: 'guest-house-3',
    targetKeywords: ['Where to Stay in Canggu Bali', 'Best Areas to Stay in Canggu', 'Canggu guest house recommendations', 'places to stay in Canggu'],
    canonicalUrl: '/blog/where-to-stay-in-canggu',
    contentEn: [
      {
        heading: 'Understanding Canggu’s Accommodation Landscape',
        paragraphs: [
          'Deciding where to stay in Canggu depends on your priorities: do you want to be footsteps from the surf break, steps away from trendy cafes, or tucked into a secluded private villa with your own swimming pool? Understanding the micro-locations will save you commute time and ensure a peaceful stay.'
        ],
      },
      {
        subheading: 'Echo Beach Area: For Ocean Lovers & Surfers',
        paragraphs: [
          'If your dream Bali morning involves rolling out of bed with a towel over your shoulder and checking the waves within minutes, the Echo Beach pocket is unbeatable. The Wina Echo Beach Guest House puts you 350 meters from the sand with comfortable air-conditioned bedrooms, swimming pool, and fiber WiFi.'
        ],
      },
      {
        subheading: 'Batu Bolong & Nelayan: For Foodies & Active Travelers',
        paragraphs: [
          'Jalan Pantai Batu Bolong and Jalan Nelayan host Canggu’s most beloved eateries, boutique studios, and sunset venues. Accommodations here give you central convenience. Both The Wina Guest House 2 (Jalan Nelayan) and The Wina Guest House 3 (Batu Bolong No. 20 D) deliver clean en-suite rooms, tranquil courtyards, and direct access to Canggu life.'
        ],
      },
      {
        subheading: 'Subak Canggu / Pererenan Pocket: For Private Villa Luxury',
        paragraphs: [
          'For travelers desiring complete seclusion, an exclusive private swimming pool, and dedicated kitchen facilities, the Subak Canggu area is ideal. Here, The Wina Villa 01 and The Wina Villa 02 offer private compounds enclosed by high perimeter walls—perfect for honeymooners, small families, and groups of friends.'
        ],
        listItems: [
          'Echo Beach: Best for morning surf and walking to oceanfront cafes.',
          'Batu Bolong & Nelayan: Best for central shopping, cafes, and easy beach access.',
          'Subak Canggu: Best for romantic retreats and exclusive private pool villas.',
        ]
      }
    ],
    contentId: [
      {
        heading: 'Mengenal Area Menginap di Canggu',
        paragraphs: [
          'Menentukan tempat menginap di Canggu bergantung pada rencana liburan Anda: apakah mengutamakan akses jalan kaki ke pantai selancar, dekat dengan pusat kafe, atau menginginkan privasi villa dengan kolam renang pribadi.'
        ],
      },
      {
        subheading: 'Pilihan Akomodasi The Wina Hospitality',
        paragraphs: [
          'The Wina Hospitality mengelola properti di titik-titik terbaik Canggu: The Wina Echo Beach Guest House dekat pantai, The Wina Guest House 2 & 3 di pusat Batu Bolong dan Nelayan, serta The Wina Villa 01 & 02 untuk liburan privat mewah.'
        ],
      }
    ]
  },
  {
    id: 'post-5',
    slug: 'guest-house-vs-villa-in-bali',
    titleEn: 'Guest House vs Villa in Bali: Which Accommodation Fits Your Trip?',
    titleId: 'Guest House vs Villa di Bali: Mana Pilihan yang Paling Tepat?',
    metaDescEn: 'Comparing guest houses and private villas in Bali. Explore differences in price, privacy, pool access, kitchen facilities, and travel style.',
    metaDescId: 'Perbandingan lengkap guest house dan villa di Bali: cek perbedaan biaya, privasi kolam renang, fasilitas dapur, dan kenyamanan sesuai jumlah tamu.',
    category: 'Canggu Accommodation Guide',
    categoryEn: 'Canggu Accommodation Guide',
    categoryId: 'Panduan Akomodasi Canggu',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: villaPoolImg,
    recommendedPropertyId: 'villa-01',
    targetKeywords: ['Guest House vs Villa in Bali', 'Bali guest house or villa', 'private villa Canggu Bali', 'affordable stay Bali'],
    canonicalUrl: '/blog/guest-house-vs-villa-in-bali',
    contentEn: [
      {
        heading: 'Two Distinct Ways to Experience Bali',
        paragraphs: [
          'When planning a vacation in Bali, travelers frequently weigh whether to book a boutique guest house or an exclusive private villa. Both accommodation types have strong merits depending on your budget, privacy needs, and party size.'
        ],
      },
      {
        subheading: 'The Boutique Guest House Experience',
        paragraphs: [
          'A guest house is ideal for solo travelers, remote workers, and couples who spend their days exploring beaches, cafes, and island sights. You enjoy a private air-conditioned bedroom, personal en-suite hot shower bathroom, and access to a shared tropical pool—all at accessible rates starting from Rp250,000 to Rp400,000 per night.'
        ],
      },
      {
        subheading: 'The Private Pool Villa Experience',
        paragraphs: [
          'If your dream holiday centers on private midnight swims, lazy mornings in an open-air living pavilion, preparing meals in a fully equipped kitchen, and total privacy enclosed by high walls, a private villa is worth every rupiah. The Wina Villa 01 offers an exclusive sanctuary in Subak Canggu starting from Rp1,635,000 per night.'
        ],
        listItems: [
          'Choose a Guest House if: You want great value, plan to be out exploring all day, and want simple, comfortable rest.',
          'Choose a Private Villa if: You value 100% seclusion, have a partner or family group, and want your own private swimming pool and kitchen.',
        ]
      }
    ],
    contentId: [
      {
        heading: 'Menentukan Pilihan Akomodasi yang Sesuai',
        paragraphs: [
          'Memilih antara guest house dan villa privat di Bali bergantung pada prioritas privasi, anggaran, dan gaya liburan Anda.'
        ],
      },
      {
        subheading: 'Kenyamanan Bersama The Wina Hospitality',
        paragraphs: [
          'The Wina Hospitality menyediakan opsi guest house nyaman dengan kolam renang bersama seperti Echo Beach Guest House, Guest House 2, dan Guest House 3, serta villa privat eksklusif di Villa 01 dan Villa 02.'
        ],
      }
    ]
  },
  {
    id: 'post-6',
    slug: 'affordable-places-to-stay-in-canggu',
    titleEn: 'Affordable Places to Stay in Canggu: Value, Comfort, & Location',
    titleId: 'Penginapan Terjangkau di Canggu: Kualitas Bersih, Nyaman, & Strategis',
    metaDescEn: 'Looking for affordable places to stay in Canggu without compromising on cleanliness or location? Learn what to look for and where to book.',
    metaDescId: 'Mencari penginapan terjangkau di Canggu tanpa mengorbankan kebersihan atau kenyamanan? Simak tips menemukan guest house bernilai terbaik.',
    category: 'Canggu Accommodation Guide',
    categoryEn: 'Canggu Accommodation Guide',
    categoryId: 'Panduan Akomodasi Canggu',
    readTime: '5 min read',
    publishDate: 'October 2026',
    coverImage: echoBeachImg,
    recommendedPropertyId: 'guest-house-2',
    targetKeywords: ['Affordable Places to Stay in Canggu', 'cheap accommodation Canggu', 'budget guest house Canggu', 'affordable stay Bali'],
    canonicalUrl: '/blog/affordable-places-to-stay-in-canggu',
    contentEn: [
      {
        heading: 'Quality Stays on a Sensible Budget',
        paragraphs: [
          'While Canggu has developed a reputation for luxury beach clubs and upscale dining, travelers can still find outstanding value in boutique accommodations. The key is finding properties that focus on essentials: clean air-conditioned rooms, comfortable hotel-grade mattresses, private hot water showers, and reliable high-speed WiFi.',
          'The Wina Guest House 2 (from Rp250,000/night) and The Wina Echo Beach Guest House (from Rp330,000/night) demonstrate that affordable rates can coexist with high standards of cleanliness, swimming pool access, and attentive on-site management.'
        ],
      },
      {
        subheading: 'What to Look for When Booking',
        paragraphs: [
          'Always book through verified property listings on reputable platforms like Booking.com. Check that the room includes an en-suite bathroom, split air conditioning rather than portable units, and that the property has a dedicated quiet alley location to ensure uninterrupted sleep.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Akomodasi Berkualitas dengan Tarif Terjangkau',
        paragraphs: [
          'Mendapatkan penginapan terjangkau di Canggu tanpa mengorbankan kebersihan dan kenyamanan sangat dimungkinkan. Properti seperti The Wina Guest House 2 (mulai Rp250.000/malam) dan The Wina Echo Beach Guest House (mulai Rp330.000/malam) menawarkan kamar ber-AC dengan kolam renang dan WiFi cepat di lokasi strategis.'
        ],
      }
    ]
  },

  // ==========================================
  // Category: The Wina Hospitality
  // ==========================================
  {
    id: 'post-7',
    slug: 'discover-the-wina-hospitality',
    titleEn: 'Discover The Wina Hospitality: Your Stay, Your Comfort, Your Bali Experience',
    titleId: 'Mengenal The Wina Hospitality: Kenyamanan & Pengalaman Terbaik di Bali',
    metaDescEn: 'Learn about The Wina Hospitality, managing boutique guest houses and private villas in Canggu, Bali. Discover our philosophy and properties.',
    metaDescId: 'Mengenal lebih dekat The Wina Hospitality, pengelola akomodasi guest house butik dan villa privat di Canggu, Bali dengan pelayanan ramah dan profesional.',
    category: 'The Wina Hospitality',
    categoryEn: 'The Wina Hospitality',
    categoryId: 'The Wina Hospitality',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: heroImg,
    targetKeywords: ['The Wina Hospitality', 'The Wina Canggu', 'Discover The Wina Hospitality', 'accommodation management Bali'],
    canonicalUrl: '/blog/discover-the-wina-hospitality',
    contentEn: [
      {
        heading: 'Our Vision: Thoughtful Bali Hospitality',
        paragraphs: [
          'The Wina Hospitality was founded with a clear mission: to provide travelers with clean, modern, and genuinely comfortable accommodations across Bali’s most celebrated coastal destination, Canggu.',
          'Under our tagline, "Your Stay, Your Comfort, Your Bali Experience," we bridge the gap between impersonal budget lodgings and overpriced luxury resorts. Each of our five curated properties offers an authentic Balinese welcome, meticulous daily housekeeping, and peaceful settings.'
        ],
      },
      {
        subheading: 'Our Five Properties in Canggu',
        paragraphs: [
          'We independently manage five distinct properties, each catering to different traveler profiles:',
          '1. The Wina Echo Beach Guest House: Coastal comfort 350m from Echo Beach surf, starting from Rp330,000/night (Booking.com).',
          '2. The Wina Guest House 2: Peaceful minimalist rooms on Jalan Nelayan, starting from Rp250,000/night (Booking.com ID: 2037301).',
          '3. The Wina Guest House 3: Relaxed tropical haven near Batu Bolong, starting from Rp400,000/night (Booking.com).',
          '4. The Wina Villa 01: Secluded 1-2 bedroom private pool villa in Subak Canggu, starting from Rp1,635,000/night (Trip.com ID: 120788345).',
          '5. The Wina Villa 02: Modern tropical villa with private pool, starting from Rp1,635,000/night (Coming Soon online, direct WhatsApp inquiry available).'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Filosofi Pelayanan The Wina Hospitality',
        paragraphs: [
          'The Wina Hospitality hadir untuk memberikan pengalaman menginap yang hangat, nyaman, dan berstandar tinggi di Canggu, Bali.',
          'Dengan memadukan estetika minimalis modern dan keramahan khas Bali, kami mengelola lima properti pilihan yang dapat disesuaikan dengan kebutuhan liburan Anda.'
        ],
      }
    ]
  },
  {
    id: 'post-8',
    slug: 'the-wina-echo-beach-guest-house-guide',
    titleEn: 'The Wina Echo Beach Guest House Guide: Coastal Comfort Steps from the Waves',
    titleId: 'Panduan The Wina Echo Beach Guest House: Kenyamanan Beberapa Langkah dari Pantai',
    metaDescEn: 'Complete guide to The Wina Echo Beach Guest House in Canggu Bali. Highlights, location near Echo Beach, amenities, starting price, and booking info.',
    metaDescId: 'Ulasan lengkap The Wina Echo Beach Guest House di Canggu Bali: fasilitas kamar, akses jalan kaki 350m ke Echo Beach, tarif mulai Rp330.000, dan pemesanan Booking.com.',
    category: 'The Wina Hospitality',
    categoryEn: 'The Wina Hospitality',
    categoryId: 'The Wina Hospitality',
    readTime: '5 min read',
    publishDate: 'October 2026',
    coverImage: echoBeachImg,
    recommendedPropertyId: 'echo-beach',
    isPropertySpecific: true,
    targetKeywords: ['The Wina Echo Beach Guest House', 'guest house near Echo Beach', 'The Wina Echo Beach Guest House Guide', 'stay near Echo Beach'],
    canonicalUrl: '/blog/the-wina-echo-beach-guest-house-guide',
    contentEn: [
      {
        heading: 'A Sanctuary for Surfers and Ocean Enthusiasts',
        paragraphs: [
          'Located on Jl. Pantai Batu Bolong No. 21 in Canggu, The Wina Echo Beach Guest House represents the perfect balance of surf proximity and peaceful relaxation. Just a 4-minute walk (350 meters) brings you to the sands of Echo Beach and beachfront venues like La Brisa.',
          'With starting rates from Rp330,000 per night, guests enjoy crisp air-conditioned bedrooms, private en-suite hot water bathrooms, a refreshing central swimming pool, and fiber optic WiFi.'
        ],
      },
      {
        subheading: 'Verified Booking on Booking.com',
        paragraphs: [
          'To ensure absolute transparency and ease of booking, reservations are confirmed directly via our official Booking.com profile with secure instant booking confirmation.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Akomodasi Nyaman Dekat Echo Beach',
        paragraphs: [
          'Terletak di Jl. Pantai Batu Bolong No. 21, The Wina Echo Beach Guest House menawarkan akses jalan kaki hanya 4 menit ke Pantai Echo Beach.',
          'Tarif mulai dari Rp330.000/malam dengan fasilitas kamar mandi dalam air hangat, kolam renang tropis, dan pemesanan resmi melalui Booking.com.'
        ],
      }
    ]
  },
  {
    id: 'post-9',
    slug: 'the-wina-villas-canggu-guide',
    titleEn: 'The Wina Villa 01 & Villa 02 Guide: Private Pool Serenity in Subak Canggu',
    titleId: 'Panduan The Wina Villa 01 & Villa 02: Kemewahan Kolam Renang Privat di Subak Canggu',
    metaDescEn: 'Discover The Wina Villa 01 and Villa 02 in Canggu Bali. Private pool villas featuring tropical open-air living, equipped kitchens, and total secluded comfort.',
    metaDescId: 'Panduan lengkap The Wina Villa 01 dan Villa 02 di Canggu Bali: villa privat berkolam renang dengan ruang tamu terbuka, dapur lengkap, dan privasi maksimal.',
    category: 'The Wina Hospitality',
    categoryEn: 'The Wina Hospitality',
    categoryId: 'The Wina Hospitality',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: villaPoolImg,
    recommendedPropertyId: 'villa-01',
    isPropertySpecific: true,
    targetKeywords: ['The Wina Villa 01', 'The Wina Villa 02', 'The Wina Villa Guide', 'private pool villa Canggu Bali', 'villa in Subak Canggu'],
    canonicalUrl: '/blog/the-wina-villas-canggu-guide',
    contentEn: [
      {
        heading: 'Exclusive Private Villa Living in Canggu',
        paragraphs: [
          'For travelers desiring exclusive privacy, The Wina Villa 01 and The Wina Villa 02 deliver an elevated island retreat in Subak Canggu (Jl. Pantai Batu Bolong, Jl. Subak Canggu, Canggu, Bali 80361). Both villas share this verified location while maintaining separate, private compounds.',
          'Featuring a private plunge pool, open-concept tropical lounge pavilion, fully equipped kitchen with refrigerator and stove, and air-conditioned master bedrooms with en-suite semi-outdoor bathrooms and tubs, our villas offer true sanctuary.'
        ],
      },
      {
        subheading: 'Booking Details',
        paragraphs: [
          'The Wina Villa 01 is available starting from Rp1,635,000 per night with direct verified booking on Trip.com (Hotel ID: 120788345). The Wina Villa 02 is starting from Rp1,635,000 per night with online OTA booking coming soon and direct inquiries welcomed via our WhatsApp concierge.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Kemewahan Villa Privat di Canggu',
        paragraphs: [
          'The Wina Villa 01 dan Villa 02 berlokasi di kawasan Subak Canggu yang tenang. Keduanya dilengkapi kolam renang pribadi, dapur modern, dan ruang bersantai terbuka khas Bali.',
          'Villa 01 dapat dipesan melalui Trip.com (ID: 120788345) dengan tarif mulai Rp1.635.000/malam, sedangkan Villa 02 segera hadir di platform OTA.'
        ],
      }
    ]
  },

  // ==========================================
  // Category: Bali Stay Tips
  // ==========================================
  {
    id: 'post-10',
    slug: 'how-much-does-it-cost-to-stay-in-canggu',
    titleEn: 'How Much Does It Cost to Stay in Canggu? Realistic Budget Breakdown',
    titleId: 'Berapa Biaya Menginap & Liburan di Canggu? Rincian Anggaran Realistis',
    metaDescEn: 'Planning your Bali budget? Detailed Canggu cost breakdown covering accommodation, food, scooter rentals, surfing, and activities for travelers.',
    metaDescId: 'Rincian estimasi biaya liburan di Canggu Bali: tarif akomodasi per malam, makan di warung dan kafe, sewa motor, surfing, dan tips hemat.',
    category: 'Bali Stay Tips',
    categoryEn: 'Bali Stay Tips',
    categoryId: 'Tips Menginap di Bali',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: heroImg,
    recommendedPropertyId: 'guest-house-2',
    targetKeywords: ['How Much Does It Cost to Stay in Canggu', 'Canggu Bali budget', 'Canggu accommodation cost', 'cost of travel Bali'],
    canonicalUrl: '/blog/how-much-does-it-cost-to-stay-in-canggu',
    contentEn: [
      {
        heading: 'Understanding Travel Expenses in Canggu',
        paragraphs: [
          'One of the most frequent questions from travelers is how much to budget for a trip to Canggu. Because Canggu offers both modest local amenities and upscale venues, your daily spend can vary widely depending on accommodation choices and dining style.'
        ],
      },
      {
        subheading: '1. Accommodation Costs',
        paragraphs: [
          'Boutique guest houses: High quality air-conditioned rooms with swimming pool access, like The Wina Guest House 2 (from Rp250,000/night) or The Wina Echo Beach Guest House (from Rp330,000/night), provide exceptional comfort and value.',
          'Private pool villas: For travelers seeking complete luxury and personal pools, private villas like The Wina Villa 01 start from Rp1,635,000/night.'
        ],
      },
      {
        subheading: '2. Daily Food, Transport, & Activities',
        paragraphs: [
          'Local Warungs: Rp30,000 to Rp60,000 per meal for authentic Indonesian Nasi Campur.',
          'Artisanal Cafes: Rp70,000 to Rp140,000 for specialty brunch and flat whites.',
          'Scooter Rental: Rp70,000 to Rp100,000 per day for automatic 125cc/150cc scooters.',
          'Surfboard Rental: Rp50,000 to Rp100,000 for two hours at Batu Bolong or Echo Beach.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Estimasi Pengeluaran Liburan di Canggu',
        paragraphs: [
          'Pengeluaran selama di Canggu sangat bervariasi tergantung pada pilihan tempat menginap dan gaya hidup selama berlibur.',
          'Menginap di guest house berkualitas seperti The Wina Hospitality (mulai Rp250.000/malam) memungkinkan Anda menghemat anggaran tanpa mengorbankan kenyamanan istirahat.'
        ],
      }
    ]
  },
  {
    id: 'post-11',
    slug: 'best-time-to-visit-canggu',
    titleEn: 'Best Time to Visit Canggu: Weather, Surf Seasons, & Travel Tips',
    titleId: 'Waktu Terbaik Liburan ke Canggu: Cuaca, Musim Surfing, & Panduan Wisata',
    metaDescEn: 'When is the best time to visit Canggu Bali? Learn about dry and wet seasons, surf swell consistency, crowd patterns, and shoulder season benefits.',
    metaDescId: 'Kapan waktu terbaik mengunjungi Canggu Bali? Panduan musim kemarau dan hujan, kondisi ombak selancar, dan keuntungan berlibur di musim peralihan.',
    category: 'Bali Stay Tips',
    categoryEn: 'Bali Stay Tips',
    categoryId: 'Tips Menginap di Bali',
    readTime: '5 min read',
    publishDate: 'October 2026',
    coverImage: ambienceImg,
    recommendedPropertyId: 'echo-beach',
    targetKeywords: ['Best Time to Visit Canggu', 'Canggu weather Bali', 'when to visit Canggu', 'Bali surf season Echo Beach'],
    canonicalUrl: '/blog/best-time-to-visit-canggu',
    contentEn: [
      {
        heading: 'Bali’s Tropical Seasons Explained',
        paragraphs: [
          'Bali experiences two primary seasons: the dry season (roughly May to September) and the green or wet season (November to March), with April and October acting as pleasant transitional shoulder months.',
          'Canggu is a year-round destination, but timing your visit according to your preferred activities will enhance your stay.'
        ],
      },
      {
        subheading: 'Dry Season (May – September): Best for Sunshine & Surf',
        paragraphs: [
          'Expect lower humidity, pleasant offshore breezes, and crystal-clear sunset skies. This is prime season for surfing at Echo Beach and Batu Bolong, as consistent Indian Ocean groundswells produce clean, well-formed waves.'
        ],
      },
      {
        subheading: 'Shoulder Season (April & October): The Sweet Spot',
        paragraphs: [
          'Many seasoned Bali travelers consider April and October the sweet spot: warm sunny days, lower overall crowd density, and better room availability across boutique accommodations like The Wina Hospitality.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Musim Liburan di Canggu Bali',
        paragraphs: [
          'Musim kemarau (Mei-September) menghadirkan cuaca cerah dan ombak selancar terbaik, sedangkan bulan peralihan seperti April dan Oktober menawarkan suasana yang lebih tenang dan ketersediaan kamar yang lebih leluasa.'
        ],
      }
    ]
  },
  {
    id: 'post-12',
    slug: 'bali-accommodation-tips-first-timers',
    titleEn: 'Bali Accommodation Tips for First-Time Visitors: Practical Advice from Local Hosts',
    titleId: 'Tips Memilih Akomodasi di Bali untuk Pemula: Saran Praktis dari Pengelola Lokal',
    metaDescEn: 'Practical accommodation tips for first-time Bali travelers. Verified booking channels, air conditioning checks, water pressure, and avoiding noise.',
    metaDescId: 'Tips praktis memilih akomodasi di Bali bagi wisatawan pemula: verifikasi saluran pemesanan, periksa kenyamanan AC, dan pastikan lokasi bebas kebisingan.',
    category: 'Bali Stay Tips',
    categoryEn: 'Bali Stay Tips',
    categoryId: 'Tips Menginap di Bali',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: echoBeachImg,
    recommendedPropertyId: 'guest-house-3',
    targetKeywords: ['Bali Accommodation Tips for First-Time Visitors', 'how to book accommodation Bali', 'what to look for in a Bali guest house', 'Canggu stay advice'],
    canonicalUrl: '/blog/bali-accommodation-tips-first-timers',
    contentEn: [
      {
        heading: 'Ensuring Comfort and Peace of Mind',
        paragraphs: [
          'With thousands of lodging options listed across Bali, choosing the right accommodation can feel overwhelming. A few simple precautions help ensure you arrive at a clean, peaceful sanctuary where you can truly recharge.'
        ],
      },
      {
        subheading: '1. Use Verified Booking Channels',
        paragraphs: [
          'Book exclusively through verified property links on trusted platforms such as Booking.com or directly via the official WhatsApp concierge of verified hospitality groups. This guarantees that room types, check-in terms, and cancellation policies are authentic and honored.'
        ],
      },
      {
        subheading: '2. Check Location Noise vs Main Road Access',
        paragraphs: [
          'In vibrant areas like Canggu, proximity to cafes is great, but facing a main road can mean motorcycle noise early in the morning. Look for properties tucked safely inside quiet residential lanes (gangs), such as The Wina Guest House 2, The Wina Guest House 3, and The Wina Echo Beach Guest House.'
        ],
      },
      {
        subheading: '3. Verify Fiber WiFi If Working Remotely',
        paragraphs: [
          'Not all WiFi in Bali is created equal. If you intend to take video calls or upload files, confirm that the property provides dedicated fiber optic internet rather than standard 4G cellular routers.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Saran Memilih Penginapan Nyaman di Bali',
        paragraphs: [
          'Gunakan selalu saluran pemesanan terverifikasi seperti Booking.com resmi, pastikan lokasi akomodasi berada di jalan pemukiman yang tenang, dan konfirmasi ketersediaan fasilitas penting seperti AC mandiri dan WiFi fiber berkecepatan tinggi.'
        ],
      }
    ]
  }
];
