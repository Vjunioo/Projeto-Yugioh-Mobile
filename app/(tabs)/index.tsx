// app/(tabs)/index.tsx

import { Orbitron_400Regular, Orbitron_700Bold, useFonts } from '@expo-google-fonts/orbitron';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';

import { AppBackground, AppContainer, DarkOverlay } from '../../components/common.styles';

// --- Interface do Card ---
interface Card {
  id: number;
  name: string;
  desc: string;
  card_images: {
    image_url_small: string;
    image_url: string;
  }[];
}

// -------- CARTAS EM DESTAQUE --------
const featuredCards: Card[] = [
  {
    id: 46986414,
    name: 'Dark Magician',
    desc: 'The ultimate wizard in terms of attack and defense.',
    card_images: [
      {
        image_url_small: 'https://images.ygoprodeck.com/images/cards_small/46986414.jpg',
        image_url: 'https://images.ygoprodeck.com/images/cards/46986414.jpg',
      },
    ],
  },
  {
    id: 89631139,
    name: 'Blue-Eyes White Dragon',
    desc: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
    card_images: [
      {
        image_url_small: 'https://images.ygoprodeck.com/images/cards_small/89631139.jpg',
        image_url: 'https://images.ygoprodeck.com/images/cards/89631139.jpg',
      },
    ],
  },
  {
    id: 74677422,
    name: 'Red-Eyes Black Dragon',
    desc: 'A ferocious dragon with a deadly attack.',
    card_images: [
      {
        image_url_small: 'https://images.ygoprodeck.com/images/cards_small/74677422.jpg',
        image_url: 'https://images.ygoprodeck.com/images/cards/74677422.jpg',
      },
    ],
  },
];



const MainContent = styled(View)`
  flex: 1;
  padding: 24px;
`;

const TitleContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  margin-bottom: 20px;
  align-items: center; /* Centraliza o texto dentro do touchable */
`;

const Title = styled(Text)`
  font-family: 'Orbitron_700Bold';
  font-size: 32px;
  text-align: center;
  color: #FFD700;
  text-shadow-color: 'rgba(255, 215, 0, 0.7)';
  text-shadow-offset: 0px 0px; 
  text-shadow-radius: 8px;
`;

const SearchContainer = styled(View)<{ isFocused: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-width: 2px;
  border-color: ${ ({ isFocused }: { isFocused: boolean }) => isFocused ? '#FFF' : '#FFD700' };
  border-radius: 10px;
  margin-bottom: 15px;
  padding-left: 15px;
`;

const SearchInput = styled(TextInput).attrs({
  placeholderTextColor: '#AAA',
})`
  flex: 1;
  height: 50px;
  padding-horizontal: 10px;
  color: #FFF;
  font-family: 'Orbitron_400Regular';
  font-size: 16px;
`;

const GoldButton = styled(TouchableOpacity)`
  background-color: #FFD700;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  shadow-color: #FFD700;
  shadow-opacity: 0.7;
  shadow-radius: 10px;
  elevation: 8;
`;

const GoldButtonText = styled(Text)`
  color: #0A0E2C;
  font-family: 'Orbitron_700Bold';
  font-size: 18px;
  text-transform: uppercase;
`;

const ErrorText = styled(Text)`
  font-family: 'Orbitron_400Regular';
  font-size: 16px;
  color: #FF6B6B;
  text-align: center;
  margin-top: 20px;
  background-color: rgba(25, 0, 0, 0.7);
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #FF6B6B;
`;

const CardItemPressable = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: rgba(10, 14, 44, 0.85);
  border-width: 1px;
  border-color: #00E5FF;
  border-radius: 5px;
`;

const CardImageSmall = styled(Image)`
  width: 50px;
  height: 70px;
  margin-right: 15px;
  resize-mode: contain;
  border-radius: 4px;
`;

const CardName = styled(Text)`
  font-family: 'Orbitron_400Regular';
  font-size: 16px;
  color: #FFF;
  flex: 1;
`;

const FeaturedTitle = styled(Text)`
  font-family: 'Orbitron_700Bold';
  font-size: 22px;
  color: #00E5FF;
  margin-top: 30px;
  margin-bottom: 15px;
  text-align: center;
`;

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Orbitron_700Bold,
    Orbitron_400Regular,
  });

  const resetSearch = () => {
    setSearchText('');
    setCards([]);
    setErrorMessage('');
    setIsLoading(false);
    Keyboard.dismiss();
    router.replace('/');
  };

  const searchCards = async () => {
    if (!searchText) return;
    setIsLoading(true);
    setCards([]);
    setErrorMessage('');
    Keyboard.dismiss(); 
    try {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(searchText)}`);
      if (!response.ok) {
        setErrorMessage("Nenhum card encontrado. Verifique o nome e tente novamente.");
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      if (data.data) {
        setCards(data.data);
      } else {
        setErrorMessage("Nenhum card encontrado. Verifique o nome e tente novamente.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorMessage("Erro de rede. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FFD700" style={{ flex: 1, backgroundColor: '#0A0E2C' }} />;
  }
  
  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />;
    }
    
    if (errorMessage) {
      return <ErrorText>{errorMessage}</ErrorText>;
    }
    
    if (cards.length > 0) {
      return (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/card/[id]",
                params: {
                  id: item.id.toString(),
                  name: item.name,
                  desc: item.desc,
                  imageUrl: item.card_images[0].image_url,
                },
              }}
              asChild
            >
              <CardItemPressable>
                <CardImageSmall source={{ uri: item.card_images[0].image_url_small }} />
                <CardName>{item.name}</CardName>
              </CardItemPressable>
            </Link>
          )}
        />
      );
    }
    
    return (
      <View>
        <FeaturedTitle>Em Destaque</FeaturedTitle>
        {featuredCards.map((item) => (
          <Link
            key={item.id}
            href={{
              pathname: "/card/[id]",
              params: {
                id: item.id.toString(),
                name: item.name,
                desc: item.desc,
                imageUrl: item.card_images[0].image_url,
              },
            }}
            asChild
          >
            <CardItemPressable>
              <CardImageSmall source={{ uri: item.card_images[0].image_url_small }} />
              <CardName>{item.name}</CardName>
            </CardItemPressable>
          </Link>
        ))}
      </View>
    );
  };

  return (
    <AppContainer>
      <AppBackground>
        <DarkOverlay>
            <MainContent>
              {/* NOVO: Título Clicável */}
              <TitleContainer onPress={resetSearch}>
                <Title>Pesquisa do Milênio</Title>
              </TitleContainer>

              <SearchContainer isFocused={isInputFocused}>
                <Ionicons name="search" size={24} color="#FFD700" />
                <SearchInput
                  placeholder="Buscar card..."
                  value={searchText}
                  onChangeText={setSearchText}
                  onSubmitEditing={searchCards} 
                  returnKeyType="search"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </SearchContainer>

              <GoldButton onPress={searchCards} disabled={isLoading}>
                <GoldButtonText>Buscar</GoldButtonText>
              </GoldButton>
              
              {renderContent()}

            </MainContent>
        </DarkOverlay>
      </AppBackground>
    </AppContainer>
  );
}