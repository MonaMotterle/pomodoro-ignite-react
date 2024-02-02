import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/default.ts';
import { GlobalStyle } from './styles/global.ts';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World</h1>

      <GlobalStyle />
    </ThemeProvider>
  );
}
