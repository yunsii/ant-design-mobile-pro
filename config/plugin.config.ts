const defaultSettings = require('../src/defaultSettings');

const { publicPath } = defaultSettings;

export default (config: any) => {
  config.output.publicPath(publicPath);
}
