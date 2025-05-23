
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface TextInputOutputProps {
  inputText: string;
  onInputChange: (value: string) => void;
}

export const TextInputOutput = ({ inputText, onInputChange }: TextInputOutputProps) => {
  return (
    <div className="mb-8">
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl group hover:shadow-cyan-500/10 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
            Text eingeben
          </CardTitle>
          <CardDescription className="text-slate-400">
            Fügen Sie hier Ihren Text ein, um ihn von unsichtbaren Zeichen zu bereinigen
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            placeholder="Text hier einfügen..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[400px] resize-none border-0 bg-slate-800/30 text-slate-200 placeholder:text-slate-500 focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 backdrop-blur-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
};
