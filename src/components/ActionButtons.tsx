
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy, Trash2 } from 'lucide-react';

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
  return (
    <div className="flex justify-center gap-3 mb-6">
      <Button
        onClick={onCopy}
        disabled={!cleanedText}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Copy className="w-4 h-4 mr-2" />
        {copiedRecently ? 'Kopiert!' : 'Kopieren'}
      </Button>
      <Button
        onClick={onDownload}
        disabled={!cleanedText}
        variant="outline"
      >
        <Download className="w-4 h-4 mr-2" />
        Herunterladen
      </Button>
      <Button
        onClick={onClear}
        disabled={!inputText}
        variant="outline"
        className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Löschen
      </Button>
    </div>
  );
};
