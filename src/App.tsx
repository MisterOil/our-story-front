import React from "react";
import Header from "./components/header";
import Content from "./components/content";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import FileUpload from "./components/fileupload";

function App() {
  return (
    <ThemeProvider theme={theme}>
       <CssBaseline />
      <div className="App">
        <Header />
        <FileUpload/>
        <Content />
      </div>
    </ThemeProvider>
  );
}

export default App;
