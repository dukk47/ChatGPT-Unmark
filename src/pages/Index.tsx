
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
      toast.success('Bereinigter Text erfolgreich kopiert');
      setTimeout(() => setCopiedRecently(false), 2000);
    } catch (err) {
      toast.error('Fehler beim Kopieren');
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
    toast.success('Download gestartet');
  }, [cleanedText]);

  const clearAll = useCallback(() => {
    setInputText('');
    toast.success('Text gelöscht');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <AppHeader 
          stats={stats} 
          onInfoClick={() => setShowInfoDialog(true)} 
        />

        <AIWatermarkAlert watermarkChars={watermarkChars} />

        <div className="space-y-8">
          <TextInputOutput 
            inputText={inputText}
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
        </div>

        <InfoDialog 
          open={showInfoDialog} 
          onOpenChange={setShowInfoDialog} 
        />
      </div>
    </div>
  );
};

export default Index;
