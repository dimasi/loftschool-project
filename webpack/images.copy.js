const path = require('path');

const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.svg$/,
          exclude: [/node_modules/],
          loader: 'external-svg-sprite-loader',
          options: {
            name: 'images/sprite.svg'
          }
        }
      ]
    },
    resolve: {
      modules: ["web_modules", "node_modules", "spritesmith-generated"]
    },
    plugins: [
      new SvgStorePlugin(),
      new SpritesmithPlugin({
            src: {
                cwd: path.resolve($.PATHS.source, 'images'),
                glob: '*.png'
            },
            target: {
                image: path.resolve($.PATHS.source, 'spritesmith-generated', 'sprite.png'),
                css: path.resolve($.PATHS.source, 'spritesmith-generated', 'sprite.scss')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            },
            spritesmithOptions: {
              algorithm: 'left-right'
            }
        })
    ]
  };
};