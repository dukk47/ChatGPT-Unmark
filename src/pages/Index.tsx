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
import { CookieBanner } from '@/components/CookieBanner';
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

        {/* Refined Footer - less blinking, more professional */}
        <footer className="mt-20 pt-12 relative">
          {/* Subtle gradient divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600/40 to-transparent"></div>
          
          {/* Gentle ambient glow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-gradient-to-b from-cyan-500/3 to-transparent blur-3xl pointer-events-none"></div>
          
          <div className="text-center space-y-8 relative">
            {/* AI Notice with refined styling */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-lg blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-slate-900/60 backdrop-blur border border-slate-700/40 rounded-lg p-6 hover:border-slate-600/60 hover:bg-slate-900/70 transition-all duration-500">
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  <span className="text-cyan-400 mr-2">✨</span>
                  {t('aiGeneratedNotice')}
                </p>
              </div>
            </div>
            
            {/* Professional promotional section */}
            <div className="space-y-6">
              <div className="group">
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto group-hover:text-slate-300 transition-colors duration-500">
                  {t('promotionalText')}
                </p>
              </div>
              
              {/* Call-to-action button with subtle effects */}
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <a 
                  href="https://diesdas.koeln" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <span className="text-sm">{t('contactMe')}</span>
                  <span className="text-base transform transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>
            
            {/* Clean impressum link */}
            <div className="pt-8 border-t border-slate-800/30">
              <Link 
                to="/impressum" 
                className="inline-block text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300 relative group"
              >
                <span className="relative z-10">{t('impressum')}</span>
                <div className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default Index;
