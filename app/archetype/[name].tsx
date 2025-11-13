// app/archetype/[name].tsx
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { AppBackground, AppContainer, DarkOverlay } from '../../components/common.styles';

interface Card {
  id: number;
  name: string;
  desc: string;
  card_images: {
    image_url_small: string;
    image_url: string;
  }[];
}

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
  font-family: 'Orbitron_400Regular'; /* (Precisa ter essa fonte carregada) */
  font-size: 16px;
  color: #FFF;
  flex: 1;
`;

const ErrorText = styled(Text)`
  font-family: 'Orbitron_400Regular';
  font-size: 16px;
  color: #FF6B6B;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// --- Componente Principal ---
export default function ArchetypeScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!name) return;

    const fetchCards = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(name)}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do arquétipo');
        }
        const data = await response.json();
        if (data.data) {
          setCards(data.data);
        } else {
          setErrorMessage('Nenhum card encontrado para este arquétipo.');
        }
      } catch (error: any) {
        console.error("Erro ao buscar arquétipo:", error);
        setErrorMessage(error.message || "Erro de rede. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [name]);

  return (
    <AppContainer>
      <AppBackground>
        <DarkOverlay>
          <Stack.Screen
            options={{
              title: `Arquétipo: ${name}`,
              headerStyle: { backgroundColor: '#0A0E2C' },
              headerTintColor: '#FFD700',
              headerTitleStyle: { fontFamily: 'Orbitron_700Bold' },
              headerBackTitle: 'Voltar',
            }}
          />
          
          {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color="#FFD700" />
            </LoadingContainer>
          ) : errorMessage ? (
            <ErrorText>{errorMessage}</ErrorText>
          ) : (
            <FlatList
              data={cards}
              keyExtractor={(item) => item.id.toString()}
              style={{ marginTop: 20, paddingHorizontal: 16 }}
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
          )}
        </DarkOverlay>
      </AppBackground>
    </AppContainer>
  );
}