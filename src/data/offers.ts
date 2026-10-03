export interface SpecialOffer {
  id: string;
  badgeEn: string;
  badgeId: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  termsEn: string;
  termsId: string;
  actionEn: string;
  actionId: string;
  propertyTargetId?: string;
}

export const specialOffers: SpecialOffer[] = [
  {
    id: 'offer-nomad',
    badgeEn: 'Extended Stay Advantage',
    badgeId: 'Promo Menginap Panjang',
    titleEn: 'Canggu Digital Nomad & Weekly Stay Package',
    titleId: 'Paket Menginap Mingguan & Digital Nomad Canggu',
    descriptionEn: 'Planning to stay in Canggu for 7 days or more? Inquire directly via our WhatsApp concierge for tailored long-term rates, complimentary weekly linen refreshes, and dedicated fiber work desk access.',
    descriptionId: 'Berencana tinggal di Canggu selama 7 hari atau lebih? Hubungi concierge WhatsApp kami untuk penawaran khusus masa inap panjang, pembersihan sprei rutin, dan fasilitas kerja nyaman.',
    termsEn: 'Valid for stays of 7+ consecutive nights across guest houses. Subject to seasonal availability.',
    termsId: 'Berlaku untuk masa menginap minimal 7 malam berturut-turut. Tergantung ketersediaan kamar.',
    actionEn: 'Inquire via WhatsApp',
    actionId: 'Tanya via WhatsApp',
  },
  {
    id: 'offer-villa-honeymoon',
    badgeEn: 'Romantic Getaway',
    badgeId: 'Paket Pasangan & Bulan Madu',
    titleEn: 'Private Villa Sanctuary Experience',
    titleId: 'Pengalaman Eksklusif Villa Privat & Bulan Madu',
    descriptionEn: 'Reserve 3 or more nights at The Wina Villa 01 or Villa 02 and receive complimentary airport arrival transfer assistance and fresh tropical fruit welcome basket.',
    descriptionId: 'Pesan 3 malam atau lebih di The Wina Villa 01 atau Villa 02 dan dapatkan bantuan penjemputan bandara serta keranjang buah segar saat tiba.',
    termsEn: 'Valid for The Wina Villa 01 and 02 only. Inquire with check-in dates via WhatsApp.',
    termsId: 'Khusus untuk The Wina Villa 01 dan 02. Silakan konfirmasi tanggal melalui WhatsApp.',
    actionEn: 'Check Villa Dates',
    actionId: 'Cek Tanggal Villa',
    propertyTargetId: 'villa-01',
  },
  {
    id: 'offer-direct-concierge',
    badgeEn: 'Guest Privilege',
    badgeId: 'Layanan Istimewa',
    titleEn: 'Complimentary Local Concierge & Scooter Assistance',
    titleId: 'Bantuan Concierge Lokal & Sewa Sepeda Motor',
    descriptionEn: 'All guests staying with The Wina Hospitality receive direct access to our local management team for trusted scooter delivery directly to your property and airport transfer bookings at fair local rates.',
    descriptionId: 'Seluruh tamu The Wina Hospitality mendapatkan akses langsung ke tim lokal kami untuk pengantaran motor sewaan langsung ke properti serta antar-jemput bandara dengan tarif lokal yang wajar.',
    termsEn: 'Available for all verified guests across all 5 properties.',
    termsId: 'Tersedia untuk seluruh tamu di kelima properti The Wina.',
    actionEn: 'Contact Team',
    actionId: 'Hubungi Tim',
  }
];
