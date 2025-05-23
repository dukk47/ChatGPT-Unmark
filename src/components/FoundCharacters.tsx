
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FoundCharactersProps {
  foundChars: { char: string; count: number; name: string; code: string; positions: number[] }[];
}

export const FoundCharacters = ({ foundChars }: FoundCharactersProps) => {
  if (foundChars.length === 0) return null;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Gefundene unsichtbare Zeichen
          <Badge variant="secondary">{foundChars.length} Typen</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 max-h-48 overflow-y-auto">
          {foundChars.map((char, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded"
            >
              <div>
                <span className="font-mono text-sm font-semibold">{char.code}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">{char.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Positionen: {char.positions.slice(0, 5).join(', ')}
                  {char.positions.length > 5 && ` und ${char.positions.length - 5} weitere`}
                </p>
              </div>
              <Badge variant="outline">{char.count}×</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
