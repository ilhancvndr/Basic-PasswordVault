/**
 * Uygulama Genelinde Paylaşılan Geçici Bellek Deposu.
 */
export let kasaKayitlariListesi = [
  { id: '1', platformIsmi: 'Kurumsal E-Posta', kullaniciKimligi: 'admin@kurum.com', kayitliSifre: 'Sifre123!', ikonTanimi: 'mail' },
  { id: '2', platformIsmi: 'GitHub Portalı', kullaniciKimligi: 'Gelistirici_Can', kayitliSifre: 'Git_Pass_99', ikonTanimi: 'logo-github' },
];

/**
 * Yeni Veri Kayıtlarının Merkezi Listeye Eklenmesini Gerçekleştir
 */
export const sistemeYeniKayitEkle = (yeniVeri: any) => {
  kasaKayitlariListesi = [yeniVeri, ...kasaKayitlariListesi];
};

/**
 * Belirli Bir Kaydı ID Üzerinden Bulup Listeden Kaldır
 */
export const sistemdenKayitSil = (kayitId: string) => {
  kasaKayitlariListesi = kasaKayitlariListesi.filter(kayit => kayit.id !== kayitId);
};
