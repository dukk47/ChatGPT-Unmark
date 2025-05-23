
import React from 'react';

interface HighlightedTextProps {
  text: string;
  foundChars: { char: string; positions: number[]; code: string }[];
}

export const HighlightedText = ({ text, foundChars }: HighlightedTextProps) => {
  if (foundChars.length === 0) {
    return <span>{text}</span>;
  }

  // Erstelle eine Liste aller Positionen mit ihren Zeichen
  const allPositions: { position: number; char: string; code: string }[] = [];
  
  foundChars.forEach(({ char, positions, code }) => {
    positions.forEach(position => {
      allPositions.push({ position, char, code });
    });
  });

  // Sortiere nach Position
  allPositions.sort((a, b) => a.position - b.position);

  if (allPositions.length === 0) {
    return <span>{text}</span>;
  }

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  allPositions.forEach(({ position, char, code }, index) => {
    // Füge Text vor dem unsichtbaren Zeichen hinzu
    if (position > lastIndex) {
      result.push(text.substring(lastIndex, position));
    }

    // Füge das hervorgehobene unsichtbare Zeichen hinzu
    result.push(
      <span
        key={`highlight-${index}`}
        className="relative inline-block bg-red-200 border border-red-400 px-1 text-xs text-red-800 rounded"
        title={`${code}: ${char}`}
      >
        [{code}]
      </span>
    );

    lastIndex = position + char.length;
  });

  // Füge den verbleibenden Text hinzu
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return <span>{result}</span>;
};
