
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
    </div>
  );
};
