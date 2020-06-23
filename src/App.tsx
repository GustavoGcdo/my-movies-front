import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.scss';
import Routes from './routes';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  palette: {
    type: 'light',
    primary: { main: '#57d2a8', contrastText: '#ffffff' },
    secondary: { main: '#FF9A51', contrastText: '#ffffff' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
