
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  de: {
    // Header
    'header.title': 'ChatGPT Unmark',
    'header.subtitle': 'Entfernung von AI-Wasserzeichen und unsichtbaren Unicode-Zeichen',
    'header.info': 'Informationen',
    'header.impressum': 'Impressum',
    
    // AI Watermark Alert
    'alert.detected': 'AI-Wasserzeichen erkannt',
    'alert.description': 'Ihr Text enthält spezifische Zeichen, die als AI-Wasserzeichen verwendet werden.',
    'alert.clickHint': 'Klicken Sie hier, um sie im Text zu sehen.',
    
    // Text Input
    'input.title': 'Text eingeben',
    'input.description': 'Fügen Sie hier Ihren Text ein, um ihn von unsichtbaren Zeichen zu bereinigen',
    'input.placeholder': 'Text hier einfügen...',
    'input.characters': 'Zeichen',
    'input.removed': 'entfernt',
    
    // Found Characters
    'chars.title': 'Gefundene unsichtbare Zeichen',
    'chars.ok': 'OK',
    'chars.problematic': 'Problematisch',
    
    // Action Buttons
    'buttons.copy': 'Bereinigten Text kopieren',
    'buttons.copied': 'Kopiert!',
    'buttons.download': 'Herunterladen',
    'buttons.clear': 'Löschen',
    
    // Toast Messages
    'toast.watermarksHighlighted': 'AI-Wasserzeichen im Text hervorgehoben',
    'toast.characterHighlighted': 'Zeichen im Text hervorgehoben',
    'toast.copied': 'Bereinigter Text erfolgreich kopiert',
    'toast.copyError': 'Fehler beim Kopieren',
    'toast.downloadStarted': 'Download gestartet',
    'toast.textCleared': 'Text gelöscht',
    
    // Info Dialog
    'info.title': 'Über AI-Wasserzeichen',
    'info.subtitle': 'Wie KI-Systeme Texte mit unsichtbaren Markierungen versehen',
    'info.description': 'OpenAI hat in Experimenten unsichtbare Unicode-Zeichen als Wasserzeichen getestet. Diese werden strategisch in generierten Text eingeschleust.',
    'info.zwsp': 'Wird nach Wörtern eingefügt, nimmt keine Breite ein. Völlig unsichtbar.',
    'info.zwnj': 'Kontrolliert Ligaturen, bleibt unsichtbar. Clevere Taktik.',
    'info.nnbsp': 'Sieht wie normales Leerzeichen aus, hat aber anderen Codepoint.',
    'info.conclusion': 'ChatGPT Unmark erkennt und entfernt diese unsichtbaren Markierungen zuverlässig.',
    
    // Impressum
    'impressum.title': 'Impressum',
    'impressum.back': 'Zurück',
    'impressum.tmg': 'Angaben gemäß § 5 TMG',
    'impressum.contact': 'Kontakt',
    'impressum.operator': 'Betreiber: Jonas Stempel',
    'impressum.address': 'Adresse: Türnicherstraße 3, 50959 Köln',
    'impressum.disclaimer': 'Haftungsausschluss',
    'impressum.contentLiability': 'Haftung für Inhalte',
    'impressum.contentText': 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
    'impressum.linkLiability': 'Haftung für Links',
    'impressum.linkText': 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
  },
  en: {
    // Header
    'header.title': 'ChatGPT Unmark',
    'header.subtitle': 'Removal of AI watermarks and invisible Unicode characters',
    'header.info': 'Information',
    'header.impressum': 'Legal Notice',
    
    // AI Watermark Alert
    'alert.detected': 'AI watermarks detected',
    'alert.description': 'Your text contains specific characters used as AI watermarks.',
    'alert.clickHint': 'Click here to see them in the text.',
    
    // Text Input
    'input.title': 'Enter text',
    'input.description': 'Paste your text here to clean it from invisible characters',
    'input.placeholder': 'Paste text here...',
    'input.characters': 'characters',
    'input.removed': 'removed',
    
    // Found Characters
    'chars.title': 'Found invisible characters',
    'chars.ok': 'OK',
    'chars.problematic': 'Problematic',
    
    // Action Buttons
    'buttons.copy': 'Copy cleaned text',
    'buttons.copied': 'Copied!',
    'buttons.download': 'Download',
    'buttons.clear': 'Clear',
    
    // Toast Messages
    'toast.watermarksHighlighted': 'AI watermarks highlighted in text',
    'toast.characterHighlighted': 'Character highlighted in text',
    'toast.copied': 'Cleaned text successfully copied',
    'toast.copyError': 'Error copying text',
    'toast.downloadStarted': 'Download started',
    'toast.textCleared': 'Text cleared',
    
    // Info Dialog
    'info.title': 'About AI watermarks',
    'info.subtitle': 'How AI systems mark texts with invisible markers',
    'info.description': 'OpenAI has experimentally tested invisible Unicode characters as watermarks. These are strategically inserted into generated text.',
    'info.zwsp': 'Inserted after words, takes no width. Completely invisible.',
    'info.zwnj': 'Controls ligatures, remains invisible. Clever tactic.',
    'info.nnbsp': 'Looks like normal space but has different codepoint.',
    'info.conclusion': 'ChatGPT Unmark reliably detects and removes these invisible markings.',
    
    // Impressum
    'impressum.title': 'Legal Notice',
    'impressum.back': 'Back',
    'impressum.tmg': 'Information according to § 5 TMG',
    'impressum.contact': 'Contact',
    'impressum.operator': 'Operator: Jonas Stempel',
    'impressum.address': 'Address: Türnicherstraße 3, 50959 Cologne',
    'impressum.disclaimer': 'Disclaimer',
    'impressum.contentLiability': 'Liability for content',
    'impressum.contentText': 'As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 TMG under general law. However, according to §§ 8 to 10 TMG, we as a service provider are not under the obligation to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.',
    'impressum.linkLiability': 'Liability for links',
    'impressum.linkText': 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
