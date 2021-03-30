
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from '@material-ui/core/styles'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4CC9F0',
    },
    secondary: {
      main: '#07EDB0',
    },
    background: {
      default: "#1F3B70"
    },
    text: {
      primary: "#fff",
      secondary: "#4CC9F0",
      terciary: "#07EDB0"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
