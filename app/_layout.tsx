import { Stack } from 'expo-router';

/**
 * Uygulamanın Temel Navigasyon Yapısını Ve Ekran Kayıtlarını Yöneten RootLayout Bileşeni
 */
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="sifreEkleme" />
    </Stack>
  );
}
