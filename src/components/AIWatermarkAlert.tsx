
import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIWatermarkAlertProps {
  watermarkChars: { char: string; count: number; name: string; code: string }[];
}

export const AIWatermarkAlert = ({ watermarkChars }: AIWatermarkAlertProps) => {
  if (watermarkChars.length === 0) return null;

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-red-950/30 via-orange-950/20 to-red-950/30 border border-red-800/30 rounded-xl backdrop-blur-sm shadow-2xl animate-scale-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <Zap className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
        </div>
        <span className="font-bold text-lg text-red-300">
          AI-Wasserzeichen erkannt
        </span>
      </div>
      <p className="text-red-300/80 mb-4 text-base">
        Ihr Text enthält spezifische Zeichen, die als AI-Wasserzeichen verwendet werden.
      </p>
      <div className="flex gap-3 flex-wrap">
        {watermarkChars.map((char, index) => (
          <Badge 
            key={index} 
            variant="destructive" 
            className="text-sm px-4 py-2 bg-red-900/40 hover:bg-red-800/40 text-red-200 border-red-700 transition-all duration-200 backdrop-blur-sm"
          >
            {char.code} ({char.count}×)
          </Badge>
        ))}
      </div>
    </div>
  );
};
