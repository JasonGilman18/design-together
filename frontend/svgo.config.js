const { extendDefaultPlugins } = require('svgo');
module.exports = {
  plugins: extendDefaultPlugins([
    'convertStyleToAttrs'
  ])
}