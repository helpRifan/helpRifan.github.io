import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type EventProperties = Record<string, unknown>;

export const useAnalytics = () => {
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        await supabase
          .from('page_visits')
          .insert({
            page_path: window.location.pathname,
            user_agent: navigator.userAgent,
            referrer: document.referrer || null,
          });
      } catch (error) {
        console.error('Error tracking page visit:', error);
      }
    };

    trackPageVisit();
  }, []);

  const trackEvent = async (eventName: string, properties?: EventProperties) => {
    try {
      await supabase
        .from('page_visits')
        .insert({
          page_path: `${window.location.pathname}?event=${eventName}`,
          user_agent: JSON.stringify(properties),
          referrer: document.referrer || null,
        });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { trackEvent };
};