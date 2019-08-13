const defaultSettings = require('./defaultSettings');

const { iconfontUrl } = defaultSettings;

function addScriptToHead(url: string) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.src= url;
  head.appendChild(script);
}

addScriptToHead(iconfontUrl);
