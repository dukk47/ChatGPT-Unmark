
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
}

export const CookieBanner = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const saveConsent = (consentData: CookieConsent) => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allConsent = { necessary: true, analytics: true };
    setConsent(allConsent);
    saveConsent(allConsent);
  };

  const handleRejectAll = () => {
    const minimalConsent = { necessary: true, analytics: false };
    setConsent(minimalConsent);
    saveConsent(minimalConsent);
  };

  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <Card className="bg-slate-800/95 backdrop-blur-md border-slate-600 max-w-4xl mx-auto shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-200">
              <Cookie className="w-5 h-5 text-cyan-400" />
              {t('cookieTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('cookieDescription')}
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 border border-slate-600"
              >
                <Settings className="w-4 h-4 mr-2" />
                {t('cookieSettings')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRejectAll}
                className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 border border-slate-600"
              >
                {t('cookieReject')}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {t('cookieAccept')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-200">{t('cookieSettings')}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {t('cookieDescription')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="necessary" className="text-slate-200 font-medium">
                  {t('cookieNecessary')}
                </Label>
                <Switch
                  id="necessary"
                  checked={consent.necessary}
                  disabled
                  className="data-[state=checked]:bg-cyan-600"
                />
              </div>
              <p className="text-sm text-slate-400">
                {t('cookieNecessaryDescription')}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="text-slate-200 font-medium">
                  {t('cookieAnalytics')}
                </Label>
                <Switch
                  id="analytics"
                  checked={consent.analytics}
                  onCheckedChange={(checked) =>
                    setConsent(prev => ({ ...prev, analytics: checked }))
                  }
                  className="data-[state=checked]:bg-cyan-600"
                />
              </div>
              <p className="text-sm text-slate-400">
                {t('cookieAnalyticsDescription')}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-300 hover:bg-slate-800"
            >
              {t('cookieClose')}
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {t('cookieSave')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
