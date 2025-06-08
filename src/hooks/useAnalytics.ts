
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initGA, GA_TRACKING_ID } from '@/utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    initGA(GA_TRACKING_ID);
  }, []);

  useEffect(() => {
    // Track page views on route changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};
