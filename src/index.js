import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Browser extensions (VPN/ad blockers/etc.) inject scripts that throw unrelated
// errors (e.g. M_ID) and trigger Create React App's red error overlay.
const isExtensionNoise = (value) => {
  const text = String(value ?? '');
  return (
    text.includes('chrome-extension://') ||
    text.includes('moz-extension://') ||
    text.includes('safari-extension://') ||
    text.includes('M_ID') ||
    text.includes('eppiocemhmnlbhjplcgkofciiegomcon')
  );
};

const shouldSuppress = (event) =>
  isExtensionNoise(event?.filename) ||
  isExtensionNoise(event?.message) ||
  isExtensionNoise(event?.error?.stack) ||
  isExtensionNoise(event?.error?.message);

window.addEventListener(
  'error',
  (event) => {
    if (shouldSuppress(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
    return undefined;
  },
  true
);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.stack || event.reason?.message || event.reason;
  if (isExtensionNoise(reason)) {
    event.preventDefault();
  }
});

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args.some((arg) => isExtensionNoise(arg))) return;
  originalConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
