
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
    <div className="flex justify-center gap-4 mb-8">
      <Button
        onClick={onCopy}
        disabled={!cleanedText}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Copy className="w-5 h-5 mr-2" />
        {copiedRecently ? '✅ Kopiert!' : '📋 Kopieren'}
      </Button>
      <Button
        onClick={onDownload}
        disabled={!cleanedText}
        variant="outline"
        className="bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-2 border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        <Download className="w-5 h-5 mr-2" />
        📥 Herunterladen
      </Button>
      <Button
        onClick={onClear}
        disabled={!inputText}
        variant="outline"
        className="bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border-2 border-red-200 hover:border-red-300 text-red-700 hover:text-red-800 px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        <Trash2 className="w-5 h-5 mr-2" />
        🗑️ Löschen
      </Button>
    </div>
  );
};
