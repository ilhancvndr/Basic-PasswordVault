import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
// Global Veri Transfer Katmanından Mevcut Kayıtlar Ve Silme Fonksiyonu Dahil Edilmiştir
import { kasaKayitlariListesi, sistemdenKayitSil } from './veriTransfer';

/**
 * Kullanıcı Verilerinin Merkezi Yönetimini Ve Uygulama Geliştirici İmzasını Barındıran Ana Bileşen
  */
export default function AnaYonetimPaneliBileseni() {
  const uygulamaYonlendiricisi = useRouter();
  
  // Arama Sorgusu Ve Ekran Üzerinde Gösterilecek Dinamik Liste İçin Durum Yönetimi
  const [aramaSorguMetni, setAramaSorguMetni] = useState('');
  const [guncelVeriListesi, setGuncelVeriListesi] = useState(kasaKayitlariListesi);

  /**
   * Sayfaya Her Odaklanıldığında (Geri Dönüldüğünde) Global Bellekteki Güncel Verileri Senkronize Eden Mekanizma
   * Bu Yapı, Yeni Eklenen Kayıtların Anlık Olarak Listeye Yansımasını Sağlar
   */
  useFocusEffect(
    React.useCallback(() => {
      // Bellek Adresi Değişikliğini Tetiklemek İçin Yeni Bir Dizi Kopyası Oluşturulur
      setGuncelVeriListesi([...kasaKayitlariListesi]);
    }, [])
  );

  /**
   * Güvenli Oturum Kapatma Protokolünü Çalıştırarak Kullanıcıyı Başlangıç Ekranına Yönlendirir
   * Güvenlik Gereği 'replace' Metodu Kullanılarak Navigasyon Geçmişi Temizlenir
   */
  const oturumKapatmaIsleminiBaslat = () => {
    Alert.alert(
      'Güvenli Oturum Kapatma',
      'Sistemden Çıkış Yapmak İstediğinize Emin Misiniz? Tüm Kriptografik Bağlantılar Sonlandırılacaktır.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Oturumu Kapat',
          style: 'destructive',
          onPress: () => uygulamaYonlendiricisi.replace('/')
        }
      ]
    );
  };

  /**
   * Seçilen Kaydı Onay Alarak Sistem Belleğinden Kaldırır
   */
  const kayitSilmeIsleminiGerceklestir = (kayitId: string, platformAdi: string) => {
    Alert.alert(
      'Kayıt Silme İşlemi',
      `${platformAdi} Platformuna Ait Erişim Bilgileri Kalıcı Olarak Silinecektir. Onaylıyor Musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Veriyi Sil',
          style: 'destructive',
          onPress: () => {
            // Global Depodan Silme İşlemi Ve Yerel Durum Güncellemesi
            sistemdenKayitSil(kayitId);
            setGuncelVeriListesi([...kasaKayitlariListesi]);
          }
        }
      ]
    );
  };

  // Kullanıcı Tarafından Girilen Metne Göre Platform İsimleri Üzerinde Dinamik Filtreleme Uygulanır
  const filtrelenmisKayitlar = guncelVeriListesi.filter(kayit =>
    kayit.platformIsmi.toLowerCase().includes(aramaSorguMetni.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.anaPanelKonteyner}>
      
      {/* Üst Bilgilendirme Ve Sistem Kontrol Alanı */}
      <View style={styles.ustHeaderSarmalayici}>
        <View>
          <Text style={styles.anaBaslikMetni}>Kasa Yönetimi</Text>
          <Text style={styles.guvenlikDurumMetni}>Kriptografik Koruma Katmanı Aktif</Text>
        </View>
        <TouchableOpacity
          style={styles.oturumKapatmaButonTasarimi}
          onPress={oturumKapatmaIsleminiBaslat}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF4B4B" />
        </TouchableOpacity>
      </View>

      {/* Veri Sorgulama Ve Arama Motoru Bölümü */}
      <View style={styles.aramaSahasiKonteyner}>
        <View style={styles.aramaCubuguCercevesi}>
          <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.aramaMetinGirisInputu}
            placeholder="Platform Veya Kullanıcı Bilgisi Ara..."
            placeholderTextColor="#555"
            onChangeText={setAramaSorguMetni}
          />
        </View>
      </View>

      {/* Yeni Veri Girişi Ve Tanımlama Paneli */}
      <View style={styles.eklemeBolumuSarmalayici}>
        <TouchableOpacity
          style={styles.vurguluEklemeButonTasarimi}
          activeOpacity={0.8}
          onPress={() => uygulamaYonlendiricisi.push('/sifreEkleme')}
        >
          <View style={styles.butonIcerikDizilimi}>
            <View style={styles.artiIkonuKutusu}>
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.eklemeBaslikMetni}>Yeni Veri Tanımla</Text>
              <Text style={styles.eklemeAltBilgiMetni}>Güvenli Veri Tabanına Yeni Kayıt Ekleyin</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Şifre Kayıtlarının Dinamik Olarak Listelendiği Alan */}
      <FlatList
        data={filtrelenmisKayitlar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listeBoslukDizilimi}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.veriKartiSarmalayici}>
            <View style={styles.kartSolIcerikGrubu}>
              <View style={styles.platformIkonSarmalayici}>
                <Ionicons name={item.ikonTanimi} size={22} color="#FFF" />
              </View>
              <View>
                <Text style={styles.kartPlatformIsmi}>{item.platformIsmi}</Text>
                <Text style={styles.kartKullaniciDetayi}>{item.kullaniciKimligi}</Text>
              </View>
            </View>
            
            {/* Seçili Kaydı Kaldırmak İçin Tetikleyici Buton */}
            <TouchableOpacity
              onPress={() => kayitSilmeIsleminiGerceklestir(item.id, item.platformIsmi)}
              style={styles.kartSilmeButonTasarimi}
            >
              <Ionicons name="trash-outline" size={20} color="#FF4B4B" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Geliştirici Ve Uygulama İmzası Alt Bilgi Alanı */}
      <View style={styles.gelistiriciAltBilgiSarmalayici}>
        <Text style={styles.gelistiriciMetni}>Developed By ilhancvndr</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Ana Ekran Yerleşimi Ve Arka Plan Rengi
  anaPanelKonteyner: {
    flex: 1,
    backgroundColor: '#0F111A'
  },
  // Üst Başlık Bölümü Yerleşimi
  ustHeaderSarmalayici: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15
  },
  anaBaslikMetni: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  guvenlikDurumMetni: { color: '#10B981', fontSize: 12, marginTop: 2 },
  oturumKapatmaButonTasarimi: { backgroundColor: '#1A1D2E', padding: 10, borderRadius: 12 },
  
  // Arama Motoru Giriş Alanı Tasarımı
  aramaSahasiKonteyner: { paddingHorizontal: 20, marginTop: 20 },
  aramaCubuguCercevesi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B2E',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#232946'
  },
  aramaMetinGirisInputu: { flex: 1, color: '#FFF', fontSize: 16 },
  
  // Vurgulu Yeni Kayıt Ekleme Butonu Tasarımı
  eklemeBolumuSarmalayici: { paddingHorizontal: 20, marginTop: 20 },
  vurguluEklemeButonTasarimi: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1B4B',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#312E81'
  },
  butonIcerikDizilimi: { flexDirection: 'row', alignItems: 'center' },
  artiIkonuKutusu: {
    backgroundColor: '#4F46E5',
    padding: 10,
    borderRadius: 15,
    marginRight: 15
  },
  eklemeBaslikMetni: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  eklemeAltBilgiMetni: { color: '#94A3B8', fontSize: 13, marginTop: 2 },
  
  // Liste Elemanları Ve Kart Tasarımları
  listeBoslukDizilimi: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 40 },
  veriKartiSarmalayici: {
    backgroundColor: '#161B2E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#232946'
  },
  kartSolIcerikGrubu: { flexDirection: 'row', alignItems: 'center' },
  platformIkonSarmalayici: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    marginRight: 15
  },
  kartPlatformIsmi: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  kartKullaniciDetayi: { color: '#94A3B8', fontSize: 13, marginTop: 2 },
  kartSilmeButonTasarimi: { padding: 8, backgroundColor: '#1C162E', borderRadius: 10 },
  
  // Alt Bilgi (Footer) İmzası Stilleri
  gelistiriciAltBilgiSarmalayici: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#1A1D2E',
    alignItems: 'center',
    backgroundColor: '#0F111A'
  },
  gelistiriciMetni: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase'
  }
});
