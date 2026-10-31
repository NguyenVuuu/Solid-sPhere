import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationVI from './locales/vi.json';
import translationEN from './locales/en.json';
import translationJP from './locales/jp.json';

const resources = {
  vi: {
    translation: translationVI
  },
  en: {
    translation: translationEN
  },
  jp: {
    translation: translationJP
  }
};

i18n
  .use(LanguageDetector) // Tự động detect ngôn ngữ từ browser
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    debug: true,
    
    interpolation: {
      escapeValue: false // React đã escape sẵn
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
