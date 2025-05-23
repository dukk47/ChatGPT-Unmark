
// Define available languages
export type Language = 'de' | 'en';

// Define the translations interface
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Define the context type
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
