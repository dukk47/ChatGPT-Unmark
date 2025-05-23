
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoDialog = ({ open, onOpenChange }: InfoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-3xl bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-800/50 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            🔍 Über AI-Wasserzeichen
          </DialogTitle>
          <DialogDescription className="text-lg text-slate-600 dark:text-slate-300">
            ✨ Wie KI-Systeme Texte mit unsichtbaren Markierungen versehen
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
            🤖 OpenAI hat in Experimenten unsichtbare Unicode-Zeichen als Wasserzeichen getestet. 
            Diese werden strategisch in generierten Text eingeschleust.
          </p>
          
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 shadow-md">
              <div className="font-bold mb-2 text-blue-800 dark:text-blue-300 text-lg">🌐 U+200B Zero Width Space (ZWSP)</div>
              <p className="text-blue-700 dark:text-blue-400">
                Wird nach Wörtern eingefügt, nimmt keine Breite ein. Völlig unsichtbar! 👻
              </p>
            </div>
            
            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl dark:from-purple-950/40 dark:to-pink-950/40 border border-purple-200 dark:border-purple-800 shadow-md">
              <div className="font-bold mb-2 text-purple-800 dark:text-purple-300 text-lg">🔗 U+200C/D Zero Width (Non-)Joiner</div>
              <p className="text-purple-700 dark:text-purple-400">
                Kontrolliert Ligaturen, bleibt unsichtbar. Clevere Taktik! 🎭
              </p>
            </div>
            
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl dark:from-green-950/40 dark:to-emerald-950/40 border border-green-200 dark:border-green-800 shadow-md">
              <div className="font-bold mb-2 text-green-800 dark:text-green-300 text-lg">📏 U+202F Narrow No-Break Space</div>
              <p className="text-green-700 dark:text-green-400">
                Sieht wie normales Leerzeichen aus, hat aber anderen Codepoint. Getarnt! 🥸
              </p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800 shadow-lg">
            <p className="font-bold text-xl text-center text-yellow-800 dark:text-yellow-300">
              ✨ ChatGPT Unmark erkennt und entfernt diese unsichtbaren Markierungen zuverlässig! 🎯
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
