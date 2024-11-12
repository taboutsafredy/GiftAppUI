// src/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importer les fichiers de traduction
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// Définir les ressources de traduction
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

// Initialiser i18n
i18n
  .use(initReactI18next) // Passe pendant l'initialisation à react-i18next
  .init({
    resources,
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de repli

    keySeparator: false, // Utilise des clés simples
    interpolation: {
      escapeValue: false, // React s'occupe de l'échappement
    },
  });

export default i18n;