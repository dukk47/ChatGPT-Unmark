import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy, Trash2, AlertCircle, Info, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Unicode characters to clean with their descriptions and replacement rules
const UNICODE_CHARS = {
  // White_Space = yes characters (25 characters)
  '\u0009': { name: 'Character Tabulation (HT)', replaceWith: '\t' },
  '\u000A': { name: 'Line Feed (LF)', replaceWith: '\n' },
  '\u000B': { name: 'Line Tabulation (VT)', replaceWith: ' ' },
  '\u000C': { name: 'Form Feed (FF)', replaceWith: ' ' },
  '\u000D': { name: 'Carriage Return (CR)', replaceWith: '\r' },
  '\u0020': { name: 'Space', replaceWith: ' ' },
  '\u0085': { name: 'Next Line (NEL)', replaceWith: '\n' },
  '\u00A0': { name: 'No-Break Space (NBSP)', replaceWith: ' ' },
  '\u1680': { name: 'Ogham Space Mark', replaceWith: ' ' },
  '\u2000': { name: 'En Quad', replaceWith: ' ' },
  '\u2001': { name: 'Em Quad', replaceWith: ' ' },
  '\u2002': { name: 'En Space', replaceWith: ' ' },
  '\u2003': { name: 'Em Space', replaceWith: ' ' },
  '\u2004': { name: 'Three-Per-Em Space', replaceWith: ' ' },
  '\u2005': { name: 'Four-Per-Em Space', replaceWith: ' ' },
  '\u2006': { name: 'Six-Per-Em Space', replaceWith: ' ' },
  '\u2007': { name: 'Figure Space', replaceWith: ' ' },
  '\u2008': { name: 'Punctuation Space', replaceWith: ' ' },
  '\u2009': { name: 'Thin Space', replaceWith: ' ' },
  '\u200A': { name: 'Hair Space', replaceWith: ' ' },
  '\u2028': { name: 'Line Separator', replaceWith: '\n' },
  '\u2029': { name: 'Paragraph Separator', replaceWith: '\n\n' },
  '\u202F': { name: 'Narrow No-Break Space (NNBSP)', replaceWith: ' ' },
  '\u205F': { name: 'Medium Mathematical Space (MMSP)', replaceWith: ' ' },
  '\u3000': { name: 'Ideographic Space', replaceWith: ' ' },
  
  // Additional invisible formatting characters (White_Space = no)
  '\u180E': { name: 'Mongolian Vowel Separator (MVS)', replaceWith: '' },
  '\u200B': { name: 'Zero Width Space (ZWSP)', replaceWith: '' },
  '\u200C': { name: 'Zero Width Non-Joiner (ZWNJ)', replaceWith: '' },
  '\u200D': { name: 'Zero Width Joiner (ZWJ)', replaceWith: '' },
  
  // Additional characters from the original list
  '\u034F': { name: 'Combining Grapheme Joiner', replaceWith: '' },
  '\u061C': { name: 'Arabic Letter Mark', replaceWith: '' },
  '\u200E': { name: 'Left-to-Right Mark', replaceWith: '' },
  '\u200F': { name: 'Right-to-Left Mark', replaceWith: '' },
  '\u202A': { name: 'Left-to-Right Embedding', replaceWith: '' },
  '\u202B': { name: 'Right-to-Left Embedding', replaceWith: '' },
  '\u202C': { name: 'Pop Directional Formatting', replaceWith: '' },
  '\u202D': { name: 'Left-to-Right Override', replaceWith: '' },
  '\u202E': { name: 'Right-to-Left Override', replaceWith: '' },
  '\u2060': { name: 'Word Joiner', replaceWith: '' },
  '\u2061': { name: 'Function Application', replaceWith: '' },
  '\u2062': { name: 'Invisible Times', replaceWith: '' },
  '\u2063': { name: 'Invisible Separator', replaceWith: '' },
  '\u2064': { name: 'Invisible Plus', replaceWith: '' },
  '\u2065': { name: 'Invisible Plus', replaceWith: '' },
  '\u2066': { name: 'Left-to-Right Isolate', replaceWith: '' },
  '\u2067': { name: 'Right-to-Left Isolate', replaceWith: '' },
  '\u2068': { name: 'First Strong Isolate', replaceWith: '' },
  '\u2069': { name: 'Pop Directional Isolate', replaceWith: '' },
  '\u206A': { name: 'Inhibit Symmetric Swapping', replaceWith: '' },
  '\u206B': { name: 'Activate Symmetric Swapping', replaceWith: '' },
  '\u206C': { name: 'Inhibit Arabic Form Shaping', replaceWith: '' },
  '\u206D': { name: 'Activate Arabic Form Shaping', replaceWith: '' },
  '\u206E': { name: 'National Digit Shapes', replaceWith: '' },
  '\u206F': { name: 'Nominal Digit Shapes', replaceWith: '' },
  '\u2800': { name: 'Braille Pattern Blank', replaceWith: ' ' },
  '\uFEFF': { name: 'Zero Width No-Break Space', replaceWith: '' },
  '\uFFA0': { name: 'Halfwidth Hangul Filler', replaceWith: '' },
  '\uFFFC': { name: 'Object Replacement Character', replaceWith: '' },
};

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  // Clean text and analyze invisible characters
  const { cleanedText, foundChars, stats } = useMemo(() => {
    let cleaned = inputText;
    const found: { char: string; count: number; name: string; code: string }[] = [];
    
    Object.entries(UNICODE_CHARS).forEach(([char, info]) => {
      const regex = new RegExp(char, 'g');
      const matches = inputText.match(regex);
      if (matches) {
        found.push({
          char,
          count: matches.length,
          name: info.name,
          code: `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`
        });
        cleaned = cleaned.replace(regex, info.replaceWith);
      }
    });

    return {
      cleanedText: cleaned,
      foundChars: found,
      stats: {
        originalLength: inputText.length,
        cleanedLength: cleaned.length,
        charactersRemoved: inputText.length - cleaned.length,
        invisibleCharsFound: found.reduce((sum, char) => sum + char.count, 0)
      }
    };
  }, [inputText]);

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

  const hasInvisibleChars = foundChars.length > 0;
  
  // Group the found characters by category for better explanation
  const watermarkChars = useMemo(() => {
    return foundChars.filter(char => 
      ['\u200B', '\u200C', '\u200D', '\u202F'].includes(char.char)
    );
  }, [foundChars]);

  const hasWatermarkChars = watermarkChars.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Simplified Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            ChatGPT Unmark
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Entfernt AI-Wasserzeichen und unsichtbare Unicode-Zeichen aus Texten
          </p>
          
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{stats.originalLength} Zeichen</Badge>
              {stats.charactersRemoved > 0 && (
                <Badge variant="destructive">{stats.charactersRemoved} entfernt</Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowInfoDialog(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Info className="w-4 h-4 mr-1" />
              Info
            </Button>
          </div>
        </div>

        {/* AI Watermark Alert - only show if found */}
        {hasWatermarkChars && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:border-red-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800 dark:text-red-300">
                AI-Wasserzeichen entdeckt
              </span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mb-2">
              Ihr Text enthält spezifische Zeichen, die als AI-Wasserzeichen verwendet werden.
            </p>
            <div className="flex gap-2 flex-wrap">
              {watermarkChars.map((char, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {char.code} ({char.count}×)
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Main Content - Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input */}
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Ursprungstext</CardTitle>
              <CardDescription>
                Fügen Sie hier Ihren Text ein
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Textarea
                placeholder="Text hier einfügen..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Bereinigter Text</CardTitle>
              <CardDescription>
                Text ohne unsichtbare Zeichen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Textarea
                value={cleanedText}
                readOnly
                className="min-h-[300px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none bg-slate-50 dark:bg-slate-800"
                placeholder="Bereinigter Text erscheint hier..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            onClick={copyToClipboard}
            disabled={!cleanedText}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copiedRecently ? 'Kopiert!' : 'Kopieren'}
          </Button>
          <Button
            onClick={downloadCleanedText}
            disabled={!cleanedText}
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Herunterladen
          </Button>
          <Button
            onClick={clearAll}
            disabled={!inputText}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Löschen
          </Button>
        </div>

        {/* Found Characters - Collapsible */}
        {hasInvisibleChars && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Gefundene unsichtbare Zeichen
                <Badge variant="secondary">{foundChars.length} Typen</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {foundChars.map((char, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded"
                  >
                    <div>
                      <span className="font-mono text-sm font-semibold">{char.code}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{char.name}</p>
                    </div>
                    <Badge variant="outline">{char.count}×</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Information Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
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
    </div>
  );
};

export default Index;
