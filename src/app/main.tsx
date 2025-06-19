// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={darkTheme} defaultMode="dark">
      <App />
    </ThemeProvider>
  </BrowserRouter>
  // </StrictMode>,
)
