
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FoundCharactersProps {
  foundChars: { char: string; count: number; name: string; code: string }[];
}

// Characters that are generally "safe" and expected
const SAFE_CHARS = [
  '\u0009', // TAB
  '\u000A', // LINE FEED
  '\u000D', // CARRIAGE RETURN
  '\u0020', // SPACE
  '\u00A0', // NO-BREAK SPACE
  '\u2028', // LINE SEPARATOR
  '\u2029', // PARAGRAPH SEPARATOR
];

export const FoundCharacters = ({ foundChars }: FoundCharactersProps) => {
  if (foundChars.length === 0) return null;

  const safeChars = foundChars.filter(char => SAFE_CHARS.includes(char.char));
  const problematicChars = foundChars.filter(char => !SAFE_CHARS.includes(char.char));

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center justify-between text-slate-200">
          <span className="flex items-center gap-2">
            Gefundene unsichtbare Zeichen
          </span>
          <div className="flex gap-2">
            {safeChars.length > 0 && (
              <Badge variant="secondary" className="bg-green-900/40 text-green-200 border-green-700 px-3 py-1 font-medium backdrop-blur-sm">
                {safeChars.length} OK
              </Badge>
            )}
            {problematicChars.length > 0 && (
              <Badge variant="secondary" className="bg-orange-900/40 text-orange-200 border-orange-700 px-3 py-1 font-medium backdrop-blur-sm">
                {problematicChars.length} Problematisch
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 max-h-64 overflow-y-auto">
          {/* Safe characters first */}
          {safeChars.map((char, index) => (
            <div 
              key={`safe-${index}`} 
              className="flex justify-between items-center p-4 bg-green-900/10 border border-green-700/30 rounded-lg backdrop-blur-sm hover:bg-green-900/20 transition-all duration-200"
            >
              <div>
                <span className="font-mono text-base font-bold text-green-300 bg-green-800/30 px-3 py-1 rounded-md">
                  {char.code}
                </span>
                <p className="text-sm text-green-200/80 mt-2 font-medium">{char.name}</p>
              </div>
              <Badge 
                variant="outline" 
                className="bg-green-900/30 text-green-300 border-green-700 px-4 py-2 font-bold backdrop-blur-sm"
              >
                {char.count}×
              </Badge>
            </div>
          ))}
          
          {/* Problematic characters */}
          {problematicChars.map((char, index) => (
            <div 
              key={`problem-${index}`} 
              className="flex justify-between items-center p-4 bg-orange-900/10 border border-orange-700/30 rounded-lg backdrop-blur-sm hover:bg-orange-900/20 transition-all duration-200"
            >
              <div>
                <span className="font-mono text-base font-bold text-orange-300 bg-orange-800/30 px-3 py-1 rounded-md">
                  {char.code}
                </span>
                <p className="text-sm text-orange-200/80 mt-2 font-medium">{char.name}</p>
              </div>
              <Badge 
                variant="outline" 
                className="bg-orange-900/30 text-orange-300 border-orange-700 px-4 py-2 font-bold backdrop-blur-sm"
              >
                {char.count}×
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
