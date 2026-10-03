export interface FAQItem {
  id: string;
  categoryEn: string;
  categoryId: string;
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
}

export const generalFaqs: FAQItem[] = [
  {
    id: 'faq-1',
    categoryEn: 'Booking & Reservations',
    categoryId: 'Pemesanan & Reservasi',
    questionEn: 'How do I book a stay at The Wina Hospitality properties?',
    questionId: 'Bagaimana cara memesan kamar di The Wina Hospitality?',
    answerEn: 'Each of our 5 properties has a dedicated, verified listing on Booking.com. Simply click the "Book on Booking.com" button on any property page to view real-time availability and complete your reservation. You may also contact our WhatsApp concierge for custom inquiries or extended stays.',
    answerId: 'Setiap properti dari 5 properti kami memiliki tautan resmi tersendiri di Booking.com. Klik tombol "Pesan di Booking.com" pada halaman properti untuk melihat ketersediaan kamar dan melakukan pemesanan. Anda juga dapat menghubungi WhatsApp concierge kami untuk pertanyaan khusus atau menginap jangka panjang.',
  },
  {
    id: 'faq-2',
    categoryEn: 'Arrival & Check-in',
    categoryId: 'Kedatangan & Check-in',
    questionEn: 'What are the check-in and check-out times?',
    questionId: 'Berapa jam check-in dan check-out?',
    answerEn: 'Standard check-in begins at 14:00 WITA and check-out is by 12:00 WITA. If you require early check-in or late check-out, please let our team know in advance via WhatsApp and we will accommodate based on room availability.',
    answerId: 'Waktu check-in standar mulai pukul 14:00 WITA dan check-out maksimal pukul 12:00 WITA. Jika memerlukan check-in lebih awal atau check-out lebih lambat, silakan beri tahu kami sebelumnya via WhatsApp untuk disesuaikan dengan ketersediaan kamar.',
  },
  {
    id: 'faq-3',
    categoryEn: 'Transport & Scooters',
    categoryId: 'Transportasi & Motor',
    questionEn: 'Can you arrange airport transfers and scooter rentals?',
    questionId: 'Apakah bisa membantu penjemputan bandara dan rental motor?',
    answerEn: 'Yes! We can arrange a reliable driver to meet you at Ngurah Rai International Airport (DPS) holding a sign with your name. We also coordinate clean, well-maintained scooter rentals delivered directly to your guest house or villa upon arrival.',
    answerId: 'Ya! Kami dapat mengatur sopir terpercaya untuk menjemput Anda di Bandara Ngurah Rai (DPS) dengan papan nama. Kami juga membantu penyewaan motor yang siap pakai dan diantar langsung ke properti saat Anda tiba.',
  },
  {
    id: 'faq-4',
    categoryEn: 'Internet & Work',
    categoryId: 'Internet & Kerja',
    questionEn: 'Is the WiFi fast enough for remote work and video meetings?',
    questionId: 'Apakah koneksi WiFi cukup cepat untuk bekerja jarak jauh?',
    answerEn: 'All The Wina properties are equipped with high-speed fiber-optic internet. Wi-Fi speeds are regularly verified to ensure seamless Zoom video calls, streaming, and large file transfers for remote workers.',
    answerId: 'Seluruh properti The Wina dilengkapi koneksi internet fiber optik cepat. Kecepatan internet diuji secara berkala untuk kenyamanan video call Zoom, streaming, dan pengiriman file kerja.',
  },
  {
    id: 'faq-5',
    categoryEn: 'Housekeeping & Facilities',
    categoryId: 'Kebersihan & Fasilitas',
    questionEn: 'Is daily housekeeping provided?',
    questionId: 'Apakah tersedia layanan pembersihan harian?',
    answerEn: 'Yes, daily housekeeping, fresh bath towels, and regular linen changes are provided to maintain highest hygiene standards throughout your stay.',
    answerId: 'Ya, pembersihan harian, handuk mandi bersih, dan penggantian sprei secara berkala disediakan untuk menjaga kebersihan dan kenyamanan Anda.',
  }
];
