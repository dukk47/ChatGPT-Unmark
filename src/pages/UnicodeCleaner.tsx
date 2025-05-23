
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Zap, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const UnicodeCleaner = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-200 via-purple-300 to-slate-100 bg-clip-text text-transparent mb-4">
            Unicode Cleaner Online - Free Text Sanitizer
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Advanced online Unicode cleaner to sanitize and clean text from problematic characters
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Code className="w-6 h-6 mr-2 text-purple-400" />
              What is Unicode Cleaning?
            </h2>
            <p className="text-slate-300 mb-4">
              Unicode cleaning is the process of identifying and removing problematic Unicode characters from text. This includes invisible characters, control characters, and non-standard spaces that can cause issues in various applications.
            </p>
            <div className="bg-slate-800/50 border border-slate-600 rounded p-4 mt-4">
              <h3 className="text-lg font-medium text-slate-200 mb-2">Problematic Unicode Characters:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                <ul className="space-y-1">
                  <li>• Zero-width characters</li>
                  <li>• Non-breaking spaces</li>
                  <li>• Control characters</li>
                  <li>• Bidirectional marks</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Soft hyphens</li>
                  <li>• Word joiners</li>
                  <li>• Format characters</li>
                  <li>• Private use characters</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-blue-400" />
              When Do You Need Unicode Cleaning?
            </h2>
            <div className="text-slate-300 space-y-3">
              <p>Unicode cleaning is essential when working with:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">Web Development:</h3>
                  <ul className="ml-4 space-y-1">
                    <li>• HTML/CSS rendering issues</li>
                    <li>• Database storage problems</li>
                    <li>• Search functionality errors</li>
                    <li>• SEO content optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">Data Processing:</h3>
                  <ul className="ml-4 space-y-1">
                    <li>• CSV file imports</li>
                    <li>• API data cleaning</li>
                    <li>• Text analytics preparation</li>
                    <li>• Machine learning datasets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              Our Unicode Cleaner Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-200 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Detection & Analysis:
                </h3>
                <ul className="ml-4 space-y-2">
                  <li>• Real-time character scanning</li>
                  <li>• Visual highlighting of problems</li>
                  <li>• Detailed character information</li>
                  <li>• Unicode codepoint display</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Cleaning & Export:
                </h3>
                <ul className="ml-4 space-y-2">
                  <li>• One-click text cleaning</li>
                  <li>• Selective character removal</li>
                  <li>• Copy to clipboard</li>
                  <li>• Download cleaned files</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              Why Choose Our Online Unicode Cleaner?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-slate-200 mb-2">Privacy First</h3>
                <p className="text-sm">All processing happens in your browser. No data leaves your device.</p>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-slate-200 mb-2">Fast & Efficient</h3>
                <p className="text-sm">Instant character detection and cleaning with real-time results.</p>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">🆓</div>
                <h3 className="font-semibold text-slate-200 mb-2">Completely Free</h3>
                <p className="text-sm">No registration, no limits, no hidden costs. Use as much as you need.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Start Cleaning Unicode Text Now
            </h3>
            <p className="text-slate-300 mb-6">
              Clean your text from problematic Unicode characters with our free online tool
            </p>
            <Link to="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                Open Unicode Cleaner
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

export default UnicodeCleaner;
