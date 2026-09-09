import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Browser extensions (e.g. VPN/ad blockers) inject scripts that can throw
// unrelated errors and trigger Create React App's red error overlay.
const isExtensionNoise = (value) => {
  const text = String(value ?? '');
  return (
    text.includes('chrome-extension://') ||
    text.includes('moz-extension://') ||
    text.includes('M_ID')
  );
};

window.addEventListener(
  'error',
  (event) => {
    if (isExtensionNoise(event.filename) || isExtensionNoise(event.error?.stack)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.stack || event.reason?.message || event.reason;
  if (isExtensionNoise(reason)) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
