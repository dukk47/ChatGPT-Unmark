
import React from 'react';
import { AlertCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIWatermarkAlertProps {
  watermarkChars: { char: string; count: number; name: string; code: string }[];
}

export const AIWatermarkAlert = ({ watermarkChars }: AIWatermarkAlertProps) => {
  if (watermarkChars.length === 0) return null;

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-red-50 via-pink-50 to-red-50 border-2 border-red-200 rounded-2xl dark:from-red-950/30 dark:via-pink-950/30 dark:to-red-950/30 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <AlertCircle className="w-6 h-6 text-red-600 animate-pulse" />
          <Zap className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
        </div>
        <span className="font-bold text-lg text-red-800 dark:text-red-300">
          🚨 AI-Wasserzeichen entdeckt!
        </span>
      </div>
      <p className="text-red-700 dark:text-red-300 mb-4 text-base">
        🔍 Ihr Text enthält spezifische Zeichen, die als AI-Wasserzeichen verwendet werden.
      </p>
      <div className="flex gap-3 flex-wrap">
        {watermarkChars.map((char, index) => (
          <Badge 
            key={index} 
            variant="destructive" 
            className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 shadow-md"
          >
            {char.code} ({char.count}× 🎯)
          </Badge>
        ))}
      </div>
    </div>
  );
};
