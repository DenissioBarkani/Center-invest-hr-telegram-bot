// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found!');

createRoot(rootElement).render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme} defaultMode="dark">
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
