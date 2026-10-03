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
  otaName: 'Booking.com' | 'Trip.com' | 'Coming Soon';
  otaStatus: 'verified' | 'coming_soon';
  otaPropertyId?: string;
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
  googleDirectionsUrl: string;
  googleMapsEmbedQuery: string;
  canonicalSlug: string;
  canonicalUrl: string;
  targetKeywords: string[];
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
    descriptionEn: 'The Wina Echo Beach Guest House blends authentic Balinese warmth with contemporary minimalist aesthetics. Located in the heart of Canggu within easy walking distance to famous Echo Beach, our sanctuary offers serene bedrooms with premium bedding, quiet workstations, and high-speed fiber WiFi for modern travelers and digital nomads.',
    descriptionId: 'The Wina Echo Beach Guest House memadukan kehangatan khas Bali dengan estetika minimalis modern. Berlokasi strategis di pusat Canggu dekat dengan Pantai Echo Beach yang ikonik, akomodasi kami menyediakan kamar tidur tenang dengan kasur berkualitas tinggi, area kerja nyaman, dan internet cepat untuk wisatawan maupun digital nomad.',
    location: 'Jl. Pantai Batu Bolong No. 21, Canggu, Bali',
    neighborhood: 'Batu Bolong / Echo Beach, Canggu',
    distanceToBeach: '350m (4 min walk to Echo Beach)',
    heroImage: echoBeachImg,
    gallery: [
      echoBeachImg,
      heroImg,
      ambienceImg,
    ],
    startingPriceIdr: 330000,
    priceNoteEn: 'Starting from Rp330,000/night. Confirmed directly via official Booking.com reservation.',
    priceNoteId: 'Mulai dari Rp330.000/malam. Konfirmasi langsung melalui reservasi resmi Booking.com.',
    otaName: 'Booking.com',
    otaStatus: 'verified',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-echo-beach-guest-house.id.html',
    bookingUrlKey: 'bookingUrlEchoBeach',
    capacity: '2 Adults per room',
    roomTypesEn: ['Deluxe King Room with Balcony', 'Superior Double Room with Private Balcony', 'Standard Queen Room'],
    roomTypesId: ['Deluxe King Room dengan Balkon', 'Superior Double Room dengan Balkon Pribadi', 'Standard Queen Room'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Snowflake', nameEn: 'Air Conditioning', nameId: 'Pendingin Udara (AC)' },
      { icon: 'Droplets', nameEn: 'Hot Water', nameId: 'Air Hangat' },
      { icon: 'Wifi', nameEn: 'Strong Wi-Fi', nameId: 'Wi-Fi Kuat' },
      { icon: 'Car', nameEn: 'Car & Motorbike Parking', nameId: 'Parkir Mobil & Motor' },
      { icon: 'UtensilsCrossed', nameEn: 'Kitchen', nameId: 'Dapur' },
      { icon: 'Sparkles', nameEn: 'Room Cleaning Service', nameId: 'Layanan Pembersihan Kamar' },
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
    googleMapsUrl: 'https://maps.google.com/?q=The+Wina+Echo+Beach+Guest+House,+Jl.+Pantai+Batu+Bolong+No.+21,+Canggu,+Bali',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+Wina+Echo+Beach+Guest+House,+Jl.+Pantai+Batu+Bolong+No.+21,+Canggu,+Bali',
    googleMapsEmbedQuery: 'Jl. Pantai Batu Bolong No. 21, Canggu, Bali',
    canonicalSlug: 'the-wina-echo-beach-guest-house',
    canonicalUrl: '/properties/the-wina-echo-beach-guest-house',
    targetKeywords: [
      'The Wina Echo Beach Guest House',
      'guest house near Echo Beach',
      'guest house Canggu',
      'affordable guest house Canggu',
      'accommodation near Batu Bolong',
    ],
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
    seoTitle: 'The Wina Echo Beach Guest House | Stay in Canggu, Bali',
    seoDescription: 'Stay comfortably in Canggu, Bali at The Wina Echo Beach Guest House near Echo Beach & Batu Bolong. Verified amenities: AC, hot water, strong Wi-Fi, kitchen, parking, and daily room cleaning.',
  },
  {
    id: 'guest-house-2',
    name: 'The Wina Guest House 2',
    shortName: 'Guest House 2',
    category: 'guesthouse',
    taglineEn: 'Calm, minimalist retreat near vibrant Batu Bolong and Canggu’s best artisanal cafes.',
    taglineId: 'Suasana tenang dan minimalis dekat pusat kuliner dan kafe hits Batu Bolong Canggu.',
    descriptionEn: 'The Wina Guest House 2 is tailored for travelers seeking peaceful relaxation close to the energetic social heart of Canggu. Featuring bright rooms with natural daylight, en-suite modern bathrooms, comfortable shared spaces, and easy scooter access to both Batu Bolong and Echo Beach.',
    descriptionId: 'The Wina Guest House 2 dirancang khusus untuk Anda yang mendambakan kenyamanan dan ketenangan di dekat pusat keramaian Canggu. Memiliki kamar terang dengan pencahayaan alami, kamar mandi pribadi modern, suasana hunian asri, serta akses cepat ke Jalan Pantai Batu Bolong.',
    location: 'Jalan Nelayan, Subak Ambengan, Canggu, Bali 80361',
    neighborhood: 'Nelayan / Subak Ambengan, Canggu',
    distanceToBeach: '800m (3 min scooter ride to Nelayan Beach)',
    heroImage: heroImg,
    gallery: [
      heroImg,
      echoBeachImg,
      ambienceImg,
    ],
    startingPriceIdr: 250000,
    priceNoteEn: 'Starting from Rp250,000/night. Confirmed directly via official Booking.com reservation (Property ID: 2037301).',
    priceNoteId: 'Mulai dari Rp250.000/malam. Konfirmasi langsung melalui reservasi resmi Booking.com (Property ID: 2037301).',
    otaName: 'Booking.com',
    otaStatus: 'verified',
    otaPropertyId: '2037301',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-guest-house-2.id.html',
    bookingUrlKey: 'bookingUrlGuestHouse2',
    capacity: '2 Adults per room',
    roomTypesEn: ['Superior Double Room with Garden View', 'Deluxe Queen Room', 'Standard Double Room'],
    roomTypesId: ['Superior Double Room dengan Pemandangan Taman', 'Deluxe Queen Room', 'Standard Double Room'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Snowflake', nameEn: 'Air Conditioning', nameId: 'Pendingin Udara (AC)' },
      { icon: 'Droplets', nameEn: 'Hot Water', nameId: 'Air Hangat' },
      { icon: 'Wifi', nameEn: 'Strong Wi-Fi', nameId: 'Wi-Fi Kuat' },
      { icon: 'Car', nameEn: 'Car & Motorbike Parking', nameId: 'Parkir Mobil & Motor' },
      { icon: 'UtensilsCrossed', nameEn: 'Kitchen', nameId: 'Dapur' },
      { icon: 'Sparkles', nameEn: 'Room Cleaning Service', nameId: 'Layanan Pembersihan Kamar' },
    ],
    highlightsEn: [
      'Strategic position between Batu Bolong and Nelayan Beach',
      'Intimate property with limited rooms for guaranteed privacy',
      'Sunny terrace area with comfortable outdoor seating',
      'Steps away from popular bakeries, pilates studios, and boutique eateries',
    ],
    highlightsId: [
      'Posisi strategis antara Batu Bolong dan Pantai Nelayan',
      'Jumlah kamar terjaga sehingga suasana tetap tenang dan privat',
      'Area teras santai terbuka yang asri dengan tempat duduk nyaman',
      'Dekat dengan kafe roti, studio pilates, dan restoran hits',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=The+Wina+Guest+House+2,+Jalan+Nelayan,+Subak+Ambengan,+Canggu,+Bali+80361',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+Wina+Guest+House+2,+Jalan+Nelayan,+Subak+Ambengan,+Canggu,+Bali+80361',
    googleMapsEmbedQuery: 'Jalan Nelayan, Subak Ambengan, Canggu, Bali 80361',
    canonicalSlug: 'the-wina-guest-house-2',
    canonicalUrl: '/properties/the-wina-guest-house-2',
    targetKeywords: [
      'The Wina Guest House 2',
      'affordable guest house Canggu',
      'guest house in Canggu',
      'accommodation near Jalan Nelayan',
      'affordable stay Canggu',
    ],
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
    seoTitle: 'The Wina Guest House 2 | Affordable Accommodation in Canggu',
    seoDescription: 'Discover an affordable stay in Canggu, Bali at The Wina Guest House 2 near Jalan Nelayan. Verified amenities: AC, hot water, strong Wi-Fi, kitchen, parking, and room cleaning.',
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
    location: 'Jl. Pantai Batu Bolong No. 20 D, Canggu, Bali',
    neighborhood: 'Batu Bolong, Canggu',
    distanceToBeach: '800m (3 min scooter ride to Batu Bolong Beach)',
    heroImage: ambienceImg,
    gallery: [
      ambienceImg,
      echoBeachImg,
      heroImg,
      villaPoolImg,
    ],
    startingPriceIdr: 400000,
    priceNoteEn: 'Starting from Rp400,000/night. Confirmed directly via official Booking.com reservation.',
    priceNoteId: 'Mulai dari Rp400.000/malam. Konfirmasi langsung melalui reservasi resmi Booking.com.',
    otaName: 'Booking.com',
    otaStatus: 'verified',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-guest-house-3.id.html',
    bookingUrlKey: 'bookingUrlGuestHouse3',
    capacity: '2 Adults per room',
    roomTypesEn: ['Deluxe Queen Room', 'Standard Double Room with Pool Access', 'Economy Cozy Double'],
    roomTypesId: ['Deluxe Queen Room', 'Standard Double Room dengan Akses Kolam', 'Economy Cozy Double'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Waves', nameEn: 'Swimming Pool', nameId: 'Kolam Renang' },
      { icon: 'Snowflake', nameEn: 'Air Conditioning', nameId: 'Pendingin Udara (AC)' },
      { icon: 'Droplets', nameEn: 'Hot Water', nameId: 'Air Hangat' },
      { icon: 'Wifi', nameEn: 'Strong Wi-Fi', nameId: 'Wi-Fi Kuat' },
      { icon: 'Car', nameEn: 'Car & Motorbike Parking', nameId: 'Parkir Mobil & Motor' },
      { icon: 'UtensilsCrossed', nameEn: 'Kitchen', nameId: 'Dapur' },
      { icon: 'Sparkles', nameEn: 'Room Cleaning Service', nameId: 'Layanan Pembersihan Kamar' },
    ],
    highlightsEn: [
      'Central outdoor swimming pool nestled in tranquil tropical greenery',
      'Great value for solo travelers, couples, and longer stay visitors',
      'Quiet residential ambiance ensuring peaceful, uninterrupted sleep',
      'Central spot with shortcuts to both Berawa and Pererenan',
    ],
    highlightsId: [
      'Kolam renang outdoor asri di tengah taman tropis yang tenang',
      'Pilihan bernilai tinggi untuk solo traveler, pasangan, dan tamu long-stay',
      'Suasana pemukiman tenang untuk tidur nyenyak tanpa gangguan bising',
      'Lokasi strategis dengan jalan pintas mudah ke Berawa dan Pererenan',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=The+Wina+Guest+House+3,+Jl.+Pantai+Batu+Bolong+No.+20+D,+Canggu,+Bali',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+Wina+Guest+House+3,+Jl.+Pantai+Batu+Bolong+No.+20+D,+Canggu,+Bali',
    googleMapsEmbedQuery: 'Jl. Pantai Batu Bolong No. 20 D, Canggu, Bali',
    canonicalSlug: 'the-wina-guest-house-3',
    canonicalUrl: '/properties/the-wina-guest-house-3',
    targetKeywords: [
      'The Wina Guest House 3',
      'guest house Canggu with swimming pool',
      'guest house near Batu Bolong',
      'affordable accommodation Canggu',
      'Canggu guest house with pool',
    ],
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
    seoTitle: 'The Wina Guest House 3 | Canggu Guest House with Swimming Pool',
    seoDescription: 'Enjoy a relaxing stay in Canggu, Bali at The Wina Guest House 3 near Batu Bolong featuring swimming pool, air conditioning, hot water, strong Wi-Fi, kitchen, and parking.',
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
    location: 'Jl. Pantai Batu Bolong, Jl. Subak Canggu, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
    neighborhood: 'Subak Canggu / Batu Bolong, Canggu',
    distanceToBeach: '1.2km (4 min scooter ride to Batu Bolong Beach)',
    heroImage: villaPoolImg,
    gallery: [
      villaPoolImg,
      heroImg,
      echoBeachImg,
      ambienceImg,
    ],
    startingPriceIdr: 1635000,
    priceNoteEn: 'Starting from Rp1,635,000/night for entire private villa. Confirmed directly via official Trip.com reservation (Hotel ID: 120788345).',
    priceNoteId: 'Mulai dari Rp1.635.000/malam untuk seluruh villa privat. Konfirmasi langsung melalui reservasi resmi Trip.com (Hotel ID: 120788345).',
    otaName: 'Trip.com',
    otaStatus: 'verified',
    otaPropertyId: '120788345',
    bookingUrl: 'https://id.trip.com/hotels/bali-hotel-detail-120788345/the-wina-villa-01/',
    bookingUrlKey: 'bookingUrlVilla01',
    capacity: '2 - 4 Guests (Private Villa)',
    roomTypesEn: ['Entire 1-Bedroom Private Pool Villa', 'Entire 2-Bedroom Luxury Pool Villa'],
    roomTypesId: ['Entire 1-Bedroom Private Pool Villa', 'Entire 2-Bedroom Luxury Pool Villa'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Waves', nameEn: 'Swimming Pool', nameId: 'Kolam Renang' },
    ],
    highlightsEn: [
      '100% private pool and sun terrace with total privacy wall',
      'Designer Balinese contemporary architecture with natural teak and stone',
      'Quiet luxury pocket minutes from trendy Pererenan and Canggu dining',
      'Dedicated personal assistance for seamless island vacations',
    ],
    highlightsId: [
      '100% kolam renang privat tanpa gangguan pemandangan luar',
      'Arsitektur kontemporer Bali dengan sentuhan kayu jati dan batu alam',
      'Lokasi eksklusif hanya beberapa menit dari restoran populer Pererenan',
      'Bantuan staf ramah untuk kenyamanan liburan pulau impian Anda',
    ],
    googleMapsUrl: 'https://maps.google.com/maps?ftid=0x2dd2392f4ed733a9:0x955e807a79847b4e',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jl.+Pantai+Batu+Bolong,+Jl.+Subak+Canggu,+Canggu,+Kec.+Kuta+Utara,+Kabupaten+Badung,+Bali+80361',
    googleMapsEmbedQuery: 'Jl. Pantai Batu Bolong, Jl. Subak Canggu, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
    canonicalSlug: 'the-wina-villa-01',
    canonicalUrl: '/properties/the-wina-villa-01',
    targetKeywords: [
      'The Wina Villa 01',
      'villa Canggu Bali',
      'villa near Batu Bolong',
      'Canggu villa with swimming pool',
      'Bali villa accommodation',
    ],
    faqs: [
      {
        questionEn: 'Is the swimming pool completely private?',
        questionId: 'Apakah kolam renangnya benar-benar privat?',
        answerEn: 'Yes, the swimming pool and sun terrace in The Wina Villa 01 are 100% exclusive to your booking.',
        answerId: 'Ya, kolam renang dan teras di The Wina Villa 01 100% khusus untuk tamu yang menginap.',
      },
      {
        questionEn: 'Can we book extra services like airport transfers?',
        questionId: 'Apakah bisa memesan layanan tambahan seperti antar jemput?',
        answerEn: 'Yes, our team can arrange airport transfers and local island tours via WhatsApp.',
        answerId: 'Ya, tim kami siap membantu antar jemput bandara dan tur wisata lokal via WhatsApp.',
      },
    ],
    seoTitle: 'The Wina Villa 01 | Canggu Villa with Swimming Pool Bali',
    seoDescription: 'Experience luxury private villa living in Canggu, Bali at The Wina Villa 01 near Batu Bolong with exclusive private swimming pool.',
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
    location: 'Jl. Pantai Batu Bolong, Jl. Subak Canggu, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
    neighborhood: 'Subak Canggu / Batu Bolong, Canggu',
    distanceToBeach: '1.2km (4 min scooter ride to Batu Bolong Beach)',
    heroImage: villaPoolImg,
    gallery: [
      villaPoolImg,
      ambienceImg,
      heroImg,
      echoBeachImg,
    ],
    startingPriceIdr: 1635000,
    priceNoteEn: 'Starting from Rp1,635,000/night for entire private villa. Online OTA listing coming soon. Direct inquiries available via WhatsApp.',
    priceNoteId: 'Mulai dari Rp1.635.000/malam untuk seluruh villa privat. Pemesanan online OTA segera hadir. Reservasi langsung dapat melalui WhatsApp.',
    otaName: 'Coming Soon',
    otaStatus: 'coming_soon',
    bookingUrl: '',
    bookingUrlKey: 'bookingUrlVilla02',
    capacity: '4 - 6 Guests (Private Villa)',
    roomTypesEn: ['Entire 2-Bedroom Luxury Pool Villa', 'Entire 3-Bedroom Executive Pool Villa'],
    roomTypesId: ['Entire 2-Bedroom Luxury Pool Villa', 'Entire 3-Bedroom Executive Pool Villa'],
    checkIn: '14:00 - 22:00 WITA',
    checkOut: '12:00 WITA',
    amenities: [
      { icon: 'Waves', nameEn: 'Swimming Pool', nameId: 'Kolam Renang' },
    ],
    highlightsEn: [
      'Generous living and swimming pool areas ideal for families or small groups',
      'Peaceful oasis tucked away from Canggu street congestion',
      'Spacious outdoor lounge and sun terrace',
      'Dedicated personal contact for activities and island concierge services',
    ],
    highlightsId: [
      'Area bersantai dan kolam renang lapang, cocok untuk keluarga atau rombongan',
      'Suasana tenang terlindung dari keramaian jalan utama Canggu',
      'Teras santai luar ruangan yang lapang dan asri',
      'Kontak khusus untuk pemesanan aktivitas dan layanan concierge',
    ],
    googleMapsUrl: 'https://maps.google.com/maps?ftid=0x2dd2392f4ed733a9:0x955e807a79847b4e',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jl.+Pantai+Batu+Bolong,+Jl.+Subak+Canggu,+Canggu,+Kec.+Kuta+Utara,+Kabupaten+Badung,+Bali+80361',
    googleMapsEmbedQuery: 'Jl. Pantai Batu Bolong, Jl. Subak Canggu, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
    canonicalSlug: 'the-wina-villa-02',
    canonicalUrl: '/properties/the-wina-villa-02',
    targetKeywords: [
      'The Wina Villa 02',
      'villa in Canggu Bali',
      'Canggu villa with swimming pool',
      'villa near Batu Bolong',
      'Bali villa accommodation',
    ],
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
    seoTitle: 'The Wina Villa 02 | Villa in Canggu Bali with Swimming Pool',
    seoDescription: 'Discover modern tropical villa comfort in Canggu, Bali at The Wina Villa 02 near Batu Bolong featuring private swimming pool.',
  },
];
