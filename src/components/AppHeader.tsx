
import React from 'react';
import { Shield, Info, Sparkles } from 'lucide-react';
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
    <div className="text-center mb-12 animate-fade-in">
      <div className="relative inline-block mb-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 relative">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Shield className="w-12 h-12 text-violet-500 animate-pulse" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
            ChatGPT Unmark
          </div>
        </h1>
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-lg rounded-full opacity-75"></div>
      </div>
      
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 font-medium">
        ✨ Entfernt AI-Wasserzeichen und unsichtbare Unicode-Zeichen aus Texten ✨
      </p>
      
      <div className="flex justify-center items-center gap-6 text-sm">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 px-4 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200">
            📝 {stats.originalLength} Zeichen
          </Badge>
          {stats.charactersRemoved > 0 && (
            <Badge variant="destructive" className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200 px-4 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200 animate-bounce">
              🚮 {stats.charactersRemoved} entfernt
            </Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onInfoClick}
          className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
        >
          <Info className="w-4 h-4 mr-2" />
          💡 Info
        </Button>
      </div>
    </div>
  );
};
