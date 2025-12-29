import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext.jsx';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locale/en.json";
import ar from "./locale/ar.json";
import { CartProvider } from './context/CartContext.jsx';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);