import { Toast } from 'antd-mobile';
import { addScriptToHead, setRemIfResize } from './utils/customUtils';
import { isIOSEnv } from '@/utils/env';
const defaultSettings = require('./defaultSettings');

const { iconfontUrl } = defaultSettings;

addScriptToHead(iconfontUrl);
setRemIfResize(750, 75);

/**
 * 测试发现 使用 fastclick 的 iOS 设备可能会导致输入框点击多次才有响应，
 * 所以在 iOS 设备上先暂时不添加该功能
 */
if (!isIOSEnv()) {
  addScriptToHead('https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js', () => {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        window.FastClick.attach(document.body);
      }, false);
    }
  });
}

Toast.config({
  mask: false,
})
