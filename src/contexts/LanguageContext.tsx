
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { translations } from '@/data/translations';

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  t: () => '',
});

// Function to detect user's preferred language
const detectUserLanguage = (): Language => {
  // Check if language preference is already saved in localStorage
  const savedLanguage = localStorage.getItem('preferred-language') as Language;
  if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
    return savedLanguage;
  }

  // Get browser language
  const browserLanguage = navigator.language || navigator.languages[0];
  
  // If browser language starts with 'de' (German), use German
  if (browserLanguage.toLowerCase().startsWith('de')) {
    return 'de';
  }
  
  // For all other languages, default to English
  return 'en';
};

// Create the provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('de');

  // Initialize language on component mount
  useEffect(() => {
    const detectedLanguage = detectUserLanguage();
    setLanguageState(detectedLanguage);
  }, []);

  // Wrapper function to also save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
