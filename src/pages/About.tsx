
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Eye, Lock, Globe, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backButton')}
            </Button>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {t('aboutPageTitle')}
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('aboutPageDescription')}
          </p>
        </div>

        {/* How it Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            {t('howItWorksTitle')}
          </h2>
          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-300 leading-relaxed">
              {t('howItWorksText')}
            </p>
          </div>
        </section>

        {/* Why Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6 text-green-400" />
            {t('whyUseTitle')}
          </h2>
          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-300 leading-relaxed">
              {t('whyUseText')}
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-200 mb-6">
            {t('featuresTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-300">✓ {t('feature1')}</p>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-300">✓ {t('feature2')}</p>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-300">✓ {t('feature3')}</p>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-300">✓ {t('feature4')}</p>
            </div>
          </div>
        </section>

        {/* Supported Watermarks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-200 mb-6">
            {t('supportedWatermarksTitle')}
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <h3 className="font-bold text-cyan-300 mb-2">U+200B {t('zwspTitle')}</h3>
              <p className="text-slate-400">{t('zwspDescription')}</p>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <h3 className="font-bold text-indigo-300 mb-2">U+200C/D {t('zwnjTitle')}</h3>
              <p className="text-slate-400">{t('zwnjDescription')}</p>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <h3 className="font-bold text-emerald-300 mb-2">U+202F {t('nnbspTitle')}</h3>
              <p className="text-slate-400">{t('nnbspDescription')}</p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-3">
            <Lock className="w-6 h-6 text-purple-400" />
            {t('privacyTitle')}
          </h2>
          <div className="bg-gradient-to-r from-purple-950/30 to-blue-950/30 p-6 rounded-lg border border-purple-700/30">
            <p className="text-slate-300 leading-relaxed">
              {t('privacyText')}
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 font-semibold">
              {t('appTitle')} {t('enterText')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
