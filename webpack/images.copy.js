const path = require('path');

const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = ({pathSource, pathBuild}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.svg$/,
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
                cwd: path.resolve(pathSource, 'images'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(pathSource, 'spritesmith-generated', 'sprite.png'),
                css: path.resolve(pathSource, 'spritesmith-generated', 'sprite.scss')
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