
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const RemoveInvisibleCharacters = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-cyan-400 hover:text-cyan-300 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backButton')}
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-200 via-cyan-300 to-slate-100 bg-clip-text text-transparent mb-4">
            Remove Invisible Characters from Text
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Detect and remove hidden Unicode characters that can cause formatting issues
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <EyeOff className="w-6 h-6 mr-2 text-cyan-400" />
              What are Invisible Characters?
            </h2>
            <p className="text-slate-300 mb-4">
              Invisible characters are Unicode symbols that don't display visually but can affect text processing, copying, and formatting. These hidden characters include:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Zero Width Space (U+200B)</li>
              <li>• Zero Width Non-Joiner (U+200C)</li>
              <li>• Zero Width Joiner (U+200D)</li>
              <li>• Narrow No-Break Space (U+202F)</li>
              <li>• And many more...</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-green-400" />
              Why Remove Invisible Characters?
            </h2>
            <div className="text-slate-300 space-y-3">
              <p>Invisible characters can cause various problems:</p>
              <ul className="ml-4 space-y-2">
                <li>• Text formatting issues in documents</li>
                <li>• Copy-paste problems between applications</li>
                <li>• Database insertion errors</li>
                <li>• SEO and web content issues</li>
                <li>• Programming and code compilation errors</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              How Our Tool Works
            </h2>
            <div className="text-slate-300 space-y-3">
              <p>Our invisible character remover:</p>
              <ul className="ml-4 space-y-2">
                <li>• Scans your text for all types of invisible Unicode characters</li>
                <li>• Highlights found characters for easy identification</li>
                <li>• Removes unwanted invisible characters instantly</li>
                <li>• Preserves legitimate formatting and structure</li>
                <li>• Works completely in your browser - no data sent to servers</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-400" />
              Common Sources of Invisible Characters
            </h2>
            <div className="text-slate-300 space-y-3">
              <p>Invisible characters often come from:</p>
              <ul className="ml-4 space-y-2">
                <li>• AI-generated text (ChatGPT, Claude, etc.)</li>
                <li>• Copy-pasting from websites and PDFs</li>
                <li>• Microsoft Word and other word processors</li>
                <li>• Web forms and online editors</li>
                <li>• Character encoding issues</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Ready to Clean Your Text?
            </h3>
            <p className="text-slate-300 mb-6">
              Use our free invisible character remover to clean your text instantly
            </p>
            <Link to="/">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3">
                Start Cleaning Text
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
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

export default RemoveInvisibleCharacters;
