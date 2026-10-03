import heroImg from '@/src/assets/images/hero_bali_resort_1791004276796.jpg';
import echoBeachImg from '@/src/assets/images/wina_echo_beach_room_1791004290768.jpg';
import villaPoolImg from '@/src/assets/images/wina_villa_pool_1791004304004.jpg';
import ambienceImg from '@/src/assets/images/bali_canggu_ambience_1791004314788.jpg';

export interface Property {
  id: string;
  name: string;
  shortName: string;
  category: 'guesthouse' | 'villa';
  taglineEn: string;
  taglineId: string;
  descriptionEn: string;
  descriptionId: string;
  location: string;
  neighborhood: string;
  distanceToBeach: string;
  heroImage: string;
  gallery: string[];
  startingPriceIdr: number;
  priceNoteEn: string;
  priceNoteId: string;
  bookingUrl: string;
  bookingUrlKey: 'bookingUrlEchoBeach' | 'bookingUrlGuestHouse2' | 'bookingUrlGuestHouse3' | 'bookingUrlVilla01' | 'bookingUrlVilla02';
  capacity: string;
  roomTypesEn: string[];
  roomTypesId: string[];
  checkIn: string;
  checkOut: string;
  amenities: {
    icon: string;
    nameEn: string;
    nameId: string;
  }[];
  highlightsEn: string[];
  highlightsId: string[];
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  faqs: {
    questionEn: string;
    questionId: string;
    answerEn: string;
    answerId: string;
  }[];
  seoTitle: string;
  seoDescription: string;
}

export const initialProperties: Property[] = [
  {
    id: 'echo-beach',
    name: 'The Wina Echo Beach Guest House',
    shortName: 'Echo Beach Guest House',
    category: 'guesthouse',
    taglineEn: 'Boutique coastal comfort just steps from Canggu’s premier surf and sunset break.',
    taglineId: 'Kenyamanan pesisir butik hanya beberapa langkah dari pantai selancar dan matahari terbenam Canggu.',
    descriptionEn: 'The Wina Echo Beach Guest House blends authentic Balinese warmth with contemporary minimalist aesthetics. Located in the heart of Canggu within easy walking distance to famous Echo Beach, our sanctuary offers serene bedrooms with premium bedding, tropical pool access, quiet workstations, and high-speed fiber WiFi for modern travelers and digital nomads.',
    descriptionId: 'The Wina Echo Beach Guest House memadukan kehangatan khas Bali dengan estetika minimalis modern. Berlokasi strategis di pusat Canggu dekat dengan Pantai Echo Beach yang ikonik, akomodasi kami menyediakan kamar tidur tenang dengan kasur berkualitas tinggi, akses kolam renang tropis, area kerja nyaman, dan internet cepat untuk wisatawan maupun digital nomad.',
    location: 'Jl. Pura Batu Mejan, Echo Beach, Canggu, Bali 80351',
    neighborhood: 'Echo Beach, Canggu',
    distanceToBeach: '350m (4 min walk to Echo Beach)',
    heroImage: echoBeachImg,
    gallery: [
      echoBeachImg,
      heroImg,
      ambienceImg,
      villaPoolImg,
    ],
    startingPriceIdr: 450000,
    priceNoteEn: 'Starting rate per night. Live rates and seasonal availability are confirmed directly on Booking.com.',
    priceNoteId: 'Estimasi harga mulai per malam. Tarif terkini dan ketersediaan langsung dikonfirmasi di Booking.com.',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-echo-beach-guest-house.html',
    bookingUrlKey: 'bookingUrlEchoBeach',
    capacity: '2 Adults per room',
    roomTypesEn: ['Deluxe King Room with Pool View', 'Superior Double Room with Private Balcony', 'Standard Queen Room'],
    roomTypesId: ['Deluxe King Room dengan Pemandangan Kolam', 'Superior Double Room dengan Balkon Pribadi', 'Standard Queen Room'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Wifi', nameEn: 'High-Speed Fiber WiFi', nameId: 'WiFi Fiber Berkecepatan Tinggi' },
      { icon: 'AirVent', nameEn: 'Individual Air Conditioning', nameId: 'Pendingin Udara (AC) Mandiri' },
      { icon: 'Waves', nameEn: 'Tropical Swimming Pool', nameId: 'Kolam Renang Tropis' },
      { icon: 'Bath', nameEn: 'En-suite Bathroom with Hot Shower', nameId: 'Kamar Mandi Dalam dengan Air Hangat' },
      { icon: 'Sparkles', nameEn: 'Daily Housekeeping', nameId: 'Layanan Kebersihan Harian' },
      { icon: 'ShieldCheck', nameEn: 'Secure Entry & Safe Neighborhood', nameId: 'Akses Aman & Lingkungan Nyaman' },
      { icon: 'Coffee', nameEn: 'Shared Kitchenette & Water Refill', nameId: 'Dapur Bersama & Isi Ulang Air Minum' },
      { icon: 'Bike', nameEn: 'Scooter Parking Area', nameId: 'Area Parkir Motor Aman' },
    ],
    highlightsEn: [
      'Walking distance to Echo Beach and seaside cafes like La Brisa',
      'Quiet alley setting away from main road traffic noise',
      'Dedicated workspace desk and high-speed Wi-Fi in every room',
      'Friendly local Balinese host assistance on-site',
    ],
    highlightsId: [
      'Jalan kaki mudah ke Pantai Echo Beach dan beach club populer seperti La Brisa',
      'Lokasi tenang di dalam gang, jauh dari kebisingan jalan raya',
      'Meja kerja khusus dan internet kencang di setiap kamar',
      'Pelayanan staf lokal Bali yang ramah dan siap membantu',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=Echo+Beach+Canggu+Bali',
    googleMapsEmbedQuery: 'Echo Beach Canggu Bali',
    faqs: [
      {
        questionEn: 'How close is The Wina Echo Beach Guest House to the surf break?',
        questionId: 'Berapa jarak The Wina Echo Beach Guest House ke spot surfing?',
        answerEn: 'The property is approximately 350 meters from Echo Beach, which takes around 4 minutes by foot.',
        answerId: 'Akomodasi berjarak sekitar 350 meter dari Pantai Echo Beach, sekitar 4 menit berjalan kaki.',
      },
      {
        questionEn: 'Can I rent a scooter or arrange airport pickup?',
        questionId: 'Apakah bisa menyewa motor atau memesan antar jemput bandara?',
        answerEn: 'Yes, our team can assist with trusted scooter rental and airport transfer bookings via our official WhatsApp concierge.',
        answerId: 'Ya, staf kami siap membantu penyewaan motor terpercaya serta penjemputan bandara melalui WhatsApp resmi kami.',
      },
      {
        questionEn: 'Is there high-speed internet for remote work?',
        questionId: 'Apakah tersedia internet cepat untuk kerja jarak jauh / WFH?',
        answerEn: 'Yes, we provide dedicated fiber optic WiFi tested for seamless video calls, uploads, and streaming.',
        answerId: 'Ya, kami menyediakan koneksi internet fiber optik cepat yang stabil untuk video call maupun streaming.',
      },
    ],
    seoTitle: 'The Wina Echo Beach Guest House | Accommodation near Echo Beach Canggu',
    seoDescription: 'Book your stay at The Wina Echo Beach Guest House in Canggu, Bali. Enjoy comfortable boutique rooms, swimming pool, and easy walk to Echo Beach surf.',
  },
  {
    id: 'guest-house-2',
    name: 'The Wina Guest House 2',
    shortName: 'Guest House 2',
    category: 'guesthouse',
    taglineEn: 'Calm, minimalist retreat near vibrant Batu Bolong and Canggu’s best artisanal cafes.',
    taglineId: 'Suasana tenang dan minimalis dekat pusat kuliner dan kafe hits Batu Bolong Canggu.',
    descriptionEn: 'The Wina Guest House 2 is tailored for travelers seeking peaceful relaxation close to the energetic social heart of Canggu. Featuring bright rooms with natural daylight, en-suite modern bathrooms, shared tropical swimming pool, and easy scooter access to both Batu Bolong and Echo Beach.',
    descriptionId: 'The Wina Guest House 2 dirancang khusus untuk Anda yang mendambakan kenyamanan dan ketenangan di dekat pusat keramaian Canggu. Memiliki kamar terang dengan pencahayaan alami, kamar mandi pribadi modern, kolam renang bersama yang asri, serta akses cepat ke Jalan Pantai Batu Bolong.',
    location: 'Jl. Nelayan / Batu Bolong area, Canggu, Bali 80351',
    neighborhood: 'Batu Bolong / Nelayan, Canggu',
    distanceToBeach: '800m (3 min scooter ride to Nelayan Beach)',
    heroImage: heroImg,
    gallery: [
      heroImg,
      echoBeachImg,
      ambienceImg,
      villaPoolImg,
    ],
    startingPriceIdr: 420000,
    priceNoteEn: 'Starting rate per night. Live rates and seasonal availability are confirmed directly on Booking.com.',
    priceNoteId: 'Estimasi harga mulai per malam. Tarif terkini dan ketersediaan langsung dikonfirmasi di Booking.com.',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-guest-house-2.html',
    bookingUrlKey: 'bookingUrlGuestHouse2',
    capacity: '2 Adults per room',
    roomTypesEn: ['Superior Double Room with Garden View', 'Deluxe Queen Room', 'Standard Double Room'],
    roomTypesId: ['Superior Double Room dengan Pemandangan Taman', 'Deluxe Queen Room', 'Standard Double Room'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Wifi', nameEn: 'High-Speed Fiber WiFi', nameId: 'WiFi Fiber Berkecepatan Tinggi' },
      { icon: 'AirVent', nameEn: 'Split Air Conditioning', nameId: 'Pendingin Ruangan (AC)' },
      { icon: 'Waves', nameEn: 'Outdoor Swimming Pool', nameId: 'Kolam Renang Luar Ruangan' },
      { icon: 'Bath', nameEn: 'Modern Hot Water Shower', nameId: 'Shower Air Hangat Modern' },
      { icon: 'Sparkles', nameEn: 'Daily Refresh & Housekeeping', nameId: 'Pembersihan Kamar Harian' },
      { icon: 'ShieldCheck', nameEn: 'CCTV & Keycard/Key Access', nameId: 'Keamanan CCTV & Akses Kunci Aman' },
      { icon: 'Bike', nameEn: 'Gated Scooter Parking', nameId: 'Area Parkir Motor Berpagar' },
      { icon: 'Refrigerator', nameEn: 'Communal Refrigerator & Pantry', nameId: 'Kulkas & Pantry Bersama' },
    ],
    highlightsEn: [
      'Strategic position between Batu Bolong and Nelayan Beach',
      'Intimate property with limited rooms for guaranteed privacy',
      'Sunny pool deck with comfortable sun loungers',
      'Steps away from popular bakeries, pilates studios, and boutique eateries',
    ],
    highlightsId: [
      'Posisi strategis antara Batu Bolong dan Pantai Nelayan',
      'Jumlah kamar terjaga sehingga suasana tetap tenang dan privat',
      'Area berjemur pinggir kolam dengan sun lounger nyaman',
      'Dekat dengan kafe roti, studio pilates, dan restoran hits',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=Batu+Bolong+Canggu+Bali',
    googleMapsEmbedQuery: 'Batu Bolong Canggu Bali',
    faqs: [
      {
        questionEn: 'Is parking available at The Wina Guest House 2?',
        questionId: 'Apakah tersedia parkir di The Wina Guest House 2?',
        answerEn: 'Yes, we provide secure on-site scooter parking inside the property gate.',
        answerId: 'Ya, tersedia tempat parkir sepeda motor yang aman di dalam gerbang properti.',
      },
      {
        questionEn: 'What are the check-in times?',
        questionId: 'Kapan waktu check-in dan check-out?',
        answerEn: 'Standard check-in begins at 14:00 WITA and check-out is by 12:00 WITA.',
        answerId: 'Waktu check-in mulai pukul 14:00 WITA dan check-out paling lambat pukul 12:00 WITA.',
      },
    ],
    seoTitle: 'The Wina Guest House 2 | Peaceful Stay in Batu Bolong Canggu Bali',
    seoDescription: 'Experience quiet comfort at The Wina Guest House 2 in Canggu. Modern rooms with swimming pool, fast WiFi, and walking access to top cafes and shops.',
  },
  {
    id: 'guest-house-3',
    name: 'The Wina Guest House 3',
    shortName: 'Guest House 3',
    category: 'guesthouse',
    taglineEn: 'Tranquil sanctuary in Canggu designed for restful holidays and long-stay travelers.',
    taglineId: 'Tempat istirahat nyaman di Canggu yang cocok untuk liburan santai maupun masa tinggal lebih lama.',
    descriptionEn: 'The Wina Guest House 3 offers a peaceful retreat nestled in a tranquil Canggu neighborhood. Providing airy air-conditioned rooms, clean private bathrooms with fresh hot showers, lush greenery around the swimming pool, and direct access to Canggu’s vibrant lifestyle while preserving a peaceful night’s sleep.',
    descriptionId: 'The Wina Guest House 3 menyuguhkan tempat peristirahatan damai di kawasan Canggu yang asri. Dilengkapi dengan kamar sejuk ber-AC, kamar mandi pribadi bersih dengan air hangat, taman tropis di sekitar kolam renang, dan akses mudah menuju berbagai spot menarik di Canggu.',
    location: 'Jl. Padang Linjong / Canggu, Badung, Bali 80351',
    neighborhood: 'Padang Linjong, Canggu',
    distanceToBeach: '1.2km (4 min scooter ride to Echo Beach)',
    heroImage: ambienceImg,
    gallery: [
      ambienceImg,
      echoBeachImg,
      heroImg,
      villaPoolImg,
    ],
    startingPriceIdr: 400000,
    priceNoteEn: 'Starting rate per night. Live rates and seasonal availability are confirmed directly on Booking.com.',
    priceNoteId: 'Estimasi harga mulai per malam. Tarif terkini dan ketersediaan langsung dikonfirmasi di Booking.com.',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-guest-house-3.html',
    bookingUrlKey: 'bookingUrlGuestHouse3',
    capacity: '2 Adults per room',
    roomTypesEn: ['Deluxe Queen Room', 'Standard Double Room with Pool Access', 'Economy Cozy Double'],
    roomTypesId: ['Deluxe Queen Room', 'Standard Double Room dengan Akses Kolam', 'Economy Cozy Double'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Wifi', nameEn: 'Reliable High-Speed Internet', nameId: 'Internet Cepat & Andal' },
      { icon: 'AirVent', nameEn: 'Air Conditioning', nameId: 'Pendingin Ruangan (AC)' },
      { icon: 'Waves', nameEn: 'Swimming Pool & Sun Deck', nameId: 'Kolam Renang & Area Berjemur' },
      { icon: 'Bath', nameEn: 'Private En-Suite Bathroom', nameId: 'Kamar Mandi Pribadi' },
      { icon: 'Sparkles', nameEn: 'Regular Housekeeping & Fresh Linens', nameId: 'Pembersihan Rutin & Sprei Bersih' },
      { icon: 'ShieldCheck', nameEn: 'Secure Property Environment', nameId: 'Lingkungan Akomodasi Aman' },
      { icon: 'Coffee', nameEn: 'Complimentary Drinking Water Refill', nameId: 'Gratis Refill Air Minum' },
      { icon: 'Bike', nameEn: 'Dedicated Scooter Parking', nameId: 'Parkir Motor Khusus Tamu' },
    ],
    highlightsEn: [
      'Great value for solo travelers, couples, and longer stay visitors',
      'Quiet residential ambiance ensuring peaceful, uninterrupted sleep',
      'Central spot with shortcuts to both Berawa and Pererenan',
      'Warm family-style Balinese hospitality and local tips',
    ],
    highlightsId: [
      'Pilihan bernilai tinggi untuk solo traveler, pasangan, dan tamu long-stay',
      'Suasana pemukiman tenang untuk tidur nyenyak tanpa gangguan bising',
      'Lokasi strategis dengan jalan pintas mudah ke Berawa dan Pererenan',
      'Keramahan khas keluarga Bali dengan rekomendasi wisata lokal',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=Padang+Linjong+Canggu+Bali',
    googleMapsEmbedQuery: 'Padang Linjong Canggu Bali',
    faqs: [
      {
        questionEn: 'Do you offer monthly or weekly rates?',
        questionId: 'Apakah menerima sewa mingguan atau bulanan?',
        answerEn: 'Yes! For weekly and monthly long stays, please contact our team via WhatsApp for personalized availability and package options.',
        answerId: 'Ya! Untuk sewa mingguan atau bulanan, silakan hubungi tim kami via WhatsApp untuk penawaran khusus.',
      },
      {
        questionEn: 'How can I contact management directly?',
        questionId: 'Bagaimana cara menghubungi pengelola secara langsung?',
        answerEn: 'You can email thewinaguesthouse3@gmail.com or message our official WhatsApp concierge.',
        answerId: 'Anda dapat mengirim email ke thewinaguesthouse3@gmail.com atau chat WhatsApp concierge resmi kami.',
      },
    ],
    seoTitle: 'The Wina Guest House 3 | Affordable Comfortable Accommodation in Canggu Bali',
    seoDescription: 'Discover comfortable, affordable rooms at The Wina Guest House 3 in Canggu. Enjoy pool access, fast WiFi, and quiet tropical comfort in Bali.',
  },
  {
    id: 'villa-01',
    name: 'The Wina Villa 01',
    shortName: 'Villa 01',
    category: 'villa',
    taglineEn: 'Exclusive private pool villa offering understated luxury, tropical open living, and total seclusion.',
    taglineId: 'Villa privat eksklusif dengan kolam renang pribadi, ruang tamu terbuka, dan privasi maksimal.',
    descriptionEn: 'The Wina Villa 01 delivers an elevated private villa experience in Canggu. Boasting a sparkling private swimming pool, open-concept tropical living pavilion, fully equipped kitchen, lavish master bedroom with en-suite semi-outdoor bathtub, and manicured tropical gardens. Perfect for couples seeking romance or travelers desiring a private island sanctuary.',
    descriptionId: 'The Wina Villa 01 menghadirkan pengalaman menginap villa privat premium di Canggu. Dilengkapi kolam renang pribadi jernih, ruang santai konsep terbuka khas tropis, dapur lengkap, kamar tidur utama mewah dengan kamar mandi semi-terbuka dan bathtub, serta taman asri yang privat.',
    location: 'Jl. Pantai Pererenan / Canggu border, Bali 80351',
    neighborhood: 'Pererenan / Canggu',
    distanceToBeach: '1.0km (3 min scooter ride to Pererenan Beach)',
    heroImage: villaPoolImg,
    gallery: [
      villaPoolImg,
      heroImg,
      echoBeachImg,
      ambienceImg,
    ],
    startingPriceIdr: 1650000,
    priceNoteEn: 'Starting rate per night for entire private villa. Live rates and seasonal availability are confirmed directly on Booking.com.',
    priceNoteId: 'Estimasi harga mulai per malam untuk seluruh villa privat. Tarif terkini dan ketersediaan langsung dikonfirmasi di Booking.com.',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-villa-01.html',
    bookingUrlKey: 'bookingUrlVilla01',
    capacity: '2 - 4 Guests (Private Villa)',
    roomTypesEn: ['Entire 1-Bedroom Private Pool Villa', 'Entire 2-Bedroom Luxury Pool Villa'],
    roomTypesId: ['Entire 1-Bedroom Private Pool Villa', 'Entire 2-Bedroom Luxury Pool Villa'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Waves', nameEn: 'Exclusive Private Swimming Pool', nameId: 'Kolam Renang Pribadi Eksklusif' },
      { icon: 'Wifi', nameEn: 'High-Speed Dedicated WiFi', nameId: 'WiFi Privat Kecepatan Tinggi' },
      { icon: 'UtensilsCrossed', nameEn: 'Equipped Modern Kitchen', nameId: 'Dapur Modern Lengkap' },
      { icon: 'Bath', nameEn: 'Luxury Semi-Outdoor Bath & Rain Shower', nameId: 'Bathtub Mewah Semi-Outdoor & Rain Shower' },
      { icon: 'AirVent', nameEn: 'Enclosed Air-Conditioned Bedrooms', nameId: 'Kamar Tidur Ber-AC Sejuk' },
      { icon: 'Sparkles', nameEn: 'Private Butler & Daily Housekeeping', nameId: 'Layanan Kebersihan & Asisten Villa' },
      { icon: 'Tv', nameEn: 'Smart TV with Streaming Apps', nameId: 'Smart TV dengan Akses Streaming' },
      { icon: 'Car', nameEn: 'Private Gated Parking (Car & Scooter)', nameId: 'Parkir Privat Mobil & Motor' },
    ],
    highlightsEn: [
      '100% private pool and sun terrace with total privacy wall',
      'Designer Balinese contemporary architecture with natural teak and stone',
      'Full kitchen with stove, refrigerator, blender, and dining ware',
      'Quiet luxury pocket minutes from trendy Pererenan and Canggu dining',
    ],
    highlightsId: [
      '100% kolam renang privat tanpa gangguan pemandangan luar',
      'Arsitektur kontemporer Bali dengan sentuhan kayu jati dan batu alam',
      'Dapur lengkap dengan kompor, kulkas, peralatan masak dan makan',
      'Lokasi eksklusif hanya beberapa menit dari restoran populer Pererenan',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=Pererenan+Canggu+Bali',
    googleMapsEmbedQuery: 'Pererenan Canggu Bali',
    faqs: [
      {
        questionEn: 'Is the swimming pool completely private?',
        questionId: 'Apakah kolam renangnya benar-benar privat?',
        answerEn: 'Yes, the pool, terrace, and living spaces in The Wina Villa 01 are 100% exclusive to your booking.',
        answerId: 'Ya, kolam renang, teras, dan seluruh area villa 100% khusus untuk tamu yang menginap.',
      },
      {
        questionEn: 'Can we cook our own meals?',
        questionId: 'Apakah kami bisa memasak makanan sendiri di villa?',
        answerEn: 'Yes, the villa includes a fully equipped kitchen with gas stovetop, refrigerator, cookware, and tableware.',
        answerId: 'Ya, villa dilengkapi dapur dengan kompor, kulkas, peralatan masak dan piring makan lengkap.',
      },
    ],
    seoTitle: 'The Wina Villa 01 | Luxury Private Pool Villa in Canggu Bali',
    seoDescription: 'Book The Wina Villa 01 in Canggu / Pererenan Bali. Exclusive private pool villa with tropical living pavilion, luxury bathtub, and complete privacy.',
  },
  {
    id: 'villa-02',
    name: 'The Wina Villa 02',
    shortName: 'Villa 02',
    category: 'villa',
    taglineEn: 'Spacious modern tropical villa with private plunge pool, lush courtyard, and refined comfort.',
    taglineId: 'Villa tropis modern yang luas dengan kolam renang privat, taman hijau, dan kenyamanan berkelas.',
    descriptionEn: 'The Wina Villa 02 is an exquisite tropical haven designed for small families, friends, or honeymooners desiring spacious elegance. Enclosed with high perimeter walls for absolute privacy, it features a crystal-clear private pool, shaded outdoor lounge, sun decks, stylish en-suite bedrooms, and dedicated concierge support.',
    descriptionId: 'The Wina Villa 02 merupakan surga tropis menawan yang dirancang untuk keluarga kecil, rombongan sahabat, maupun pasangan bulan madu yang menginginkan villa luas dan elegan. Memiliki dinding pembatas privat, kolam renang jernih, ruang santai teduh, kamar tidur bergaya modern dengan kamar mandi dalam, serta dukungan concierge ramah.',
    location: 'Jl. Kayu Tulang / Canggu, Badung, Bali 80351',
    neighborhood: 'Kayu Tulang, Canggu',
    distanceToBeach: '1.5km (5 min scooter ride to Batu Bolong Beach)',
    heroImage: villaPoolImg,
    gallery: [
      villaPoolImg,
      ambienceImg,
      heroImg,
      echoBeachImg,
    ],
    startingPriceIdr: 1850000,
    priceNoteEn: 'Starting rate per night for entire private villa. Live rates and seasonal availability are confirmed directly on Booking.com.',
    priceNoteId: 'Estimasi harga mulai per malam untuk seluruh villa privat. Tarif terkini dan ketersediaan langsung dikonfirmasi di Booking.com.',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-villa-02.html',
    bookingUrlKey: 'bookingUrlVilla02',
    capacity: '4 - 6 Guests (Private Villa)',
    roomTypesEn: ['Entire 2-Bedroom Luxury Pool Villa', 'Entire 3-Bedroom Executive Pool Villa'],
    roomTypesId: ['Entire 2-Bedroom Luxury Pool Villa', 'Entire 3-Bedroom Executive Pool Villa'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Waves', nameEn: 'Private Plunge Pool & Sun Deck', nameId: 'Kolam Renang Privat & Teras Jemur' },
      { icon: 'Wifi', nameEn: 'Ultra-Fast Mesh WiFi', nameId: 'WiFi Mesh Super Cepat' },
      { icon: 'UtensilsCrossed', nameEn: 'Chef-Style Open Kitchen', nameId: 'Dapur Terbuka Lengkap' },
      { icon: 'Bath', nameEn: 'Spacious Bathrooms with Rain Showers', nameId: 'Kamar Mandi Luas dengan Rain Shower' },
      { icon: 'AirVent', nameEn: 'Climate-Controlled Bedrooms', nameId: 'Pendingin Ruangan (AC) di Setiap Kamar' },
      { icon: 'Sparkles', nameEn: 'Daily Professional Housekeeping', nameId: 'Pembersihan Villa Profesional Harian' },
      { icon: 'ShieldCheck', nameEn: 'Private Gated Compound', nameId: 'Kompleks Villa Berpagar Aman' },
      { icon: 'Car', nameEn: 'Car & Scooter Parking Space', nameId: 'Area Parkir Mobil & Motor' },
    ],
    highlightsEn: [
      'Generous living and pool areas ideal for families or small groups',
      'Peaceful oasis tucked away from Canggu street congestion',
      'Fully equipped modern kitchen and dining table for shared meals',
      'Dedicated personal contact for activities, massages, and chef services',
    ],
    highlightsId: [
      'Area bersantai dan kolam renang lapang, cocok untuk keluarga atau rombongan',
      'Suasana tenang terlindung dari keramaian jalan utama Canggu',
      'Dapur modern lengkap serta meja makan luas untuk makan bersama',
      'Kontak khusus untuk pemesanan aktivitas, spa panggilan, dan katering',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=Canggu+Bali',
    googleMapsEmbedQuery: 'Canggu Bali',
    faqs: [
      {
        questionEn: 'How many bedrooms does The Wina Villa 02 have?',
        questionId: 'Berapa kamar tidur yang ada di The Wina Villa 02?',
        answerEn: 'The Wina Villa 02 can accommodate up to 4-6 guests with its private multi-bedroom configuration.',
        answerId: 'The Wina Villa 02 dapat menampung hingga 4-6 tamu dengan konfigurasi multi-kamar tidur privat.',
      },
      {
        questionEn: 'Can we book extra services like airport transfers or floating breakfast?',
        questionId: 'Apakah bisa memesan layanan tambahan seperti antar jemput atau floating breakfast?',
        answerEn: 'Yes! Contact our WhatsApp concierge in advance to arrange airport transfers, scooter drop-off, or floating breakfast trays.',
        answerId: 'Tentu! Hubungi WhatsApp concierge kami sebelumnya untuk mengatur penjemputan bandara, sewa motor, atau floating breakfast.',
      },
    ],
    seoTitle: 'The Wina Villa 02 | Premium Tropical Villa with Private Pool Canggu Bali',
    seoDescription: 'Book The Wina Villa 02 in Canggu Bali. Experience high-end tropical relaxation with private pool, spacious living area, and tranquil Balinese ambiance.',
  },
];
