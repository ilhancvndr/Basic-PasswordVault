# 🛡️ PasswordVault

**PasswordVault**, modern arayüz tasarımı ile inşa edilmiş, kullanıcı dostu ve uçtan uca güvenli bir **Şifre Yönetim (Kasa)** uygulamasıdır. React Native ve Expo altyapısı kullanılarak geliştirilmiş olup, çapraz platform (iOS & Android) desteklemektedir. 

---

## Özellikler

- **Güvenli Giriş Paneli**: Uygulamaya erişim, "Master Password" (ana şifre) koruması ile sağlanmaktadır.
- **Merkezi Şifre Yönetimi**: Platform, kullanıcı adı ve şifre gibi hassas verilerinizi tek bir çatı altında güvenle toplar.
- **Dinamik Arama Motoru**: Kasa içerisinde yer alan platform ismi ve kullanıcı bilgilerine göre anlık arama ve filtreleme yapabilirsiniz.
- **Kolay Kayıt Ekleme**: Basit ve sade arayüzü sayesinde yeni platform bilgilerinizi hızlıca kasaya dahil edebilirsiniz.
- **Güvenli Silme İşlemi**: Artık kullanmadığınız kayıtları tek dokunuşla ve onay mekanizması eşliğinde kalıcı olarak silebilirsiniz.
- **Güvenli Oturum Kapatma**: Oturum kapatıldığında tüm navigasyon geçmişi temizlenerek güvenli çıkış sağlanır.
- **Modern Karanlık Tema (Dark Mode)**: Göz yormayan, kontrast oranları ayarlanmış şık tasarım.

---

## Teknolojiler ve Altyapı

Proje aşağıdaki modern teknolojiler kullanılarak geliştirilmiştir:

- **Çatı (Framework):** React Native (v0.81), Expo (v54)
- **Yönlendirme (Routing):** Expo Router (v6)
- **Kullanıcı Arayüzü:** React Native bileşenleri ve özel stil tanımlamaları
- **İkonlar:** `@expo/vector-icons` (Ionicons)
- **Veri Yönetimi:** Global durum yönetimi için özel geliştirilmiş veri transfer katmanı (`veriTransfer.ts`)

---

## Proje Yapısı

```
PasswordVault/
├── app/                  # Uygulama sayfaları ve yönlendirme katmanı
│   ├── _layout.tsx       # Expo Router ana düzeni (Navigation Container)
│   ├── index.tsx         # Güvenli Giriş Ekranı (Master Password giriş noktası)
│   ├── home.tsx          # Kasa Yönetimi (Liste, Arama, Seçenekler)
│   ├── sifreEkleme.tsx   # Yeni Veri Ekleme Paneli
│   └── veriTransfer.ts   # Geçici Bellek ve Merkezî Veri Deposu (Global State)
├── components/           # Yeniden kullanılabilir kullanıcı arayüzü (UI) bileşenleri
│   ├── ui/               # Temel form ve görünüm elemanları
│   └── [Bileşenler]      # ThemedText, ParallaxScrollView vb. şablon elemanları
├── assets/               # İkonlar, fontlar ve splash screen gibi statik dosyalar
├── constants/            # Uygulama genelindeki sabit değerler
├── scripts/              # Sistemsel scriptler ve komut dosyaları
├── package.json          # Proje bağımlılıkları ve konfigürasyonu
└── app.json              # Expo yapılandırma tercihleri
```

---

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
- Bilgisayarınızda **Node.js** yüklü olmalıdır.
- Mobil cihazınızda veya bilgisayarınızdaki emülatörde **Expo Go** uygulaması bulunmalıdır.

### 2. Bağımlılıkları Yükleme
Terminal uzerinden proje dizinine gidin ve bağımlılıkları kurun:
```bash
npm install
```

### 3. Uygulamayı Başlatma
Geliştirme sunucusunu başlatın:
```bash
npm start
```
*(Veya kısaca `expo start`)*

Terminalde beliren QR kodu **Expo Go** uygulaması ile okutarak uygulamayı test edebilirsiniz. 

> **Not:** Varsayılan test amaçlı *Master Password* **"123456"** olarak belirlenmiştir.

---

## Geliştirici

Bu proje **ilhancvndr** tarafından geliştirilmiştir.

---

### Lisans
Bu projenin kaynak kodları olduğu gibi açık şekilde kişisel çalışma olarak sunulmuştur. Tüm sorumluluk kullanıcıya aittir.
