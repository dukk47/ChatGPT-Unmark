
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoDialog = ({ open, onOpenChange }: InfoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Über AI-Wasserzeichen</DialogTitle>
          <DialogDescription>
            Wie KI-Systeme Texte mit unsichtbaren Markierungen versehen
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            OpenAI hat in Experimenten unsichtbare Unicode-Zeichen als Wasserzeichen getestet. 
            Diese werden strategisch in generierten Text eingeschleust.
          </p>
          
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-950/40">
              <div className="font-semibold mb-1">U+200B Zero Width Space (ZWSP)</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Wird nach Wörtern eingefügt, nimmt keine Breite ein.
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-950/40">
              <div className="font-semibold mb-1">U+200C/D Zero Width (Non-)Joiner</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Kontrolliert Ligaturen, bleibt unsichtbar.
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-950/40">
              <div className="font-semibold mb-1">U+202F Narrow No-Break Space</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sieht wie normales Leerzeichen aus, hat aber anderen Codepoint.
              </p>
            </div>
          </div>
          
          <p className="font-semibold">
            ChatGPT Unmark erkennt und entfernt diese unsichtbaren Markierungen zuverlässig.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
