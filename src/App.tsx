import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import store from "./store/store";

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
