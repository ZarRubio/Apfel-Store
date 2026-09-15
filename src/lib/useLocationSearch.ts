'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
};

export function useLocationSearch() {
  return useSyncExternalStore(subscribe, () => window.location.search, () => '');
}

export function replaceLocationSearch(params: URLSearchParams) {
  const search = params.toString();
  window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
