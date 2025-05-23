
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface TextInputOutputProps {
  inputText: string;
  onInputChange: (value: string) => void;
  stats: {
    originalLength: number;
    cleanedLength: number;
    charactersRemoved: number;
    invisibleCharsFound: number;
  };
}

export const TextInputOutput = ({ inputText, onInputChange, stats }: TextInputOutputProps) => {
  return (
    <div className="mb-8">
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl group hover:shadow-cyan-500/10 transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
                Text eingeben
              </CardTitle>
              <CardDescription className="text-slate-400">
                Fügen Sie hier Ihren Text ein, um ihn von unsichtbaren Zeichen zu bereinigen
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 border-slate-700 px-3 py-1 font-medium backdrop-blur-sm">
                {stats.originalLength} Zeichen
              </Badge>
              {stats.charactersRemoved > 0 && (
                <Badge variant="destructive" className="bg-red-900/30 text-red-300 border-red-700 px-3 py-1 font-medium backdrop-blur-sm">
                  {stats.charactersRemoved} entfernt
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            placeholder="Text hier einfügen..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            spellCheck={false}
            className="min-h-[400px] resize-none border-0 bg-slate-800/30 text-slate-200 placeholder:text-slate-500 focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 backdrop-blur-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
};
