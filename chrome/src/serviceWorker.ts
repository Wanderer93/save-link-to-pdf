console.log('[SW] Service worker running');

chrome.runtime.onInstalled.addListener(() => {
  console.log('[SW] Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'get-page-content') {
    console.log('[SW] Got ping');
    sendResponse({ pong: true });
  }
});