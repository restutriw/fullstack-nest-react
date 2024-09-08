import { createTheme, responsiveFontSizes } from "@mui/material";

const firstLetterUppercase = {
  '::first-letter': { 
    textTransform: 'uppercase',
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main:'#6C48C5',
      contrastText: '#fff'
    }, 
    secondary: {
      main: '#F5F5F5',
      contrastText: '#BDBDBD'
    }
  },
  typography: {
    fontFamily: [
      'Poppins', 
      'sans-serif'
    ].join(',')
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: firstLetterUppercase
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: firstLetterUppercase
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;