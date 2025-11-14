// app/card/[id].tsx

import { Orbitron_400Regular, Orbitron_700Bold, useFonts } from '@expo-google-fonts/orbitron';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';

// Importando Estilos Compartilhados
import { AppBackground, AppContainer, DarkOverlay } from '../../components/common.styles';

// -------- Componentes Estilizados (Correção do Scroll e Background) --------

const ContentScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: 'center',       // Centraliza todo o conteúdo horizontalmente
    paddingHorizontal: 16,      // Adiciona um "respiro" nas laterais da tela
    paddingVertical: 20,        // Adiciona um "respiro" no topo e no final do scroll
    flexGrow: 1,                // <--- ESSENCIAL: Faz o conteúdo crescer para preencher o espaço
  },
})`
  flex: 1;
  width: 100%;
  /* Remove qualquer background aqui, o DarkOverlay abaixo já cuida disso */
`;

const CardImage = styled(Image)`
  width: 100%;
  max-width: 320px; 
  aspect-ratio: 0.69;
  resize-mode: contain;
  margin-bottom: 20px;
  border-width: 4px;
  border-color: #FFD700;
  border-radius: 8px;
  shadow-color: #FFD700;
  shadow-opacity: 0.7;
  shadow-radius: 10px;
`;

const DescContainer = styled(View)`
  width: 100%; 
  max-width: 500px;
  background-color: rgba(10, 14, 44, 0.85);
  border-width: 1px;
  border-color: #00E5FF;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const DescTitle = styled(Text)`
  font-family: 'Orbitron_700Bold';
  font-size: 22px;
  margin-bottom: 10px;
  color: #00E5FF;
  text-align: center;
`;

const CardDesc = styled(Text)`
  font-family: 'Orbitron_400Regular';
  font-size: 16px;
  color: #FFF;
  line-height: 22px;
  text-align: left;
`;

// -------- Componente Principal --------
export default function CardDetailScreen() {
  const { name, desc, imageUrl } = useLocalSearchParams();

  let [fontsLoaded] = useFonts({
    Orbitron_700Bold,
    Orbitron_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FFD700" style={{ flex: 1, backgroundColor: '#0A0E2C' }} />;
  }

  return (
    <AppContainer>
      <AppBackground>
        {/* O DarkOverlay precisa cobrir toda a tela, independentemente do scroll */}
        <DarkOverlay> 
          <Stack.Screen
            options={{
              title: name as string,
              headerStyle: { backgroundColor: '#0A0E2C' },
              headerTintColor: '#FFD700',
              headerTitleStyle: { fontFamily: 'Orbitron_700Bold' },
            }}
          />

          {/* O ContentScrollView agora tem flexGrow: 1 em seu contentContainerStyle */}
          <ContentScrollView>
            <CardImage source={{ uri: imageUrl as string }} />
            <DescContainer>
              <DescTitle>Descrição</DescTitle>
              <CardDesc>{desc}</CardDesc>
            </DescContainer>
          </ContentScrollView>
        </DarkOverlay>
      </AppBackground>
    </AppContainer>
  );
}