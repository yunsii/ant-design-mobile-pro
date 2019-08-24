export function addScriptToHead(url: string) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.src = url;
  head.appendChild(script);
}

// reference: https://juejin.im/post/5c0dd7ac6fb9a049c43d7edc
export function setRem(designWidth?: number, baseFontSize?: number) {
  const _designWidth = designWidth || 750;
  const _baseFontSize = baseFontSize || 75;
  // const ua = navigator.userAgent;
  // const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  // const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  // let dpr = window.devicePixelRatio || 1;
  // if (!isIos && !(matches && +matches[1] > 534)) {
  //   // 如果非iOS, 非Android4.3以上, dpr设为1;
  //   dpr = 1;
  // }
  // const scale = 1 / dpr;
  // let metaEl = document.querySelector('meta[name="viewport"]');
  // if (!metaEl) {
  //   metaEl = document.createElement('meta');
  //   metaEl.setAttribute('name', 'viewport');
  //   window.document.head.appendChild(metaEl);
  // }
  // metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  document.documentElement.style.fontSize = document.documentElement.clientWidth / (_designWidth / _baseFontSize) + 'px';
};

export function setRemIfResize(designWidth?: number, baseFontSize?: number) {
  const resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
  if (!document.addEventListener) {
    return
  }
  const event = () => setRem(designWidth, baseFontSize);
  window.addEventListener(resizeEvt, event, false);
  document.addEventListener("DOMContentLoaded", event, false);
}
