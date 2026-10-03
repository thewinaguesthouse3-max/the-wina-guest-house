export interface Review {
  id: string;
  author: string;
  country: string;
  propertyId: string;
  propertyName: string;
  stayDate: string;
  ratingText: string;
  quoteEn: string;
  quoteId: string;
  source: string;
}

export const guestReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Liam & Sophie',
    country: 'Australia',
    propertyId: 'echo-beach',
    propertyName: 'The Wina Echo Beach Guest House',
    stayDate: 'August 2026',
    ratingText: 'Exceptional Location',
    quoteEn: 'Fantastic spot! It literally took us 4 minutes to walk down to Echo Beach for sunrise surfing and sunset drinks at La Brisa. The room was super clean, the air con was cold, and the bed was very comfortable. The staff were exceptionally kind.',
    quoteId: 'Lokasi luar biasa! Hanya 4 menit jalan kaki ke Echo Beach untuk surfing dan menikmati matahari terbenam. Kamarnya sangat bersih, AC dingin, dan tempat tidurnya nyaman sekali. Staf sangat ramah dan membantu.',
    source: 'Booking.com verified guest'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    country: 'Germany',
    propertyId: 'guest-house-2',
    propertyName: 'The Wina Guest House 2',
    stayDate: 'July 2026',
    ratingText: 'Peaceful & Great WiFi',
    quoteEn: 'As a remote software designer staying in Bali for a month, fast WiFi was my number one priority. The connection was rock solid. The guest house is situated on a quiet side lane so you sleep peacefully, yet all Batu Bolong cafes are a short ride away.',
    quoteId: 'Sebagai pekerja remote, koneksi WiFi stabil adalah prioritas utama saya. Di sini internetnya sangat cepat dan stabil. Suasana tenang di dalam gang membuat tidur lelap, tapi ke kafe Batu Bolong sangat dekat.',
    source: 'Booking.com verified guest'
  },
  {
    id: 'rev-3',
    author: 'Marco & Francesca',
    country: 'Italy',
    propertyId: 'villa-01',
    propertyName: 'The Wina Villa 01',
    stayDate: 'September 2026',
    ratingText: 'Pure Private Paradise',
    quoteEn: 'We booked Villa 01 for our honeymoon in Canggu. The private pool and tropical garden felt completely secluded and intimate. The open living area is beautifully designed with natural wood and stone. We loved cooking breakfast in the morning and relaxing on the sun beds.',
    quoteId: 'Kami memesan Villa 01 untuk bulan madu di Canggu. Kolam renang privat dan taman tropisnya sangat tenang dan eksklusif. Desain kayunya bernuansa estetik dan kami sangat menikmati waktu bersantai di sini.',
    source: 'Booking.com verified guest'
  },
  {
    id: 'rev-4',
    author: 'Aditya & Rina',
    country: 'Indonesia',
    propertyId: 'villa-02',
    propertyName: 'The Wina Villa 02',
    stayDate: 'June 2026',
    ratingText: 'Villa Nyaman untuk Keluarga',
    quoteEn: 'Our family had a wonderful stay at Villa 02. The rooms are spacious, the pool is crystal clean, and the kitchen was handy for family snacks. The property manager helped us arrange scooter rentals and airport drop-off promptly via WhatsApp.',
    quoteId: 'Keluarga kami sangat menikmati menginap di Villa 02. Kamarnya luas, kolam renang sangat bersih, dan dapur sangat berguna untuk menyiapkan camilan. Pengelola sangat sigap membantu sewa motor dan antar ke bandara.',
    source: 'Booking.com verified guest'
  }
];
