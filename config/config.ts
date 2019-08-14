import { IConfig, IPlugin } from 'umi-types';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import pxToViewPort from 'postcss-px-to-viewport';
const defaultSettings = require('../src/defaultSettings');

const { primaryColor } = defaultSettings;

// ref: https://umijs.org/config/
const plugins: IPlugin[] = [
  // ref: https://umijs.org/plugin/umi-plugin-react.html
  ['umi-plugin-react', {
    antd: false,
    dva: true,
    dynamicImport: { webpackChunkName: true },
    title: 'ant-design-mobile-pro',
    dll: false,
    locale: {
      enable: true,
      default: 'en-US',
    },
    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },
  }],
];

export default {
  // add for transfer to umi
  base: '',
  publicPath: '',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: 'browser', // 默认是 browser
  plugins,
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  // theme: {
  //   'brand-primary': theme.primaryColor,
  //   'brand-primary-tap': theme.brandPrimaryTap,
  // },
  externals: {},
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  outputPath: './dist',
  alias: {},
  proxy: {
    '/server/api/': {
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
      target: 'https://preview.pro.ant.design/',
    },
    '/wx/api/': {
      changeOrigin: true,
      pathRewrite: { '^/wx/api': '' },
      target: 'https://games.parsec.com.cn/',
    },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  hash: true,
  chainWebpack: webpackPlugin,
  extraBabelPlugins: [
    ['import', {
      libraryName: 'antd-mobile',
      //style: 'css',
      style: true, // use less for customized theme
    }],
  ],
  // reference: https://umijs.org/zh/config/#extrapostcssplugins
  extraPostCSSPlugins: [
    // reference: https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    pxToViewPort({
      viewportWidth: 375,
      mediaQuery: false,
    }),
  ],
  theme: {
    'brand-primary': primaryColor,
    'brand-primary-tap': '#37dddd',
  },
} as IConfig;
