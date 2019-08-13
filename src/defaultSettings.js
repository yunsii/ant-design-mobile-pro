// 不能使用 export 语法，umi dev 报错：SyntaxError: Unexpected token export
module.exports = {
  /**
   * primary color of ant design mobile
   */
  primaryColor: '#60ebe6',
  colorWeak: false,
  title: 'Ant Design Mobile Pro',
  pwa: false,
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: '//at.alicdn.com/t/font_1347723_k6at8d3rogb.js',
};
