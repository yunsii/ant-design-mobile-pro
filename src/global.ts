import { Toast } from 'antd-mobile';
import { addScriptToHead, setRemIfResize } from './utils/customUtils';
const defaultSettings = require('./defaultSettings');

const { iconfontUrl } = defaultSettings;

addScriptToHead(iconfontUrl);
setRemIfResize(750, 75);

Toast.config({
  mask: false,
})
