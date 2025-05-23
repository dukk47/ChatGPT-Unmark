
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy, Trash2, FileText, AlertCircle, Info, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 mb-3 flex items-center justify-center gap-3">
            <Shield className="w-10 h-10 text-blue-600" />
            ChatGPT Unmark
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Entfernt unsichtbare Unicode-Zeichen und AI-Wasserzeichen aus Ihren Texten
          </p>
          
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowInfoDialog(true)}
              className="text-blue-600 border-blue-300 hover:bg-blue-50 flex gap-2 items-center"
            >
              <Info className="w-4 h-4" />
              Über AI-Wasserzeichen
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <Card className="overflow-hidden border-0 shadow-xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">Ursprungstext</CardTitle>
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
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  Fügen Sie hier Ihren Text ein, um AI-Wasserzeichen zu entfernen
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  placeholder="Fügen Sie hier Ihren Text ein, um ihn von unsichtbaren Unicode-Zeichen zu bereinigen..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[240px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none bg-transparent text-slate-700 dark:text-slate-200"
                />
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="overflow-hidden border-0 shadow-xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">Bereinigter Text</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {stats.cleanedLength} Zeichen
                    </Badge>
                    {stats.charactersRemoved > 0 && (
                      <Badge variant="outline" className="text-sm text-green-700 border-green-300 dark:text-green-500 dark:border-green-800">
                        {stats.charactersRemoved} entfernt
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  Ihr Text ohne unsichtbare Zeichen und Wassermarken
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  value={cleanedText}
                  readOnly
                  className="min-h-[240px] resize-none border-0 rounded-none focus:ring-0 focus:border-0 shadow-none bg-transparent text-slate-700 dark:text-slate-200"
                  placeholder="Der bereinigte Text erscheint hier..."
                />
              </CardContent>
              
              {/* Action Buttons */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-3 bg-white dark:bg-slate-900/90">
                <Button
                  onClick={copyToClipboard}
                  disabled={!cleanedText}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedRecently ? 'Kopiert!' : 'Kopieren'}
                </Button>
                <Button
                  onClick={downloadCleanedText}
                  disabled={!cleanedText}
                  variant="outline"
                  className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Herunterladen
                </Button>
                <Button
                  onClick={clearAll}
                  disabled={!inputText}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Watermark Alert - only show if watermarking chars found */}
            {hasWatermarkChars && (
              <Card className="overflow-hidden border-0 shadow-xl shadow-red-900/5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-red-900">
                <CardHeader className="border-b border-red-100 dark:border-red-800 bg-white/50 dark:bg-slate-900/20">
                  <CardTitle className="text-lg font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    AI-Wasserzeichen entdeckt
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    In Ihrem Text wurden spezifische Zeichen gefunden, die häufig als AI-Wasserzeichen verwendet werden:
                  </p>
                  <div className="space-y-2">
                    {watermarkChars.map((char, index) => (
                      <div key={index} className="p-2 bg-red-100 dark:bg-red-900/50 rounded flex justify-between items-center">
                        <span className="font-mono text-sm text-red-700 dark:text-red-300">{char.code}</span>
                        <Badge variant="destructive" className="text-xs">
                          {char.count}×
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            <Card className="overflow-hidden border-0 shadow-xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Originalzeichen:</span>
                  <Badge variant="secondary">{stats.originalLength}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Bereinigte Zeichen:</span>
                  <Badge variant="secondary">{stats.cleanedLength}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Entfernte Zeichen:</span>
                  <Badge variant={stats.charactersRemoved > 0 ? "destructive" : "secondary"}>
                    {stats.charactersRemoved}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Unsichtbare Zeichen:</span>
                  <Badge variant={stats.invisibleCharsFound > 0 ? "destructive" : "secondary"}>
                    {stats.invisibleCharsFound}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Found Characters */}
            {hasInvisibleChars && (
              <Card className="overflow-hidden border-0 shadow-xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                  <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Gefundene unsichtbare Zeichen
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {foundChars.map((char, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border ${
                          ['\u200B', '\u200C', '\u200D', '\u202F'].includes(char.char)
                            ? "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-900" 
                            : "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-mono text-sm text-red-700 dark:text-red-400">{char.code}</span>
                          <Badge 
                            variant={['\u200B', '\u200C', '\u200D', '\u202F'].includes(char.char) ? "destructive" : "outline"}
                            className="text-xs"
                          >
                            {char.count}×
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{char.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card className="overflow-hidden border-0 shadow-xl shadow-blue-900/5 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <p>
                    Diese Anwendung erkennt und entfernt systematisch unsichtbare Unicode-Zeichen,
                    die als KI-Wasserzeichen eingesetzt werden können.
                  </p>
                  <p>
                    Alle erkannten Zeichen werden entsprechend ihrer typischen Verwendung behandelt:
                    Leerzeichen werden normalisiert, unsichtbare Formatierungszeichen entfernt.
                  </p>
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    Überwacht: {Object.keys(UNICODE_CHARS).length} verschiedene Unicode-Zeichen
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Information Dialog about AI Watermarking */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Über AI-Wasserzeichen in Texten</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Wie moderne KI-Systeme Texte mit unsichtbaren Markierungen versehen
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              OpenAI hat in Experimenten unsichtbare Unicode-Zeichen als Wasserzeichen getestet. 
              Dabei werden bestimmte Codepoints strategisch in den generierten Text eingeschleust.
            </p>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900">
                <div className="font-semibold mb-1 text-blue-800 dark:text-blue-300">U+200B Zero Width Space (ZWSP)</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Wird nach Wörtern oder Satzzeichen eingefügt, nimmt keine Breite ein und übersteht Copy-Paste fast unversehrt.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900">
                <div className="font-semibold mb-1 text-blue-800 dark:text-blue-300">U+200C Zero Width Non-Joiner (ZWNJ)</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Verhindert Ligaturen zwischen Buchstaben, bleibt dabei unsichtbar und trägt zur Kodierung bei.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900">
                <div className="font-semibold mb-1 text-blue-800 dark:text-blue-300">U+200D Zero Width Joiner (ZWJ)</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Erzwingt Ligaturen, dient aber hier als zusätzlicher, unsichtbarer Marker.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900">
                <div className="font-semibold mb-1 text-blue-800 dark:text-blue-300">U+202F Narrow No-Break Space (NNBSP)</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sieht aus wie ein normales Leerzeichen, ist aber enger und hat einen anderen Codepoint – in Tests systematisch verteilt im Text.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300">
              Diese Zeichen werden so platziert, dass sie für Menschen unsichtbar bleiben, aber per Skript leicht detektierbar sind. 
              Copy-Paste-Vorgänge in Texteditoren entfernen sie meist nicht, wodurch der Wasserzeichen-Marker auch in exportierten 
              Dokumenten bestehen bleibt.
            </p>
            
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              ChatGPT Unmark hilft Ihnen, diese unsichtbaren Markierungen aufzuspüren und zu entfernen.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
