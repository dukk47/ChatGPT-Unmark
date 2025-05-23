
import React from 'react';
import { Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  stats: {
    originalLength: number;
    charactersRemoved: number;
  };
  onInfoClick: () => void;
}

export const AppHeader = ({ stats, onInfoClick }: AppHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-3">
        <Shield className="w-8 h-8 text-blue-600" />
        ChatGPT Unmark
      </h1>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        Entfernt AI-Wasserzeichen und unsichtbare Unicode-Zeichen aus Texten
      </p>
      
      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{stats.originalLength} Zeichen</Badge>
          {stats.charactersRemoved > 0 && (
            <Badge variant="destructive">{stats.charactersRemoved} entfernt</Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onInfoClick}
          className="text-blue-600 hover:text-blue-700"
        >
          <Info className="w-4 h-4 mr-1" />
          Info
        </Button>
      </div>
    </div>
  );
};
