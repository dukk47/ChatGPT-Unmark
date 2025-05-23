
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoDialog = ({ open, onOpenChange }: InfoDialogProps) => {
  const { t } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-slate-900/95 border-slate-700 backdrop-blur-sm shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent flex items-center justify-center gap-2">
            {t('aboutWatermarks')}
          </DialogTitle>
          <DialogDescription className="text-lg text-slate-300">
            {t('watermarksSubtitle')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-slate-300">
            {t('watermarksExplanation')}
          </p>
          
          <div className="space-y-4">
            <div className="p-5 bg-slate-800/30 rounded-lg border border-slate-700 backdrop-blur-sm">
              <div className="font-bold mb-2 text-cyan-300 text-lg">U+200B {t('zwspTitle')}</div>
              <p className="text-slate-400">
                {t('zwspDescription')}
              </p>
            </div>
            
            <div className="p-5 bg-slate-800/30 rounded-lg border border-slate-700 backdrop-blur-sm">
              <div className="font-bold mb-2 text-indigo-300 text-lg">U+200C/D {t('zwnjTitle')}</div>
              <p className="text-slate-400">
                {t('zwnjDescription')}
              </p>
            </div>
            
            <div className="p-5 bg-slate-800/30 rounded-lg border border-slate-700 backdrop-blur-sm">
              <div className="font-bold mb-2 text-emerald-300 text-lg">U+202F {t('nnbspTitle')}</div>
              <p className="text-slate-400">
                {t('nnbspDescription')}
              </p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600 backdrop-blur-sm">
            <p className="font-bold text-xl text-center text-slate-200">
              {t('conclusionText')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
