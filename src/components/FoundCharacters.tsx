
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FoundCharactersProps {
  foundChars: { char: string; count: number; name: string; code: string }[];
}

export const FoundCharacters = ({ foundChars }: FoundCharactersProps) => {
  if (foundChars.length === 0) return null;

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl overflow-hidden animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
        <CardTitle className="text-xl font-bold flex items-center justify-between text-orange-800 dark:text-orange-300">
          <span className="flex items-center gap-2">
            🔍 Gefundene unsichtbare Zeichen
          </span>
          <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200 px-4 py-2 rounded-full font-bold shadow-sm">
            🎯 {foundChars.length} Typen
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 max-h-64 overflow-y-auto">
          {foundChars.map((char, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-700 rounded-2xl border border-orange-200 dark:border-slate-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div>
                <span className="font-mono text-base font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                  {char.code}
                </span>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-2 font-medium">{char.name}</p>
              </div>
              <Badge 
                variant="outline" 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 px-4 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-200"
              >
                {char.count}× 🎯
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
