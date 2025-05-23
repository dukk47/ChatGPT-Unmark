
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useTextCleaner } from '@/hooks/useTextCleaner';
import { AppHeader } from '@/components/AppHeader';
import { AIWatermarkAlert } from '@/components/AIWatermarkAlert';
import { TextInputOutput, TextInputOutputRef } from '@/components/TextInputOutput';
import { ActionButtons } from '@/components/ActionButtons';
import { FoundCharacters } from '@/components/FoundCharacters';
import { InfoDialog } from '@/components/InfoDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [highlightWatermarks, setHighlightWatermarks] = useState(false);
  const [highlightedChar, setHighlightedChar] = useState<string>('');
  
  const textInputRef = useRef<TextInputOutputRef>(null);

  const { cleanedText, foundChars, stats } = useTextCleaner(inputText);

  // Group the found characters by category for better explanation
  const watermarkChars = useMemo(() => {
    return foundChars.filter(char => 
      ['\u200B', '\u200C', '\u200D', '\u202F'].includes(char.char)
    );
  }, [foundChars]);

  const handleShowWatermarksInText = useCallback(() => {
    setHighlightWatermarks(true);
    setHighlightedChar('');
    setTimeout(() => {
      textInputRef.current?.scrollToWatermarks();
    }, 100);
    toast.success(t('watermarksHighlighted'));
  }, [t]);

  const handleCharacterClick = useCallback((char: string) => {
    setHighlightedChar(char);
    setHighlightWatermarks(false);
    setTimeout(() => {
      textInputRef.current?.scrollToCharacter(char);
    }, 100);
    toast.success(t('charactersHighlighted'));
  }, [t]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopiedRecently(true);
      toast.success(t('textCopied'));
      setTimeout(() => setCopiedRecently(false), 2000);
    } catch (err) {
      toast.error(t('copyError'));
    }
  }, [cleanedText, t]);

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
    toast.success(t('downloadStarted'));
  }, [cleanedText, t]);

  const clearAll = useCallback(() => {
    setInputText('');
    setHighlightWatermarks(false);
    setHighlightedChar('');
    toast.success(t('textCleared'));
  }, [t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <AppHeader 
          onInfoClick={() => setShowInfoDialog(true)} 
        />

        <AIWatermarkAlert 
          watermarkChars={watermarkChars} 
          onShowInText={handleShowWatermarksInText}
        />

        <div className="space-y-8">
          <div className={`grid gap-8 transition-all duration-500 ease-in-out ${
            foundChars.length > 0 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
          }`}>
            <div className={`transition-all duration-500 ease-in-out ${
              foundChars.length > 0 ? 'lg:col-span-2' : 'col-span-1'
            }`}>
              <TextInputOutput 
                ref={textInputRef}
                inputText={inputText}
                onInputChange={setInputText}
                stats={stats}
                highlightWatermarks={highlightWatermarks}
                watermarkChars={watermarkChars}
                highlightedChar={highlightedChar}
              />
            </div>
            {foundChars.length > 0 && (
              <div className="lg:col-span-1 transition-all duration-500 ease-in-out animate-fade-in">
                <FoundCharacters 
                  foundChars={foundChars} 
                  onCharacterClick={handleCharacterClick}
                />
              </div>
            )}
          </div>

          <ActionButtons 
            cleanedText={cleanedText}
            inputText={inputText}
            copiedRecently={copiedRecently}
            onCopy={copyToClipboard}
            onDownload={downloadCleanedText}
            onClear={clearAll}
          />
        </div>

        <InfoDialog 
          open={showInfoDialog} 
          onOpenChange={setShowInfoDialog} 
        />

        {/* Footer with Impressum link */}
        <footer className="mt-16 pt-8 border-t border-slate-800/50">
          <div className="text-center">
            <Link 
              to="/impressum" 
              className="text-xs text-slate-500 hover:text-slate-400 transition-colors duration-200 underline"
            >
              {t('impressum')}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
