'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
};

export function useLocationSearch() {
  return useSyncExternalStore(subscribe, () => window.location.search, () => '');
}

function updateLocationSearch(params: URLSearchParams, method: 'pushState' | 'replaceState') {
  const search = params.toString();
  const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` === nextUrl) return;
  window.history[method](null, '', nextUrl);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function replaceLocationSearch(params: URLSearchParams) {
  updateLocationSearch(params, 'replaceState');
}

export function pushLocationSearch(params: URLSearchParams) {
  updateLocationSearch(params, 'pushState');
}
