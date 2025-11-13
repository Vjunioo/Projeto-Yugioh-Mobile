// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        
        tabBarStyle: {
           backgroundColor: '#0A0E2C',
           borderTopColor: '#FFD700',
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFF',
      }}
    >
      {/* Tela de Busca (antiga index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      
      {/* NOVA TELA DE COLEÇÕES */}
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Coleções',
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}