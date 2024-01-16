import { ThemeProvider,  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainPage from './pages/MainPage';
import { Provider } from 'react-redux';
import theme from './theme/theme';
import store from './store/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
