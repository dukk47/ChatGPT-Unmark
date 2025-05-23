
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CleanChatgptText = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
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
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-200 via-green-300 to-slate-100 bg-clip-text text-transparent mb-4">
            Clean ChatGPT Text & Remove GPT Watermarks
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Remove AI watermarks and invisible tracking characters from ChatGPT generated content
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Bot className="w-6 h-6 mr-2 text-green-400" />
              What are ChatGPT Watermarks?
            </h2>
            <p className="text-slate-300 mb-4">
              ChatGPT and other AI language models may embed invisible watermarks in their generated text. These watermarks use hidden Unicode characters to identify AI-generated content.
            </p>
            <div className="bg-slate-800/50 border border-slate-600 rounded p-4 mt-4">
              <h3 className="text-lg font-medium text-slate-200 mb-2">Common AI Watermark Characters:</h3>
              <ul className="text-slate-300 space-y-1 ml-4">
                <li>• Zero Width Space (ZWSP) - U+200B</li>
                <li>• Zero Width Non-Joiner - U+200C</li>
                <li>• Zero Width Joiner - U+200D</li>
                <li>• Narrow No-Break Space - U+202F</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
              Why Clean ChatGPT Text?
            </h2>
            <div className="text-slate-300 space-y-3">
              <p>Removing AI watermarks is important for:</p>
              <ul className="ml-4 space-y-2">
                <li>• <strong>Privacy:</strong> Prevent detection of AI assistance</li>
                <li>• <strong>Formatting:</strong> Avoid text display issues</li>
                <li>• <strong>Compatibility:</strong> Ensure text works in all applications</li>
                <li>• <strong>Professional use:</strong> Clean text for business documents</li>
                <li>• <strong>Academic work:</strong> Remove traces of AI assistance</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-400" />
              How Our ChatGPT Cleaner Works
            </h2>
            <div className="text-slate-300 space-y-3">
              <p>Our tool specifically targets ChatGPT and AI watermarks:</p>
              <ol className="ml-4 space-y-2 list-decimal">
                <li>Paste your ChatGPT-generated text</li>
                <li>Our tool scans for invisible AI watermark characters</li>
                <li>All detected watermarks are highlighted and identified</li>
                <li>Click to remove all watermarks instantly</li>
                <li>Download or copy your clean, watermark-free text</li>
              </ol>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-cyan-400" />
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">Detection:</h3>
                <ul className="space-y-1">
                  <li>• Real-time watermark detection</li>
                  <li>• Visual highlighting of hidden characters</li>
                  <li>• Character count and statistics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">Privacy:</h3>
                <ul className="space-y-1">
                  <li>• 100% client-side processing</li>
                  <li>• No data sent to servers</li>
                  <li>• Complete privacy protection</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Clean Your ChatGPT Text Now
            </h3>
            <p className="text-slate-300 mb-6">
              Remove AI watermarks and invisible characters from your generated content
            </p>
            <Link to="/">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Cleaning ChatGPT Text
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

export default CleanChatgptText;
