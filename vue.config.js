const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
const path = require('path')
const Mock = require('./public/mock/mock')

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/mock': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        },
        before: function(app, server, compiler) {
          Mock(app)
        }
      }
    }
  },

  css: {
    extract: IS_PROD, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    requireModuleExtension: false // 启用 CSS modules for all css / pre-processor files.
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        "vue$": "vue/dist/vue.esm.js",
        "@": resolve("src"),
        "@assets": resolve("src/assets"),
        "@components": resolve("src/components")
      }
    }
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/css/custom_public_var.less')
      ]
    }
  }
}
