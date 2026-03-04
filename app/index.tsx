import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * Uygulamanın Giriş Katmanını Yöneten Ana Login
 */
export default function GiriisEkraniBileseni() {
  // Master Password Girişini Takip Eden Durum Değişkeni
  const [anaErisimSifresi, setAnaErisimSifresi] = useState('');
  const uygulamaYonlendiricisi = useRouter();

  /**
   * Girilen Şifrenin Doğruluğunu Kontrol
   */
  const erisimYetkisiniDenetle = () => {
    // Şifre Doğrulaması
    if (anaErisimSifresi === '123456') {
      // Erişim Başarılı
      uygulamaYonlendiricisi.replace('/home');
    } else {
      // Erişim Reddedildi:
      Alert.alert(
        'Erişim Engellendi',
        'Girilen Şifre Hatalıdır. Lütfen Bilgilerinizi Kontrol Ederek Tekrar Deneyiniz.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.anaEkranKonteyner}
    >
      <View style={styles.girisKartTasarimi}>
        {/* Güvenlik Sembolü: Kalkan İkonu */}
        <View style={styles.guvenlikIkonSarmalayici}>
          <Ionicons name="shield-checkmark" size={50} color="#FFFFFF" />
        </View>
        
        <Text style={styles.anaBaslikYazisi}>PasswordVault</Text>
        <Text style={styles.altBilgiYazisi}>Uçtan Uca Şifreli Erişim Paneli</Text>

        {/* Master Password Giriş Sahası */}
        <View style={styles.inputGirisSarmalayici}>
          <Ionicons name="lock-closed" size={20} color="#666" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.metinGirisInputu}
            placeholder="Master Password"
            placeholderTextColor="#555"
            secureTextEntry // Karakterlerin Gizli Formatlanması
            onChangeText={setAnaErisimSifresi}
          />
        </View>

        {/* Kasayı Aç Butonu */}
        <TouchableOpacity
          style={styles.erisimOnayButonu}
          onPress={erisimYetkisiniDenetle}
          activeOpacity={0.8}
        >
          <Text style={styles.butonMetni}>Kasayı Aç</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Ana Arka Plan Ve Yerleşim Düzeni
  anaEkranKonteyner: {
    flex: 1,
    backgroundColor: '#0F111A',
    justifyContent: 'center',
    padding: 25
  },
  // Merkezi Giriş Kartı Tasarımı
  girisKartTasarimi: {
    backgroundColor: '#161B2E',
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: '#232946',
    elevation: 5 // Android İçin Gölge Derinliği
  },
  // Kalkan İkonu Kaplayıcı Stili
  guvenlikIkonSarmalayici: {
    alignSelf: 'center',
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20
  },
  anaBaslikYazisi: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  altBilgiYazisi: {
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 14
  },
  // Şifre Giriş Alanı Tasarımı
  inputGirisSarmalayici: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#334155'
  },
  metinGirisInputu: {
    flex: 1,
    color: '#FFF'
  },
  // Onay Butonu Tasarımı
  erisimOnayButonu: {
    backgroundColor: '#1E1B4B',
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  butonMetni: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
