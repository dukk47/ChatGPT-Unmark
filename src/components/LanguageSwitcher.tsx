
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-slate-400 hover:text-slate-300 hover:bg-slate-800/50 border border-slate-700 backdrop-blur-sm transition-all duration-200"
        >
          <Globe className="w-4 h-4 mr-2" />
          {t('language')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-900/95 border-slate-700 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => setLanguage('de')}
          className={`${language === 'de' ? 'bg-slate-800' : ''} hover:bg-slate-800 text-slate-300 hover:text-slate-200 cursor-pointer`}
        >
          {t('german')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`${language === 'en' ? 'bg-slate-800' : ''} hover:bg-slate-800 text-slate-300 hover:text-slate-200 cursor-pointer`}
        >
          {t('english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
