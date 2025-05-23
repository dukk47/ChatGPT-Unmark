
import React, { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useTextCleaner } from '@/hooks/useTextCleaner';
import { AppHeader } from '@/components/AppHeader';
import { AIWatermarkAlert } from '@/components/AIWatermarkAlert';
import { TextInputOutput } from '@/components/TextInputOutput';
import { ActionButtons } from '@/components/ActionButtons';
import { FoundCharacters } from '@/components/FoundCharacters';
import { InfoDialog } from '@/components/InfoDialog';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const { cleanedText, foundChars, stats } = useTextCleaner(inputText);

  // Group the found characters by category for better explanation
  const watermarkChars = useMemo(() => {
    return foundChars.filter(char => 
      ['\u200B', '\u200C', '\u200D', '\u202F'].includes(char.char)
    );
  }, [foundChars]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopiedRecently(true);
      toast.success('Bereinigter Text wurde in die Zwischenablage kopiert!');
      setTimeout(() => setCopiedRecently(false), 2000);
    } catch (err) {
      toast.error('Fehler beim Kopieren in die Zwischenablage');
    }
  }, [cleanedText]);

  const downloadCleanedText = useCallback(() => {
    const blob = new Blob([cleanedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Bereinigter Text wurde heruntergeladen!');
  }, [cleanedText]);

  const clearAll = useCallback(() => {
    setInputText('');
    toast.success('Text wurde gelöscht');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AppHeader 
          stats={stats} 
          onInfoClick={() => setShowInfoDialog(true)} 
        />

        <AIWatermarkAlert watermarkChars={watermarkChars} />

        <TextInputOutput 
          inputText={inputText}
          cleanedText={cleanedText}
          foundChars={foundChars}
          onInputChange={setInputText}
        />

        <ActionButtons 
          cleanedText={cleanedText}
          inputText={inputText}
          copiedRecently={copiedRecently}
          onCopy={copyToClipboard}
          onDownload={downloadCleanedText}
          onClear={clearAll}
        />

        <FoundCharacters foundChars={foundChars} />

        <InfoDialog 
          open={showInfoDialog} 
          onOpenChange={setShowInfoDialog} 
        />
      </div>
    </div>
  );
};

export default Index;
