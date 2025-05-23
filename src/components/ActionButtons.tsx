
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActionButtonsProps {
  cleanedText: string;
  inputText: string;
  copiedRecently: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export const ActionButtons = ({ 
  cleanedText, 
  inputText, 
  copiedRecently, 
  onCopy, 
  onDownload, 
  onClear 
}: ActionButtonsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      <Button
        onClick={onCopy}
        disabled={!cleanedText}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
      >
        <Copy className="w-5 h-5 mr-2" />
        {copiedRecently ? t('copied') : t('copy')}
      </Button>
      <Button
        onClick={onDownload}
        disabled={!cleanedText}
        variant="outline"
        className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 hover:border-slate-500 text-slate-200 hover:text-slate-100 px-6 py-3 font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
      >
        <Download className="w-5 h-5 mr-2" />
        {t('download')}
      </Button>
      <Button
        onClick={onClear}
        disabled={!inputText}
        variant="outline"
        className="bg-red-950/30 hover:bg-red-900/40 border border-red-800 hover:border-red-700 text-red-300 hover:text-red-200 px-6 py-3 font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
      >
        <Trash2 className="w-5 h-5 mr-2" />
        {t('clear')}
      </Button>
    </div>
  );
};
