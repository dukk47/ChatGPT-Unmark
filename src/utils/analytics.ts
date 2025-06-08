
// Google Analytics utility functions
export const GA_TRACKING_ID = 'G-CG3R66WMQM';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: {
      (...args: any[]): void;
      q?: any[];
    };
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (trackingId: string) => {
  if (typeof window !== 'undefined' && trackingId && trackingId !== 'G-XXXXXXXXXX') {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag function
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', trackingId);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
