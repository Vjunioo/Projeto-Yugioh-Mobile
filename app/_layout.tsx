import { Orbitron_400Regular, Orbitron_700Bold, useFonts } from '@expo-google-fonts/orbitron';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Orbitron_700Bold,
    Orbitron_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0E2C' }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <Stack>
      {/*
        A LINHA MAIS IMPORTANTE:
        Esta linha diz ao navegador "Stack" que, ao renderizar o grupo
        de telas "(tabs)", ele NUNCA deve mostrar um header (a barra branca).
      */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      
      {/* A tela de detalhes está correta, não precisa mexer */}
      <Stack.Screen name="card/[id]" />

    </Stack>
  );
}