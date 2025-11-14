// components/common.styles.ts
import styled from 'styled-components/native';
// Importe o 'Platform'
import { ImageBackground, Platform, SafeAreaView, View } from 'react-native';

// --- Asset ---
const bgImage = require('../assets/images/duel-background.jpg'); // (Já corrigido)

// --- Componentes Compartilhados ---

export const AppContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #0A0E2C;

  /* ESTA É A CORREÇÃO:
    No web (navegador), force o container a ter 100% da altura da
    janela (viewport height), e esconda qualquer scroll do body.
  */
  ${Platform.OS === 'web' && `
    height: 100vh;
    overflow-y: hidden;
  `}
`;

export const AppBackground = styled(ImageBackground).attrs({
  source: bgImage,
  resizeMode: 'cover',
})`
  flex: 1;
`;

export const DarkOverlay = styled(View)`
  flex: 1;
  /* Se o AppContainer (pai) não pode rolar, o DarkOverlay
    precisa permitir a rolagem interna no web.
  */
  ${Platform.OS === 'web' && `
    overflow-y: auto;
  `}
`;