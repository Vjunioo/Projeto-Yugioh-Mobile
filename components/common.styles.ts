

import { ImageBackground, SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
const bgImage = require('../assets/images/duel-background.jpg');

export const AppContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #0A0E2C;
`;

export const AppBackground = styled(ImageBackground).attrs({
  source: bgImage,
  resizeMode: 'cover',
})`
  flex: 1;
`;

export const DarkOverlay = styled(View)`
  flex: 1;
  background-color: rgba(10, 14, 44, 0.75);
`;