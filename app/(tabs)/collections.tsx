// app/(tabs)/collections.tsx
import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { AppBackground, AppContainer, DarkOverlay } from '../../components/common.styles';

const archetypes = [
  {
    name: 'Blue-Eyes',
    image: require('../../assets/images/packs/blue-eyes-pack.jpg'),
  },
  {
    name: 'Dark Magician',
    image: require('../../assets/images/packs/dark-magician-pack.jpg'),
  },
  {
    name: 'HERO',
    image: require('../../assets/images/packs/hero-pack.png'),
  },
];

export default function CollectionsScreen() {
  return (
    <AppContainer>
      <AppBackground>
        <DarkOverlay>
          <ContentScrollView>
            <Title>Coleções de Arquétipos</Title>
            <PackGrid>
              {archetypes.map((archetype) => (
                <Link
                  key={archetype.name}
                  href={{
                    pathname: "/archetype/[name]",
                    params: { name: archetype.name },
                  }}
                  asChild
                >
                  <PackButton>
                    <PackImage source={archetype.image} resizeMode="cover" />
                    <PackName>{archetype.name}</PackName>
                  </PackButton>
                </Link>
              ))}
            </PackGrid>
          </ContentScrollView>
        </DarkOverlay>
      </AppBackground>
    </AppContainer>
  );
}


const ContentScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    padding: 16,
    alignItems: 'center',
  },
})`
  flex: 1;
`;

const Title = styled(Text)`
  font-family: 'Orbitron_700Bold';
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #FFD700;
`;

const PackGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PackButton = styled(TouchableOpacity)`
  width: 45%; /* Mostra 2 por linha */
  aspect-ratio: 0.7; /* Proporção de pacote */
  margin-bottom: 15px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #00E5FF;
  background-color: #0A0E2C;
  align-items: center;
  justify-content: flex-end;
`;

const PackImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const PackName = styled(Text)`
  font-family: 'Orbitron_700Bold';
  color: #FFF;
  font-size: 16px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  text-align: center;
`;