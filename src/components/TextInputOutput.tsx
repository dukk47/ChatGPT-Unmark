
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface TextInputOutputProps {
  inputText: string;
  cleanedText: string;
  onInputChange: (value: string) => void;
}

export const TextInputOutput = ({ inputText, cleanedText, onInputChange }: TextInputOutputProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      {/* Input */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl group hover:shadow-cyan-500/10 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
            Ursprungstext
          </CardTitle>
          <CardDescription className="text-slate-400">
            Fügen Sie hier Ihren Text ein
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            placeholder="Text hier einfügen..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[350px] resize-none border-0 bg-slate-800/30 text-slate-200 placeholder:text-slate-500 focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 backdrop-blur-sm"
          />
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl group hover:shadow-emerald-500/10 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
            Bereinigter Text
          </CardTitle>
          <CardDescription className="text-slate-400">
            Text ohne unsichtbare Zeichen
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            value={cleanedText}
            readOnly
            className="min-h-[350px] resize-none border-0 bg-emerald-950/20 text-slate-200 focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 backdrop-blur-sm"
            placeholder="Bereinigter Text erscheint hier..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
