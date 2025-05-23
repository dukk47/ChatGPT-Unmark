
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIWatermarkAlertProps {
  watermarkChars: { char: string; count: number; name: string; code: string; positions: number[] }[];
}

export const AIWatermarkAlert = ({ watermarkChars }: AIWatermarkAlertProps) => {
  if (watermarkChars.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:border-red-800">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <span className="font-semibold text-red-800 dark:text-red-300">
          AI-Wasserzeichen entdeckt
        </span>
      </div>
      <p className="text-sm text-red-700 dark:text-red-300 mb-2">
        Ihr Text enthält spezifische Zeichen, die als AI-Wasserzeichen verwendet werden.
      </p>
      <div className="flex gap-2 flex-wrap">
        {watermarkChars.map((char, index) => (
          <Badge key={index} variant="destructive" className="text-xs">
            {char.code} ({char.count}×)
          </Badge>
        ))}
      </div>
    </div>
  );
};
