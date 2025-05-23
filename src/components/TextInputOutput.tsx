
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { HighlightedText } from '@/components/HighlightedText';

interface TextInputOutputProps {
  inputText: string;
  cleanedText: string;
  foundChars: { char: string; positions: number[]; code: string }[];
  onInputChange: (value: string) => void;
}

export const TextInputOutput = ({ inputText, cleanedText, foundChars, onInputChange }: TextInputOutputProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Input */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ursprungstext</CardTitle>
          <CardDescription>
            Fügen Sie hier Ihren Text ein
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            placeholder="Text hier einfügen..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[300px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none"
          />
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Bereinigter Text</CardTitle>
          <CardDescription>
            Text ohne unsichtbare Zeichen
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            value={cleanedText}
            readOnly
            className="min-h-[300px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none bg-slate-50 dark:bg-slate-800"
            placeholder="Bereinigter Text erscheint hier..."
          />
        </CardContent>
      </Card>

      {/* Highlighted Original Text */}
      {foundChars.length > 0 && (
        <Card className="shadow-lg md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ursprungstext mit Markierungen</CardTitle>
            <CardDescription>
              Unsichtbare Zeichen sind rot markiert und zeigen ihre Unicode-Codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg max-h-[300px] overflow-y-auto font-mono text-sm whitespace-pre-wrap leading-relaxed">
              <HighlightedText text={inputText} foundChars={foundChars} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
