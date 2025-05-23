
import { useMemo } from 'react';
import { UNICODE_CHARS } from '@/constants/unicodeChars';

export const useTextCleaner = (inputText: string) => {
  return useMemo(() => {
    let cleaned = inputText;
    const found: { char: string; count: number; name: string; code: string }[] = [];
    
    Object.entries(UNICODE_CHARS).forEach(([char, info]) => {
      const regex = new RegExp(char, 'g');
      const matches = inputText.match(regex);
      if (matches) {
        found.push({
          char,
          count: matches.length,
          name: info.name,
          code: `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`
        });
        cleaned = cleaned.replace(regex, info.replaceWith);
      }
    });

    return {
      cleanedText: cleaned,
      foundChars: found,
      stats: {
        originalLength: inputText.length,
        cleanedLength: cleaned.length,
        charactersRemoved: inputText.length - cleaned.length,
        invisibleCharsFound: found.reduce((sum, char) => sum + char.count, 0)
      }
    };
  }, [inputText]);
};
