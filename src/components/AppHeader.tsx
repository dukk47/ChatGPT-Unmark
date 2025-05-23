
import React from 'react';
import { Shield, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  onInfoClick: () => void;
}

export const AppHeader = ({ onInfoClick }: AppHeaderProps) => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="relative inline-block mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-200 via-cyan-300 to-slate-100 bg-clip-text text-transparent mb-4 relative">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Shield className="w-14 h-14 text-cyan-400 drop-shadow-lg" />
              <Zap className="w-4 h-4 text-blue-400 absolute -top-1 -right-1" />
            </div>
            ChatGPT Unmark
          </div>
        </h1>
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-full"></div>
      </div>
      
      <p className="text-xl text-slate-300 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
        Professionelle Entfernung von AI-Wasserzeichen und unsichtbaren Unicode-Zeichen
      </p>
      
      <div className="flex justify-center items-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onInfoClick}
          className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50 border border-slate-700 backdrop-blur-sm transition-all duration-200"
        >
          <Info className="w-4 h-4 mr-2" />
          Information
        </Button>
      </div>
    </div>
  );
};
