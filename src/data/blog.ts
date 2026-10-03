import heroImg from '@/src/assets/images/hero_bali_resort_1791004276796.jpg';
import echoBeachImg from '@/src/assets/images/wina_echo_beach_room_1791004290768.jpg';
import villaPoolImg from '@/src/assets/images/wina_villa_pool_1791004304004.jpg';
import ambienceImg from '@/src/assets/images/bali_canggu_ambience_1791004314788.jpg';

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleId: string;
  metaDescEn: string;
  metaDescId: string;
  categoryEn: string;
  categoryId: string;
  readTime: string;
  publishDate: string;
  coverImage: string;
  recommendedPropertyId?: string;
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
  {
    id: 'post-1',
    slug: 'best-places-to-stay-in-canggu',
    titleEn: 'Best Places to Stay in Canggu, Bali: Area & Accommodation Guide',
    titleId: 'Rekomendasi Area & Tempat Menginap Terbaik di Canggu, Bali',
    metaDescEn: 'Looking for the best places to stay in Canggu, Bali? Explore top neighborhoods including Echo Beach, Batu Bolong, and Pererenan, plus hotel & villa tips.',
    metaDescId: 'Panduan lengkap memilih tempat menginap terbaik di Canggu, Bali. Ulasan kawasan Echo Beach, Batu Bolong, hingga Pererenan beserta tips guest house dan villa.',
    categoryEn: 'Canggu Travel Guide',
    categoryId: 'Panduan Wisata Canggu',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: echoBeachImg,
    recommendedPropertyId: 'echo-beach',
    contentEn: [
      {
        heading: 'Why Canggu is Bali’s Most Desirable Coastal Hub',
        paragraphs: [
          'Over the last decade, Canggu has evolved from a sleepy surfer outpost surrounded by emerald rice terraces into Bali’s premier coastal hotspot. Renowned for its world-class surf breaks, artisanal brunch cafes, fitness clubs, and mesmerizing sunsets, Canggu attracts vacationers, honeymooners, and digital nomads from every corner of the globe.',
          'However, Canggu is not a single uniform street. It is composed of distinct pockets—each with its own vibe, noise levels, and convenience. Choosing the right neighborhood is the foundation of an unforgettable Bali stay.'
        ],
      },
      {
        subheading: 'Echo Beach: The Surfer’s Haven and Ocean Breeze',
        paragraphs: [
          'Located at the western end of Canggu’s coastline, Echo Beach is renowned for its consistent reef waves, iconic sunset beachfront venues like La Brisa, and authentic local warungs serving fresh grilled seafood.',
          'Staying near Echo Beach gives you the rare luxury of walking directly to the sand in under five minutes. For travelers seeking a balance of surf convenience and tranquil night rest, The Wina Echo Beach Guest House puts you mere footsteps from the shoreline.'
        ],
      },
      {
        subheading: 'Batu Bolong: The Epicenter of Cafes and Boutiques',
        paragraphs: [
          'If you prefer being in the middle of vibrant dining, yoga studios, and organic markets, Jalan Pantai Batu Bolong is your destination. Accommodations here allow you to step outside directly into trendy bakeries and sunset bars.',
          'For travelers desiring quiet evenings away from late-night bar crowds, choosing a guest house nestled in a peaceful side alley—such as The Wina Guest House 2—offers the best of both worlds.'
        ],
      },
      {
        subheading: 'Pererenan: Tranquil Luxury and Rice Field Charm',
        paragraphs: [
          'Just across the river shortcut lies Pererenan, a calmer sanctuary that still preserves Bali’s timeless village charm. It is particularly popular for private pool villas, making it ideal for couples and families who want seclusion with quick scooter access to Canggu’s heart.',
        ],
        listItems: [
          'Echo Beach: Best for surfers, sunset walks, and oceanfront dining.',
          'Batu Bolong: Best for cafe lovers, shopping, and nightlife.',
          'Pererenan: Best for romantic retreats, private villas, and peaceful sleeps.',
        ]
      }
    ],
    contentId: [
      {
        heading: 'Mengapa Canggu Menjadi Destinasi Wisata Terfavorit di Bali',
        paragraphs: [
          'Dalam beberapa tahun terakhir, Canggu telah berkembang pesat menjadi pusat akomodasi dan pariwisata terpopuler di Bali. Dikenal dengan ombak selancar kelas dunia, kafe estetik, pusat kebugaran, dan panorama matahari terbenam yang memukau, Canggu memikat para wisatawan dari seluruh dunia.',
          'Canggu terdiri dari beberapa area dengan karakteristik dan keunikan yang berbeda. Menemukan area yang tepat akan memaksimalkan kenyamanan liburan Anda.'
        ],
      },
      {
        subheading: 'Echo Beach: Surga Peselancar dan Semilir Angin Pantai',
        paragraphs: [
          'Terletak di pesisir barat Canggu, Echo Beach sangat terkenal dengan ombaknya yang konsisten, beach club ternama seperti La Brisa, serta kuliner tepi pantai.',
          'Menginap dekat Echo Beach memudahkan Anda jalan kaki ke bibir pantai dalam hitungan menit. The Wina Echo Beach Guest House menghadirkan kenyamanan istirahat terbaik tanpa bising jalan raya.'
        ],
      },
      {
        subheading: 'Batu Bolong & Pererenan: Dari Kafe Hits Hingga Ketenangan Villa',
        paragraphs: [
          'Batu Bolong merupakan pusat keramaian kafe dan toko butik, sementara Pererenan menawarkan suasana tenang dengan pemandangan sawah yang asri.',
        ],
        listItems: [
          'Echo Beach: Pilihan tepat bagi pecinta selancar dan sunset santai.',
          'Batu Bolong: Cocok bagi penggemar kuliner dan suasana dinamis.',
          'Pererenan: Pilihan ideal untuk villa privat dan liburan tenang bersama keluarga.',
        ]
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'complete-travel-guide-canggu-bali',
    titleEn: 'A Complete Travel Guide to Canggu, Bali: What to Know Before You Go',
    titleId: 'Panduan Lengkap Wisata ke Canggu, Bali: Tips Penting Sebelum Berangkat',
    metaDescEn: 'Plan your trip with our complete Canggu travel guide. Transportation tips, best cafes, local customs, safety advice, and comfortable accommodations.',
    metaDescId: 'Panduan terlengkap liburan ke Canggu Bali: transportasi, kuliner, sewa motor, etika lokal, hingga rekomendasi penginapan nyaman bersama The Wina.',
    categoryEn: 'Bali Travel Guide',
    categoryId: 'Panduan Wisata Bali',
    readTime: '7 min read',
    publishDate: 'October 2026',
    coverImage: heroImg,
    recommendedPropertyId: 'guest-house-2',
    contentEn: [
      {
        heading: 'Getting Started in Canggu: Arrival & Orientation',
        paragraphs: [
          'Canggu is located approximately 18 to 22 kilometers northwest of Ngurah Rai International Airport (DPS). Depending on Bali traffic, your airport transfer will take between 50 and 85 minutes. We always advise guests to arrange airport pickup in advance through reputable hospitality providers to ensure a stress-free arrival.',
          'Once in Canggu, the primary mode of transportation is the scooter. Scooters navigate the famous shortcuts effortlessly and provide freedom to explore coastal temples and hidden beaches.'
        ],
      },
      {
        subheading: 'Practical Tips for First-Time Visitors',
        paragraphs: [
          '1. Currency & Payments: While cards are widely accepted at modern cafes and boutiques, carrying Indonesian Rupiah (IDR) cash is essential for local beach warungs, parking attendants, and laundry services.',
          '2. Internet & Connectivity: Fiber Wi-Fi in boutique guest houses like The Wina properties guarantees stable remote work connections. For mobile data, purchase an eSIM or local Telkomsel tourist SIM.',
          '3. Sun Protection & Hydration: Canggu’s tropical sun is intense. Keep hydrated with clean refillable water and apply ocean-safe sunscreen.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Perjalanan Awal Menuju Canggu: Transportasi & Arahan',
        paragraphs: [
          'Canggu berjarak sekitar 20 km dari Bandara Internasional I Gusti Ngurah Rai (DPS). Waktu tempuh berkisar antara 50 hingga 80 menit tergantung kondisi lalu lintas. Mengatur layanan penjemputan bandara terlebih dahulu akan membuat kedatangan Anda jauh lebih nyaman.',
          'Sepeda motor merupakan alat transportasi paling praktis di Canggu untuk menjelajahi gang-gang jalan pintas dan pantai-pantai cantik di sekitarnya.'
        ],
      },
      {
        subheading: 'Tips Praktis Selama di Canggu',
        paragraphs: [
          'Pastikan selalu membawa uang tunai secukupnya untuk parkir dan warung lokal. Pilih penginapan dengan koneksi internet teruji agar liburan dan pekerjaan tetap berjalan lancar.'
        ],
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'things-to-do-near-echo-beach',
    titleEn: 'Top Things to Do Near Echo Beach: Surfing, Dining, & Sunsets',
    titleId: 'Aktivitas Seru di Sekitar Echo Beach: Surfing, Kuliner, & Menikmati Senja',
    metaDescEn: 'Discover the best activities around Echo Beach Canggu. From surf lessons to sunset drinks, seafood grills, and boutique markets.',
    metaDescId: 'Temukan berbagai hal menarik di sekitar Pantai Echo Beach Canggu: belajar surfing, berburu matahari terbenam, kuliner ikan bakar, hingga belanja santai.',
    categoryEn: 'Things to Do in Bali',
    categoryId: 'Aktivitas di Bali',
    readTime: '5 min read',
    publishDate: 'October 2026',
    coverImage: ambienceImg,
    recommendedPropertyId: 'echo-beach',
    contentEn: [
      {
        heading: 'The Magic of Echo Beach (Pantai Batu Mejan)',
        paragraphs: [
          'Known locally as Pantai Batu Mejan after the centuries-old ocean temple situated on its rocky bluff, Echo Beach boasts iconic dark volcanic sand and dramatic rolling waves that make it one of the most celebrated sunset spots on the island.',
          'Whether you are an active surfer catching morning swells or a relaxed traveler enjoying a fresh young coconut while reading a book, Echo Beach holds timeless appeal.'
        ],
      },
      {
        subheading: 'Top Recommended Experiences Around Echo Beach',
        paragraphs: [
          'Catch the Golden Hour: Arrive around 5:15 PM to witness Bali’s sky transform into shades of gold, rose, and amber.',
          'Support Local Warungs: Try grilled sweet corn on the cob or a fresh Indonesian Nasi Campur from traditional seaside stalls.',
          'Stay Walking Distance: Skip sunset traffic completely by booking a stay at The Wina Echo Beach Guest House, located just 350 meters from the sand.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Pesona Menakjubkan Pantai Echo Beach',
        paragraphs: [
          'Dikenal juga sebagai Pantai Batu Mejan, kawasan ini menyajikan perpaduan pasir vulkanis hitam yang eksotis, ombak selancar menawan, dan pemandangan senja spektakuler.',
          'Menginap dekat dengan pantai memungkinkan Anda menikmati keindahan ini kapan saja tanpa perlu terburu-buru menghadapi kemacetan.'
        ],
      }
    ]
  },
  {
    id: 'post-4',
    slug: 'guest-house-vs-villa-in-bali',
    titleEn: 'Guest House vs Villa in Bali: Which Accommodation Should You Choose?',
    titleId: 'Guest House vs Villa di Bali: Mana Pilihan Akomodasi Terbaik untuk Anda?',
    metaDescEn: 'Comparing guest houses and private villas in Bali. Understand differences in budget, privacy, amenities, social atmosphere, and group size.',
    metaDescId: 'Perbandingan lengkap antara guest house dan villa di Bali. Kenali perbedaan harga, privasi, fasilitas dapur, dan kecocokan dengan rencana liburan Anda.',
    categoryEn: 'Guest House and Villa Guide',
    categoryId: 'Panduan Guest House & Villa',
    readTime: '6 min read',
    publishDate: 'October 2026',
    coverImage: villaPoolImg,
    recommendedPropertyId: 'villa-01',
    contentEn: [
      {
        heading: 'Understanding the Two Classic Bali Stay Experiences',
        paragraphs: [
          'When planning a vacation in Bali, one of the first major decisions is choosing between a boutique guest house and a private pool villa. Both options offer distinctive advantages depending on your travel style, party size, and budget.',
          'The Wina Hospitality manages both categories across Canggu, allowing travelers to choose the exact experience that matches their personal preferences.'
        ],
      },
      {
        subheading: 'When to Choose a Guest House',
        paragraphs: [
          'Guest houses are ideal for solo travelers, digital nomads, and budget-conscious couples who spend most of their days out exploring Canggu’s cafes, co-working spaces, and beaches. You enjoy a private air-conditioned bedroom and en-suite bathroom, alongside access to a refreshing shared pool and communal kitchen facilities.'
        ],
      },
      {
        subheading: 'When to Choose a Private Villa',
        paragraphs: [
          'If you prioritize complete seclusion, private pool dips at midnight, an equipped personal kitchen, and spacious indoor-outdoor living, a private villa like The Wina Villa 01 or Villa 02 is the definitive choice. Villas are particularly cost-effective and luxurious for families or groups traveling together.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Memilih Akomodasi Sesuai Kebutuhan Liburan Anda',
        paragraphs: [
          'Memilih antara guest house dan villa privat tergantung pada gaya liburan, jumlah rombongan, dan prioritas privasi Anda.',
          'The Wina Hospitality menyediakan kedua opsi berkualitas ini di kawasan strategis Canggu.'
        ],
      },
      {
        subheading: 'Kelebihan Menginap di Guest House',
        paragraphs: [
          'Sangat efisien untuk solo traveler atau pasangan yang aktif beraktivitas di luar. Biaya lebih hemat dengan fasilitas kamar nyaman, AC dingin, dan kolam renang bersama.'
        ],
      },
      {
        subheading: 'Kelebihan Memilih Villa Privat',
        paragraphs: [
          'Memberikan privasi 100% dengan kolam renang pribadi, dapur lengkap, dan ruang bersantai luas untuk momen intim bersama pasangan atau keluarga tercinta.'
        ],
      }
    ]
  },
  {
    id: 'post-5',
    slug: 'tips-choosing-comfortable-accommodation-bali',
    titleEn: 'Tips for Choosing Comfortable Accommodation in Bali (Without Surprises)',
    titleId: 'Tips Memilih Akomodasi Nyaman di Bali (Bebas Kecewa & Trik Cerdas)',
    metaDescEn: 'Essential checklist for booking comfortable accommodation in Bali. What to check regarding air conditioning, location noise, verified reviews, and WiFi.',
    metaDescId: 'Panduan cerdas memilih penginapan di Bali: cek kualitas AC, keheningan lokasi, kecepatan WiFi, ulasan terverifikasi, dan transparansi pemesanan.',
    categoryEn: 'Accommodation Tips',
    categoryId: 'Tips Memilih Akomodasi',
    readTime: '5 min read',
    publishDate: 'October 2026',
    coverImage: echoBeachImg,
    recommendedPropertyId: 'guest-house-3',
    contentEn: [
      {
        heading: 'Avoiding Common Pitfalls When Booking Stays in Bali',
        paragraphs: [
          'Bali has thousands of lodging options, ranging from rustic homestays to five-star resorts. However, wide variations in maintenance, air conditioning power, water pressure, and neighborhood noise can turn an eagerly anticipated holiday into frustration.',
          'Here is an essential checklist used by seasoned Bali travelers to ensure maximum comfort and peace of mind.'
        ],
      },
      {
        subheading: 'Key Comfort Factors to Inspect',
        paragraphs: [
          '1. Verify Specific Booking Channels: Ensure you book through reputable platforms like Booking.com with direct property confirmations and transparent cancellation conditions.',
          '2. Street Noise vs Accessibility: Check whether the property is situated directly on a congested thoroughfare or tucked safely into a quiet residential alley.',
          '3. Fiber WiFi Consistency: Always confirm that high-speed fiber internet is provided if you intend to do any work or streaming during your stay.',
          '4. Responsive Local Hosts: Properties managed with dedicated local teams guarantee rapid solutions if you ever need extra towels, scooter guidance, or laundry support.'
        ],
      }
    ],
    contentId: [
      {
        heading: 'Cara Cerdas Menemukan Penginapan Nyaman di Bali',
        paragraphs: [
          'Memastikan kualitas tidur dan kenyamanan selama liburan sangat dipengaruhi oleh kualitas penginapan yang Anda pilih.',
          'Periksa selalu ulasan terverifikasi di Booking.com, pastikan lokasi tidak bising dari klub malam, dan pastikan ketersediaan AC serta air hangat yang terawat baik.'
        ],
      }
    ]
  }
];
