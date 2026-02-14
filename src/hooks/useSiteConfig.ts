import { useEffect, useState } from 'react';
import type { SiteConfig } from '../types';

interface UseSiteConfigResult {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
}

let cachedConfig: SiteConfig | null = null;

export function useSiteConfig(): UseSiteConfigResult {
  const [config, setConfig] = useState<SiteConfig | null>(cachedConfig);
  const [loading, setLoading] = useState(!cachedConfig);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedConfig) return;

    fetch('/data/site.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load site configuration');
        }
        return response.json();
      })
      .then((data: SiteConfig) => {
        cachedConfig = data;
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load site config:', err);
        setError('Failed to load site configuration.');
        setLoading(false);
      });
  }, []);

  return { config, loading, error };
}
