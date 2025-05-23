
import React, { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy, Trash2, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Unicode characters to clean with their descriptions and replacement rules
const UNICODE_CHARS = {
  '\u00A0': { name: 'No-Break Space', replaceWith: ' ' },
  '\u034F': { name: 'Combining Grapheme Joiner', replaceWith: '' },
  '\u061C': { name: 'Arabic Letter Mark', replaceWith: '' },
  '\u180E': { name: 'Mongolian Vowel Separator', replaceWith: '' },
  '\u200B': { name: 'Zero Width Space', replaceWith: '' },
  '\u200C': { name: 'Zero Width Non-Joiner', replaceWith: '' },
  '\u200D': { name: 'Zero Width Joiner', replaceWith: '' },
  '\u200E': { name: 'Left-to-Right Mark', replaceWith: '' },
  '\u200F': { name: 'Right-to-Left Mark', replaceWith: '' },
  '\u202A': { name: 'Left-to-Right Embedding', replaceWith: '' },
  '\u202B': { name: 'Right-to-Left Embedding', replaceWith: '' },
  '\u202C': { name: 'Pop Directional Formatting', replaceWith: '' },
  '\u202D': { name: 'Left-to-Right Override', replaceWith: '' },
  '\u202E': { name: 'Right-to-Left Override', replaceWith: '' },
  '\u202F': { name: 'Narrow No-Break Space', replaceWith: ' ' },
  '\u205F': { name: 'Medium Mathematical Space', replaceWith: ' ' },
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
  '\u3000': { name: 'Ideographic Space', replaceWith: ' ' },
  '\uFEFF': { name: 'Zero Width No-Break Space', replaceWith: '' },
  '\uFFA0': { name: 'Halfwidth Hangul Filler', replaceWith: '' },
  '\uFFFC': { name: 'Object Replacement Character', replaceWith: '' },
};

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [copiedRecently, setCopiedRecently] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-blue-600" />
            ChatGPT Unmark
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Entfernt unsichtbare Unicode-Zeichen aus Ihren Texten für eine saubere Formatierung
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Ursprungstext</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {stats.originalLength} Zeichen
                  </Badge>
                  {stats.invisibleCharsFound > 0 && (
                    <Badge variant="destructive" className="text-sm">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {stats.invisibleCharsFound} unsichtbare Zeichen
                    </Badge>
                  )}
                </div>
              </div>
              <Textarea
                placeholder="Fügen Sie hier Ihren Text ein, um ihn von unsichtbaren Unicode-Zeichen zu bereinigen..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </Card>

            {/* Output Section */}
            <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Bereinigter Text</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {stats.cleanedLength} Zeichen
                  </Badge>
                  {stats.charactersRemoved > 0 && (
                    <Badge variant="outline" className="text-sm text-green-700 border-green-300">
                      {stats.charactersRemoved} entfernt
                    </Badge>
                  )}
                </div>
              </div>
              <Textarea
                value={cleanedText}
                readOnly
                className="min-h-[200px] resize-none bg-slate-50 border-slate-200 cursor-text"
                placeholder="Der bereinigte Text erscheint hier..."
              />
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={copyToClipboard}
                  disabled={!cleanedText}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedRecently ? 'Kopiert!' : 'Kopieren'}
                </Button>
                <Button
                  onClick={downloadCleanedText}
                  disabled={!cleanedText}
                  variant="outline"
                  className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Herunterladen
                </Button>
                <Button
                  onClick={clearAll}
                  disabled={!inputText}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistiken</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Originalzeichen:</span>
                  <Badge variant="secondary">{stats.originalLength}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Bereinigte Zeichen:</span>
                  <Badge variant="secondary">{stats.cleanedLength}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Entfernte Zeichen:</span>
                  <Badge variant={stats.charactersRemoved > 0 ? "destructive" : "secondary"}>
                    {stats.charactersRemoved}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Unsichtbare Zeichen:</span>
                  <Badge variant={stats.invisibleCharsFound > 0 ? "destructive" : "secondary"}>
                    {stats.invisibleCharsFound}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Found Characters */}
            {hasInvisibleChars && (
              <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Gefundene unsichtbare Zeichen
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {foundChars.map((char, index) => (
                    <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono text-sm text-red-700">{char.code}</span>
                        <Badge variant="destructive" className="text-xs">
                          {char.count}×
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700">{char.name}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Info Card */}
            <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Information</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  Diese Anwendung erkennt und entfernt systematisch unsichtbare Unicode-Zeichen,
                  die häufig in kopierten Texten vorkommen.
                </p>
                <p>
                  Alle erkannten Zeichen werden entweder durch ein normales Leerzeichen ersetzt
                  oder vollständig entfernt, abhängig von ihrer typischen Verwendung.
                </p>
                <p className="font-medium text-slate-700">
                  Überwacht: {Object.keys(UNICODE_CHARS).length} verschiedene unsichtbare Zeichen
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
