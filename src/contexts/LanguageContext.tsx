
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'de' | 'en';

// Define the translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  t: () => '',
});

// Translations for all texts in the application
const translations: Translations = {
  // Header
  appTitle: {
    de: 'ChatGPT Unmark',
    en: 'ChatGPT Unmark',
  },
  appSubtitle: {
    de: 'Entfernung von AI-Wasserzeichen und unsichtbaren Unicode-Zeichen',
    en: 'Removal of AI watermarks and invisible Unicode characters',
  },
  information: {
    de: 'Informationen',
    en: 'Information',
  },
  impressum: {
    de: 'Impressum',
    en: 'Legal Notice',
  },
  
  // Alert
  watermarkDetected: {
    de: 'AI-Wasserzeichen erkannt',
    en: 'AI Watermark Detected',
  },
  watermarkExplanation: {
    de: 'Ihr Text enthält spezifische Zeichen, die als AI-Wasserzeichen verwendet werden.',
    en: 'Your text contains specific characters used as AI watermarks.',
  },
  clickToSee: {
    de: 'Klicken Sie hier, um sie im Text zu sehen.',
    en: 'Click here to see them in the text.',
  },
  
  // TextInputOutput
  enterText: {
    de: 'Text eingeben',
    en: 'Enter Text',
  },
  textDescription: {
    de: 'Fügen Sie hier Ihren Text ein, um ihn von unsichtbaren Zeichen zu bereinigen',
    en: 'Paste your text here to clean it of invisible characters',
  },
  characters: {
    de: 'Zeichen',
    en: 'Characters',
  },
  removed: {
    de: 'entfernt',
    en: 'removed',
  },
  placeholder: {
    de: 'Text hier einfügen...',
    en: 'Paste your text here...',
  },
  
  // FoundCharacters
  foundInvisibleChars: {
    de: 'Gefundene unsichtbare Zeichen',
    en: 'Found Invisible Characters',
  },
  ok: {
    de: 'OK',
    en: 'OK',
  },
  problematic: {
    de: 'Problematisch',
    en: 'Problematic',
  },
  
  // Action Buttons
  copy: {
    de: 'Bereinigten Text kopieren',
    en: 'Copy Cleaned Text',
  },
  copied: {
    de: 'Kopiert!',
    en: 'Copied!',
  },
  download: {
    de: 'Herunterladen',
    en: 'Download',
  },
  clear: {
    de: 'Löschen',
    en: 'Clear',
  },
  
  // InfoDialog
  aboutWatermarks: {
    de: 'Über AI-Wasserzeichen',
    en: 'About AI Watermarks',
  },
  watermarksSubtitle: {
    de: 'Wie KI-Systeme Texte mit unsichtbaren Markierungen versehen',
    en: 'How AI systems mark texts with invisible watermarks',
  },
  watermarksExplanation: {
    de: 'OpenAI hat in Experimenten unsichtbare Unicode-Zeichen als Wasserzeichen getestet. Diese werden strategisch in generierten Text eingeschleust.',
    en: 'OpenAI has experimented with invisible Unicode characters as watermarks. These are strategically inserted into generated text.',
  },
  zwspTitle: {
    de: 'Zero Width Space (ZWSP)',
    en: 'Zero Width Space (ZWSP)',
  },
  zwspDescription: {
    de: 'Wird nach Wörtern eingefügt, nimmt keine Breite ein. Völlig unsichtbar.',
    en: 'Inserted after words, takes no width. Completely invisible.',
  },
  zwnjTitle: {
    de: 'Zero Width (Non-)Joiner',
    en: 'Zero Width (Non-)Joiner',
  },
  zwnjDescription: {
    de: 'Kontrolliert Ligaturen, bleibt unsichtbar. Clevere Taktik.',
    en: 'Controls ligatures, remains invisible. Clever tactic.',
  },
  nnbspTitle: {
    de: 'Narrow No-Break Space',
    en: 'Narrow No-Break Space',
  },
  nnbspDescription: {
    de: 'Sieht wie normales Leerzeichen aus, hat aber anderen Codepoint.',
    en: 'Looks like a normal space but has a different code point.',
  },
  conclusionText: {
    de: 'ChatGPT Unmark erkennt und entfernt diese unsichtbaren Markierungen zuverlässig.',
    en: 'ChatGPT Unmark reliably detects and removes these invisible markings.',
  },

  // Impressum
  backButton: {
    de: 'Zurück',
    en: 'Back',
  },
  impressumTitle: {
    de: 'Impressum',
    en: 'Legal Notice',
  },
  tmgInfo: {
    de: 'Angaben gemäß § 5 TMG',
    en: 'Information according to § 5 TMG',
  },
  contactTitle: {
    de: 'Kontakt',
    en: 'Contact',
  },
  operator: {
    de: 'Betreiber: Jonas Stempel',
    en: 'Operator: Jonas Stempel',
  },
  address: {
    de: 'Adresse: Türnicherstraße 3, 50959 Köln',
    en: 'Address: Türnicherstraße 3, 50959 Cologne',
  },
  disclaimerTitle: {
    de: 'Haftungsausschluss',
    en: 'Disclaimer',
  },
  liabilityContent: {
    de: 'Haftung für Inhalte',
    en: 'Liability for Content',
  },
  liabilityContentText: {
    de: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
    en: 'As a service provider, we are responsible for our own content on these pages according to § 7 paragraph 1 TMG. According to §§ 8 to 10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.',
  },
  liabilityLinks: {
    de: 'Haftung für Links',
    en: 'Liability for Links',
  },
  liabilityLinksText: {
    de: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
    en: 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.',
  },

  // Toast messages
  watermarksHighlighted: {
    de: 'AI-Wasserzeichen im Text hervorgehoben',
    en: 'AI watermarks highlighted in text',
  },
  charactersHighlighted: {
    de: 'Zeichen im Text hervorgehoben',
    en: 'Characters highlighted in text',
  },
  textCopied: {
    de: 'Bereinigter Text erfolgreich kopiert',
    en: 'Cleaned text successfully copied',
  },
  copyError: {
    de: 'Fehler beim Kopieren',
    en: 'Error copying text',
  },
  downloadStarted: {
    de: 'Download gestartet',
    en: 'Download started',
  },
  textCleared: {
    de: 'Text gelöscht',
    en: 'Text cleared',
  },

  // Language switcher
  language: {
    de: 'Sprache',
    en: 'Language',
  },
  german: {
    de: 'Deutsch',
    en: 'German',
  },
  english: {
    de: 'Englisch',
    en: 'English',
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de'); // Default to German

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
