
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const FooterSection = () => {
  const { t } = useLanguage();

  return (
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
              Diese Anwendung wurde zu <span className="font-bold text-cyan-300">100% mit KI entwickelt</span> - gepromptet <span className="font-bold text-cyan-300">von einem Anwendungsentwickler</span> mit ❤️ für <span className="font-bold text-cyan-300">sauberen Code</span> und <span className="font-bold text-cyan-300">benutzerfreundliche Lösungen</span>.
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
          
          {/* Contact button hidden - commenting out the entire section
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
          */}
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
  );
};
