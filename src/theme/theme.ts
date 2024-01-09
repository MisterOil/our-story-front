import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#E91E63', // Pink color
        },
        secondary: {
          main: '#00BCD4', // Teal or turquoise color
        },
      },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Change the default font
  },
});

export default theme;
