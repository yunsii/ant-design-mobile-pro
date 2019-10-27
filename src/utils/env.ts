export function isWechatEnv(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/MicroMessenger/i);
}

export function isIOSEnv(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/(iPhone|iPad|iPod|iOS)/i);
}
