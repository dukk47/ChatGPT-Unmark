
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
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
          <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
            📝 Ursprungstext
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            ✨ Fügen Sie hier Ihren Text ein
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            placeholder="🌟 Text hier einfügen..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[350px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 bg-transparent placeholder:text-slate-400"
          />
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardTitle className="text-xl font-bold text-green-800 dark:text-green-300 flex items-center gap-2">
            ✅ Bereinigter Text
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            🎯 Text ohne unsichtbare Zeichen
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            value={cleanedText}
            readOnly
            className="min-h-[350px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-slate-700/50 dark:to-slate-700/50 text-base leading-relaxed p-6"
            placeholder="🌟 Bereinigter Text erscheint hier..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
