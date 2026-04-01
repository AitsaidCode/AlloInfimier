import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';
import en from './en.json';
import ar from './ar.json';

// Restore saved language preference
const savedLang = localStorage.getItem('alloinfirmier_lang') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: savedLang,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });

// Persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('alloinfirmier_lang', lng);
});

export default i18n;
