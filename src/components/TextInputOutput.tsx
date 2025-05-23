import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface TextInputOutputProps {
  inputText: string;
  onInputChange: (value: string) => void;
  stats: {
    originalLength: number;
    cleanedLength: number;
    charactersRemoved: number;
    invisibleCharsFound: number;
  };
  highlightWatermarks?: boolean;
  watermarkChars?: { char: string; count: number; name: string; code: string }[];
  highlightedChar?: string;
}

export interface TextInputOutputRef {
  scrollToWatermarks: () => void;
  scrollToCharacter: (char: string) => void;
}

export const TextInputOutput = forwardRef<TextInputOutputRef, TextInputOutputProps>(
  ({ inputText, onInputChange, stats, highlightWatermarks = false, watermarkChars = [], highlightedChar }, ref) => {
    const { t } = useLanguage();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToWatermarks: () => {
        if (textareaRef.current && watermarkChars.length > 0) {
          // Find first watermark character position
          const firstWatermarkChar = watermarkChars[0].char;
          const position = inputText.indexOf(firstWatermarkChar);
          
          if (position !== -1) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(position, position + 1);
            textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      },
      scrollToCharacter: (char: string) => {
        if (textareaRef.current) {
          const position = inputText.indexOf(char);
          
          if (position !== -1) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(position, position + 1);
            textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }));

    const renderTextWithHighlights = () => {
      const shouldHighlight = highlightWatermarks || highlightedChar;
      
      if (!shouldHighlight) {
        return (
          <Textarea
            ref={textareaRef}
            placeholder={t('input.placeholder')}
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            spellCheck={false}
            className="min-h-[400px] resize-none border-0 bg-slate-800/30 text-slate-200 placeholder:text-slate-500 focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 backdrop-blur-sm"
          />
        );
      }

      // Create highlighted version in overlay
      let highlightedText = inputText;
      
      if (highlightWatermarks && watermarkChars.length > 0) {
        watermarkChars.forEach(({ char }) => {
          const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          highlightedText = highlightedText.replace(regex, `<mark class="bg-red-500/30 text-red-200">${char}</mark>`);
        });
      }
      
      if (highlightedChar) {
        const regex = new RegExp(highlightedChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        highlightedText = highlightedText.replace(regex, `<mark class="bg-blue-500/30 text-blue-200">${highlightedChar}</mark>`);
      }

      return (
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder={t('input.placeholder')}
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            spellCheck={false}
            className="min-h-[400px] resize-none border-0 bg-slate-800/30 text-slate-200 placeholder:text-slate-500 focus:ring-0 focus:border-0 shadow-none text-base leading-relaxed p-6 backdrop-blur-sm relative z-10"
          />
          <div 
            className="absolute inset-0 p-6 text-base leading-relaxed pointer-events-none whitespace-pre-wrap break-words overflow-hidden text-transparent"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
      );
    };

    return (
      <div className="mb-8">
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-2xl group hover:shadow-cyan-500/10 transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
                  {t('input.title')}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t('input.description')}
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 border-slate-700 px-3 py-1 font-medium backdrop-blur-sm">
                  {stats.originalLength} {t('input.characters')}
                </Badge>
                {stats.charactersRemoved > 0 && (
                  <Badge variant="destructive" className="bg-red-900/30 text-red-300 border-red-700 px-3 py-1 font-medium backdrop-blur-sm">
                    {stats.charactersRemoved} {t('input.removed')}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {renderTextWithHighlights()}
          </CardContent>
        </Card>
      </div>
    );
  }
);

TextInputOutput.displayName = 'TextInputOutput';
