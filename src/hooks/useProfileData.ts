import { useEffect, useMemo, useReducer } from 'react';
import type { ProfileData } from '../types';

interface UseProfileDataResult {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
}

type State = UseProfileDataResult;

type Action =
  | { type: 'fetch' }
  | { type: 'success'; data: ProfileData }
  | { type: 'error'; error: string };

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case 'fetch':
      return { data: null, loading: true, error: null };
    case 'success':
      return { data: action.data, loading: false, error: null };
    case 'error':
      return { data: null, loading: false, error: action.error };
  }
}

function getInitialState(slug: string | undefined): State {
  if (!slug) {
    return { data: null, loading: false, error: 'No profile specified.' };
  }
  return { data: null, loading: true, error: null };
}

export function useProfileData(slug: string | undefined): UseProfileDataResult {
  const initialState = useMemo(() => getInitialState(slug), [slug]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const controller = new AbortController();

    fetch(`/data/profiles/${slug}.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Profile not found: ${slug}`);
        }
        return response.json();
      })
      .then((profileData: ProfileData) => {
        dispatch({ type: 'success', data: profileData });
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error('Failed to load profile data:', err);
        dispatch({ type: 'error', error: 'Failed to load profile. Please try refreshing the page.' });
      });

    return () => controller.abort();
  }, [slug]);

  return state;
}
