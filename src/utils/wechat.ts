export function isWechatEnv(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/MicroMessenger/i);
}