
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
      <Button
        variant={language === 'de' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('de')}
        className={language === 'de' ? 
          'bg-cyan-600 hover:bg-cyan-500 text-white' : 
          'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
        }
      >
        DE
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 
          'bg-cyan-600 hover:bg-cyan-500 text-white' : 
          'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
        }
      >
        EN
      </Button>
    </div>
  );
};
