import { Orbitron_400Regular, Orbitron_700Bold, useFonts } from '@expo-google-fonts/orbitron';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { AppBackground, AppContainer, DarkOverlay } from '../../components/common.styles';

const { width: screenWidth } = Dimensions.get('window');


const ContentScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    padding: 16,
    alignItems: 'center',
  },
})`
  flex: 1;
`;

const CardImage = styled(Image)`
  width: ${screenWidth < 768 ? '90%' : '500px'}; /* Em telas menores, 90% da largura. Em telas maiores, máx. 500px */
  max-width: 500px; /* Garante que nunca seja maior que 500px */
  aspect-ratio: 0.69; /* Mantém a proporção de um card real */
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
  background-color: rgba(10, 14, 44, 0.85);
  border-width: 1px;
  border-color: #00E5FF;
  padding: 15px;
  border-radius: 8px;
  width: ${screenWidth < 768 ? '100%' : '600px'}; /* Em telas menores, 100%. Em maiores, máx. 600px */
  max-width: 600px; /* Garante que nunca seja maior que 600px */
  margin-horizontal: auto; /* Centraliza o container da descrição na web */
`;

const DescTitle = styled(Text)`
  font-family: 'Orbitron_700Bold';
  font-size: 20px;
  margin-bottom: 10px;
  color: #00E5FF;
  text-align: center; /* Centraliza o título da descrição */
`;

const CardDesc = styled(Text)`
  font-family: 'Orbitron_400Regular';
  font-size: 16px; /* CORREÇÃO: Tamanho da fonte levemente menor para melhor leitura */
  color: #FFF;
  line-height: 22px; /* CORREÇÃO: Ajuste de line-height para melhor espaçamento */
  text-align: justify; /* Justifica o texto para um visual mais limpo */
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
        <DarkOverlay>
          <Stack.Screen
            options={{
              title: name as string,
              headerStyle: { backgroundColor: '#0A0E2C' },
              headerTintColor: '#FFD700',
              headerTitleStyle: { fontFamily: 'Orbitron_700Bold' },
            }}
          />

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