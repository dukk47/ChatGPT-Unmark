
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { useTextCleaner } from '@/hooks/useTextCleaner';
import { AppHeader } from '@/components/AppHeader';
import { AIWatermarkAlert } from '@/components/AIWatermarkAlert';
import { TextInputOutput, TextInputOutputRef } from '@/components/TextInputOutput';
import { ActionButtons } from '@/components/ActionButtons';
import { FoundCharacters } from '@/components/FoundCharacters';
import { InfoDialog } from '@/components/InfoDialog';
import { useLanguage } from '@/contexts/LanguageContext';

export const MainContent = () => {
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
    <>
      <AppHeader 
        onInfoClick={() => setShowInfoDialog(true)} 
      />

      <AIWatermarkAlert 
        watermarkChars={watermarkChars} 
        onShowInText={handleShowWatermarksInText}
      />

      <div className="space-y-8">
        <div className={`grid gap-8 transition-all duration-1000 ease-in-out ${
          foundChars.length > 0 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          <div className={`transition-all duration-1000 ease-in-out transform ${
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
            <div className="lg:col-span-1 transition-all duration-1000 ease-in-out transform animate-in slide-in-from-right-8 fade-in scale-in opacity-0 animate-delay-300">
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
    </>
  );
};
