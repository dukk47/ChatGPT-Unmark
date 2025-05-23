
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FoundCharactersProps {
  foundChars: { char: string; count: number; name: string; code: string }[];
}

export const FoundCharacters = ({ foundChars }: FoundCharactersProps) => {
  if (foundChars.length === 0) return null;

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center justify-between text-slate-200">
          <span className="flex items-center gap-2">
            Gefundene unsichtbare Zeichen
          </span>
          <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 border-slate-600 px-4 py-2 font-bold backdrop-blur-sm">
            {foundChars.length} Typen
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 max-h-64 overflow-y-auto">
          {foundChars.map((char, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-4 bg-slate-800/30 border border-slate-700 rounded-lg backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200"
            >
              <div>
                <span className="font-mono text-base font-bold text-cyan-300 bg-slate-800/50 px-3 py-1 rounded-md">
                  {char.code}
                </span>
                <p className="text-sm text-slate-400 mt-2 font-medium">{char.name}</p>
              </div>
              <Badge 
                variant="outline" 
                className="bg-indigo-900/30 text-indigo-300 border-indigo-700 px-4 py-2 font-bold backdrop-blur-sm"
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
