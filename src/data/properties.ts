/**
 * ============================================================================
 * STRICT ASSET ISOLATION & LOCK DIRECTIVE:
 * ============================================================================
 * PERATURAN MUTLAK DARI PEMILIK (USER):
 * 1. [LOCKED / TERKUNCI PERMANEN] THE WINA ECHO BEACH GUEST HOUSE:
 *    - Seluruh foto (Slot 1, 2, 3, dan 4) serta data The Wina Echo Beach
 *      Guest House DIKUNCI (LOCKED).
 *    - DILARANG KERAS mengubah, mengganti, menghapus, atau memindahkan foto
 *      The Wina Echo Beach Guest House KECUALI ada perintah eksplisit langsung
 *      dari pengguna yang menyebut nama 'The Wina Echo Beach'.
 * 
 * 2. ATURAN ISOLASI FOTO LAINNYA:
 *    - Setiap properti memiliki slot mandiri dan terisolasi.
 *    - Mengedit properti lain (Wina Guest House 2, Wina Guest House 3,
 *      Villa 01, Villa 02) TIDAK BOLEH menyentuh The Wina Echo Beach sama sekali.
 * ============================================================================
 */

// --- [LOCKED - DO NOT MODIFY] The Wina Echo Beach Guest House (Slots 1-4) ---
import echoBeachPhoto1 from '@/src/assets/images/properties/echo-beach/photo-1.jpg';
import echoBeachPhoto2 from '@/src/assets/images/properties/echo-beach/photo-2.avif';
import echoBeachPhoto3 from '@/src/assets/images/properties/echo-beach/photo-3.avif';
import echoBeachPhoto4 from '@/src/assets/images/properties/echo-beach/photo-4.jpg';

// --- The Wina Guest House 2 (Independent Slots 1-4) ---
import gh2Photo1 from '@/src/assets/images/properties/guest-house-2/photo-1.jpg';
import gh2Photo2 from '@/src/assets/images/properties/guest-house-2/photo-2.jpg';
import gh2Photo3 from '@/src/assets/images/properties/guest-house-2/photo-3.jpg';
import gh2Photo4 from '@/src/assets/images/properties/guest-house-2/photo-4.png';

// --- The Wina Guest House 3 (Independent Slots 1-4) ---
import gh3Photo1 from '@/src/assets/images/properties/guest-house-3/photo-1.jpg';
import gh3Photo2 from '@/src/assets/images/properties/guest-house-3/photo-2.jpg';
import gh3Photo3 from '@/src/assets/images/properties/guest-house-3/photo-3.jpg';
import gh3Photo4 from '@/src/assets/images/properties/guest-house-3/photo-4.png';

// --- The Wina Villa 01 (Independent Slots 1-4) ---
import villa01Photo1 from '@/src/assets/images/properties/villa-01/photo-1.jpg';
import villa01Photo2 from '@/src/assets/images/properties/villa-01/photo-2.jpg';
import villa01Photo3 from '@/src/assets/images/properties/villa-01/photo-3.jpg';
import villa01Photo4 from '@/src/assets/images/properties/villa-01/photo-4.jpg';

// --- The Wina Villa 02 (Independent Slots 1-4) ---
import villa02Photo1 from '@/src/assets/images/properties/villa-02/photo-1.webp';
import villa02Photo2 from '@/src/assets/images/properties/villa-02/photo-2.webp';
import villa02Photo3 from '@/src/assets/images/properties/villa-02/photo-3.jpg';
import villa02Photo4 from '@/src/assets/images/properties/villa-02/photo-4.jpg';

export interface PropertyGalleryPhoto {
  src: string;
  titleEn: string;
  titleId: string;
  captionEn: string;
  captionId: string;
  category: 'bedroom' | 'terrace' | 'entrance' | 'bathroom' | 'family-room' | 'overview';
}

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
  photos?: PropertyGalleryPhoto[];
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
    taglineEn: 'Authentic Balinese guest house with carved wooden doors, private verandas, and AC rooms just 350m from Echo Beach.',
    taglineId: 'Guest house khas Bali dengan pintu kayu berukir, teras privat bersantai, dan kamar ber-AC hanya 350m dari Pantai Echo Beach.',
    descriptionEn: 'The Wina Echo Beach Guest House is a peaceful tropical haven tucked into a quiet alley on Jl. Pantai Batu Bolong, just 350 meters (a 4-minute walk) from Echo Beach and beachfront venues like La Brisa.\n\nFeaturing authentic Balinese architectural touches, including handcrafted carved wooden doors, private covered verandas with outdoor seating overlooking stone pathways and tropical greenery, and spotless tiled interiors. Guests can choose between comfortable air-conditioned Deluxe Double Rooms with crisp white linens and wardrobe storage, bright Superior Rooms with ample natural daylight, and a spacious Quadruple Room equipped with 4 individual single beds—ideal for surf crews, friends, or families.\n\nEvery room features an en-suite private bathroom with a walk-in hot shower, fast fiber-optic Wi-Fi, shared kitchen access, and daily room cleaning. Tucked away from traffic noise, it provides an authentic, serene island stay just steps from Canggu’s best waves (quiet boutique guest house, no swimming pool).',
    descriptionId: 'The Wina Echo Beach Guest House merupakan suaka tropis yang tenang di dalam gang privat Jl. Pantai Batu Bolong, hanya 350 meter (4 menit berjalan kaki) dari Pantai Echo Beach dan beach club populer seperti La Brisa.\n\nAkomodasi ini menampilkan keindahan arsitektur khas Bali dengan pintu kayu berukir artistik, teras berkanopi dengan kursi santai menghadap jalan setapak taman tropis, serta lantai keramik yang sejuk dan bersih. Tersedia pilihan Kamar Deluxe Double ber-AC dengan kasur empuk dan lemari pakaian, Kamar Superior dengan pencahayaan alami yang cerah, serta Kamar Quadruple luas dengan 4 kasur single terpisah yang sangat cocok untuk rombongan peselancar, sahabat, maupun keluarga.\n\nSetiap kamar memiliki kamar mandi dalam pribadi dengan shower air hangat, koneksi Wi-Fi fiber optik berkecepatan tinggi, akses dapur bersama, serta layanan kebersihan kamar harian. Nikmati kenyamanan istirahat yang hening tanpa bising jalan raya beberapa langkah dari ombak terbaik Canggu (penginapan butik yang tenang, tanpa kolam renang).',
    location: 'Jl. Pantai Batu Bolong No. 21, Canggu, Bali',
    neighborhood: 'Batu Bolong / Echo Beach, Canggu',
    distanceToBeach: '350m (4 min walk to Echo Beach)',
    heroImage: echoBeachPhoto1,
    gallery: [
      echoBeachPhoto1,
      echoBeachPhoto2,
      echoBeachPhoto3,
      echoBeachPhoto4,
    ],
    startingPriceIdr: 330000,
    priceNoteEn: 'Starting from Rp330,000/night. Confirmed directly via official Booking.com reservation.',
    priceNoteId: 'Mulai dari Rp330.000/malam. Konfirmasi langsung melalui reservasi resmi Booking.com.',
    otaName: 'Booking.com',
    otaStatus: 'verified',
    bookingUrl: 'https://www.booking.com/hotel/id/the-wina-echo-beach-guest-house.id.html',
    bookingUrlKey: 'bookingUrlEchoBeach',
    capacity: '2 - 4 Guests per room',
    roomTypesEn: [
      'Deluxe Double Room with Private Terrace',
      'Quadruple Room with 4 Single Beds (Surf & Family)',
      'Superior Double Room with Garden View',
    ],
    roomTypesId: [
      'Kamar Deluxe Double dengan Teras Pribadi',
      'Kamar Quadruple dengan 4 Kasur Single (Keluarga & Selancar)',
      'Kamar Superior Double Pemandangan Taman',
    ],
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
      'Walking distance (350m / 4 min) to Echo Beach and seaside venues like La Brisa',
      'Authentic Balinese carved wooden doors and shaded private verandas with garden seating',
      'Quadruple room option with 4 single beds ideal for surf crews & groups',
      'Ensuite bathrooms with hot water showers in every room',
      'Individual air conditioning and high-speed fiber Wi-Fi throughout',
      'Tucked inside a quiet residential alley away from main road traffic noise',
    ],
    highlightsId: [
      'Hanya 350 meter (4 menit jalan kaki) ke Pantai Echo Beach dan beach club La Brisa',
      'Pintu kayu berukir khas Bali dan teras santai berkanopi menghadap taman',
      'Pilihan Kamar Quadruple dengan 4 kasur single untuk rombongan peselancar & keluarga',
      'Kamar mandi dalam dengan shower air hangat di setiap kamar',
      'Pendingin udara (AC) di setiap kamar dan Wi-Fi fiber optik kencang',
      'Lokasi tenang di dalam gang privat, bebas dari bising knalpot jalan raya',
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
        questionEn: 'What room types are available at The Wina Echo Beach Guest House?',
        questionId: 'Apa saja tipe kamar yang tersedia di The Wina Echo Beach Guest House?',
        answerEn: 'We offer Deluxe Double Rooms with comfortable double beds and private terraces, Quadruple Rooms with 4 separate single beds (ideal for groups or surfers), and Superior Double Rooms with natural daylight, all featuring AC and private ensuite bathrooms.',
        answerId: 'Tersedia Kamar Deluxe Double dengan kasur double nyaman dan teras pribadi, Kamar Quadruple dengan 4 kasur single terpisah (cocok untuk peselancar atau keluarga), serta Kamar Superior Double dengan pencahayaan alami, seluruhnya dilengkapi AC dan kamar mandi dalam.',
      },
      {
        questionEn: 'How close is The Wina Echo Beach Guest House to the surf break?',
        questionId: 'Berapa jarak The Wina Echo Beach Guest House ke spot surfing?',
        answerEn: 'The property is approximately 350 meters from Echo Beach, which takes around 4 minutes by foot.',
        answerId: 'Akomodasi berjarak sekitar 350 meter dari Pantai Echo Beach, sekitar 4 menit berjalan kaki.',
      },
      {
        questionEn: 'Is there a swimming pool at The Wina Echo Beach Guest House?',
        questionId: 'Apakah ada kolam renang di The Wina Echo Beach Guest House?',
        answerEn: 'The Wina Echo Beach Guest House does not have a swimming pool, offering a quiet, intimate sanctuary away from crowds just steps from the beach waves. (For guests seeking a pool, our sister property The Wina Guest House 3 includes a swimming pool).',
        answerId: 'The Wina Echo Beach Guest House tidak memiliki kolam renang, menjadikannya pilihan suaka yang tenang, hening, dan privat dekat pantai. (Bagi tamu yang membutuhkan kolam renang, properti The Wina Guest House 3 kami menyediakan fasilitas kolam renang).',
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
    seoTitle: 'The Wina Echo Beach Guest House | Authentic Stay Near Echo Beach Canggu',
    seoDescription: 'Stay 350m from Echo Beach surf. Authentic Balinese carved doors, private verandas, AC deluxe double & 4-bed quadruple rooms, ensuite hot shower, fiber Wi-Fi.',
  },
  {
    id: 'guest-house-2',
    name: 'The Wina Guest House 2',
    shortName: 'Guest House 2',
    category: 'guesthouse',
    taglineEn: 'Tranquil garden retreat with AC queen rooms, private bathrooms, and sunny verandas near Nelayan Beach Canggu.',
    taglineId: 'Penginapan taman yang tenang dengan kamar queen ber-AC, kamar mandi dalam, dan teras santai dekat Pantai Nelayan Canggu.',
    descriptionEn: 'The Wina Guest House 2 is a tranquil boutique retreat situated on Jalan Nelayan in Subak Ambengan, Canggu, just an 800-meter stroll or 3-minute scooter ride from Nelayan Beach and minutes from vibrant Batu Bolong.\n\nFeaturing bright, air-conditioned guest bedrooms with comfortable queen and double beds, crisp white linens, natural daylight, practical workspace desks, and tiled flooring. Guests enjoy a lush tropical central garden courtyard filled with palms and green landscaping, covered outdoor verandas, and open-air balcony walkways overlooking the grounds.\n\nEach room includes a private en-suite bathroom with walk-in hot water shower and modern vanity, fast fiber-optic Wi-Fi, car and scooter parking inside the property gate, shared kitchen facilities, and daily room cleaning. Tucked into a quiet residential lane, it provides an idyllic, restorative haven for digital nomads, couples, and island travelers (quiet residential setting, no swimming pool).',
    descriptionId: 'The Wina Guest House 2 merupakan akomodasi butik yang tenang dan asri di Jalan Nelayan, Subak Ambengan, Canggu, berjarak hanya 800 meter (3 menit berkendara motor) dari Pantai Nelayan dan beberapa menit dari pusat kafe hits Batu Bolong.\n\nGuest house ini memiliki kamar-kamar tidur ber-AC yang nyaman dengan pilihan kasur queen dan double empuk, sprei putih bersih, pencahayaan alami yang melimpah, meja kerja, dan lantai keramik yang sejuk. Tamu dapat menikmati suasana asri halaman taman tropis tengah yang dipenuhi pohon palem rimbun, teras berkanopi santai, serta koridor balkon terbuka menghadap taman hijau.\n\nSetiap kamar dilengkapi kamar mandi dalam pribadi dengan shower air hangat dan cermin wastafel, koneksi Wi-Fi cepat, area parkir mobil dan motor yang aman, fasilitas dapur bersama, serta layanan kebersihan harian. Terletak di kawasan pemukiman yang damai, tempat ini menghadirkan suasana istirahat yang hening dan menyegarkan bagi para pelancong maupun digital nomad (penginapan taman yang tenang, tanpa kolam renang).',
    location: 'Jalan Nelayan, Subak Ambengan, Canggu, Bali 80361',
    neighborhood: 'Nelayan / Subak Ambengan, Canggu',
    distanceToBeach: '800m (3 min scooter ride to Nelayan Beach)',
    heroImage: gh2Photo1,
    gallery: [
      gh2Photo1,
      gh2Photo2,
      gh2Photo3,
      gh2Photo4,
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
    roomTypesEn: ['Deluxe Queen Room with Workspace Desk', 'Superior Double Room with Garden View', 'Standard Double Room'],
    roomTypesId: ['Kamar Deluxe Queen dengan Meja Kerja', 'Kamar Superior Double Pemandangan Taman', 'Kamar Standard Double Ber-AC'],
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
      'Walking or short scooter distance (800m / 3 min) to Nelayan Beach and Batu Bolong',
      'Bright AC queen bedrooms with clean linens and work desks',
      'Private en-suite bathrooms with hot water showers in every room',
      'Lush tropical central garden courtyard and covered outdoor veranda walkways',
      'Quiet residential location in Subak Ambengan away from main road traffic',
      'High-speed Wi-Fi, daily housekeeping, and secure scooter parking',
    ],
    highlightsId: [
      'Hanya 800 meter (3 menit berkendara motor) ke Pantai Nelayan dan kawasan Batu Bolong',
      'Kamar queen ber-AC cerah dengan sprei bersih & meja kerja',
      'Kamar mandi dalam pribadi dengan shower air hangat di setiap kamar',
      'Halaman taman tropis tengah yang asri dan koridor teras santai berkanopi',
      'Lokasi pemukiman tenang di Subak Ambengan, bebas bising jalan raya utama',
      'Wi-Fi cepat, layanan pembersihan harian, dan area parkir motor yang aman',
    ],
    googleMapsUrl: 'https://maps.google.com/?q=The+Wina+Guest+House+2,+Jalan+Nelayan,+Subak+Ambengan,+Canggu,+Bali 80361',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+Wina+Guest+House+2,+Jalan+Nelayan,+Subak+Ambengan,+Canggu,+Bali+80361',
    googleMapsEmbedQuery: 'Jalan Nelayan, Subak Ambengan, Canggu, Bali 80361',
    canonicalSlug: 'the-wina-guest-house-2',
    canonicalUrl: '/properties/the-wina-guest-house-2',
    targetKeywords: [
      'The Wina Guest House 2',
      'guest house near Nelayan Beach',
      'affordable guest house Canggu',
      'guest house in Canggu',
      'accommodation near Jalan Nelayan',
      'affordable stay Canggu',
    ],
    faqs: [
      {
        questionEn: 'What room types and facilities are available at The Wina Guest House 2?',
        questionId: 'Apa saja tipe kamar dan fasilitas yang tersedia di The Wina Guest House 2?',
        answerEn: 'Our property offers Deluxe Queen and Superior Double Bedrooms with private ensuite bathrooms, hot showers, air conditioning, fast Wi-Fi, tropical garden courtyard, and covered outdoor verandas.',
        answerId: 'Properti kami menawarkan Kamar Deluxe Queen dan Superior Double dengan kamar mandi dalam, shower air hangat, AC, Wi-Fi cepat, taman tropis, serta teras luar ruangan berkanopi.',
      },
      {
        questionEn: 'Is there a swimming pool at The Wina Guest House 2?',
        questionId: 'Apakah ada kolam renang di The Wina Guest House 2?',
        answerEn: 'The Wina Guest House 2 does not have a swimming pool, offering a quiet, intimate sanctuary and tranquil tropical garden courtyard away from crowds in Jalan Nelayan Canggu. (For guests seeking a pool, our sister property The Wina Guest House 3 includes a swimming pool).',
        answerId: 'The Wina Guest House 2 tidak memiliki kolam renang, menjadikannya pilihan penginapan taman yang tenang, hening, dan privat di Jalan Nelayan Canggu. (Bagi tamu yang membutuhkan kolam renang, properti The Wina Guest House 3 kami menyediakan fasilitas kolam renang).',
      },
      {
        questionEn: 'How far is The Wina Guest House 2 from the beach?',
        questionId: 'Berapa jarak The Wina Guest House 2 ke pantai?',
        answerEn: 'The property is approximately 800 meters from Nelayan Beach (about 3 minutes by scooter or a short stroll) and minutes to Batu Bolong beach and cafes.',
        answerId: 'Akomodasi berjarak sekitar 800 meter dari Pantai Nelayan (sekitar 3 menit naik motor atau jalan santai) dan sangat dekat ke Pantai Batu Bolong.',
      },
      {
        questionEn: 'Is on-site scooter parking available?',
        questionId: 'Apakah tersedia parkir motor di lokasi?',
        answerEn: 'Yes, we provide safe on-site motorbike parking inside the property premises.',
        answerId: 'Ya, kami menyediakan tempat parkir motor yang aman di dalam area properti.',
      },
      {
        questionEn: 'Is there fast Wi-Fi for remote work or digital nomads?',
        questionId: 'Apakah tersedia Wi-Fi kencang untuk kerja / WFH?',
        answerEn: 'Yes, reliable high-speed fiber internet is provided throughout all rooms and shared verandas.',
        answerId: 'Ya, koneksi internet Wi-Fi fiber optik berkecepatan tinggi tersedia di semua kamar dan area teras.',
      },
    ],
    seoTitle: 'The Wina Guest House 2 | Authentic Stay Near Nelayan Beach Canggu',
    seoDescription: 'Stay 800m from Nelayan Beach Canggu. AC queen rooms, private ensuite hot showers, lush tropical garden, verandas, fast Wi-Fi, no pool.',
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
    heroImage: gh3Photo1,
    gallery: [
      gh3Photo1,
      gh3Photo2,
      gh3Photo3,
      gh3Photo4,
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
    heroImage: villa01Photo1,
    gallery: [
      villa01Photo1,
      villa01Photo2,
      villa01Photo3,
      villa01Photo4,
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
    heroImage: villa02Photo1,
    gallery: [
      villa02Photo1,
      villa02Photo2,
      villa02Photo3,
      villa02Photo4,
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
