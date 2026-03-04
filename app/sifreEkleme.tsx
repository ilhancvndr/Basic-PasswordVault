import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { sistemeYeniKayitEkle } from './veriTransfer';

/**
 * Kullanıcı Bilgilerini Alarak Kasaya Kaydeden Form
 */
export default function SifreEklemeEkraniBileseni() {
  const uygulamaYonlendiricisi = useRouter();
  const [uygulamaBaslikVerisi, setUygulamaBaslikVerisi] = useState('');
  const [hesapKimlikVerisi, setHesapKimlikVerisi] = useState('');
  const [guvenliSifreVerisi, setGuvenliSifreVerisi] = useState('');

  const veriKayitIsleminiTamamla = () => {
    if (!uygulamaBaslikVerisi || !hesapKimlikVerisi || !guvenliSifreVerisi) {
      Alert.alert('Eksik Veri', 'Lütfen Tüm Alanları Doldurunuz.');
      return;
    }

    const yeniKayit = {
      id: Math.random().toString(),
      platformIsmi: uygulamaBaslikVerisi,
      kullaniciKimligi: hesapKimlikVerisi,
      kayitliSifre: guvenliSifreVerisi,
      ikonTanimi: 'shield-outline'
    };

    sistemeYeniKayitEkle(yeniKayit);
    Alert.alert('Başarılı', 'Kayıt Eklendi.', [
      { text: 'Tamam', onPress: () => uygulamaYonlendiricisi.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.anaSarmalayici}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.ustGezintiPaneli}>
          <TouchableOpacity
            onPress={() => uygulamaYonlendiricisi.back()}
            style={styles.geriDonusButonTasarimi}
          >
            <Ionicons name="chevron-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.sayfaBaslikMetni}>Yeni Veri Tanımlama</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.formIcerikAlani}>
          <Text style={styles.bilgilendirmeMetni}>
            Lütfen Tanımlamak İstediğiniz Hesabın Detaylarını Giriniz.
          </Text>

          <View style={styles.inputGrupKonteyner}>
            <Text style={styles.alanEtiketMetni}>Platform Bilgisi</Text>
            <View style={styles.inputGirisKutusu}>
              <Ionicons name="apps-outline" size={20} color="#666" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.temelGirisInputu}
                placeholder="Örn: Kurumsal Portal"
                placeholderTextColor="#555"
                onChangeText={setUygulamaBaslikVerisi}
              />
            </View>
          </View>

          <View style={styles.inputGrupKonteyner}>
            <Text style={styles.alanEtiketMetni}>Kullanıcı Kimliği</Text>
            <View style={styles.inputGirisKutusu}>
              <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.temelGirisInputu}
                placeholder="kullanici@alanadi.com"
                placeholderTextColor="#555"
                autoCapitalize="none"
                onChangeText={setHesapKimlikVerisi}
              />
            </View>
          </View>

          <View style={styles.inputGrupKonteyner}>
            <Text style={styles.alanEtiketMetni}>Erişim Şifresi</Text>
            <View style={styles.inputGirisKutusu}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.temelGirisInputu}
                placeholder="••••••••"
                placeholderTextColor="#555"
                secureTextEntry
                onChangeText={setGuvenliSifreVerisi}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.onayButonTasarimi}
            onPress={veriKayitIsleminiTamamla}
            activeOpacity={0.8}
          >
            <Text style={styles.onayButonMetni}>Veriyi Sisteme Kaydet</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  anaSarmalayici: { flex: 1, backgroundColor: '#0F111A' },
  ustGezintiPaneli: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60 },
  geriDonusButonTasarimi: { backgroundColor: '#161B2E', padding: 8, borderRadius: 12 },
  sayfaBaslikMetni: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  formIcerikAlani: { padding: 25 },
  bilgilendirmeMetni: { color: '#94A3B8', fontSize: 14, marginBottom: 30 },
  inputGrupKonteyner: { marginBottom: 20 },
  alanEtiketMetni: { color: '#E2E8F0', fontSize: 15, marginBottom: 8 },
  inputGirisKutusu: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#161B2E', borderRadius: 15, paddingHorizontal: 15, height: 55, borderWidth: 1, borderColor: '#232946' },
  temelGirisInputu: { flex: 1, color: '#FFF', fontSize: 16 },
  onayButonTasarimi: { backgroundColor: '#4F46E5', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  onayButonMetni: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
