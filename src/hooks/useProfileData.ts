import { useEffect, useState } from 'react';
import type { ProfileData } from '../types';

interface UseProfileDataResult {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
}

export function useProfileData(slug: string | undefined): UseProfileDataResult {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No profile specified.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    fetch(`/data/profiles/${slug}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Profile not found: ${slug}`);
        }
        return response.json();
      })
      .then((profileData: ProfileData) => {
        setData(profileData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load profile data:', err);
        setError('Failed to load profile. Please try refreshing the page.');
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
}
