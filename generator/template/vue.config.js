'use strict'

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

// web title
const name = 'vue-project'

const resolve = dir => {
  return path.join(__dirname, './', dir)
}

const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

// 生产环境去掉 console.log
const getOptimization = () => {
  let optimization = {}
  if (isProd()) {
    optimization = {
      // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    }
  }
  return optimization
}

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   */
  publicPath: './',
  runtimeCompiler: true,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    port: 3000,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    }
    // 代理示例 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000', // 后端接口地址
    //     ws: true,
    //     changeOrigin: true, // 是否允许跨域
    //     pathRewrite: {
    //       '^/api': ''   // 直接用'api/接口名'进行请求.
    //     }
    //   }
    // }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd(),
    // 开启 CSS source maps?
    sourceMap: isProd(),
    // css预设器配置项
    loaderOptions: {}
  },
  configureWebpack: () => ({
    name: name,
    BASE_URL: './',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {},
    // https://github.com/cklwblove/vue-cli3-template/issues/12
    optimization: getOptimization()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // module

    // svg
    // exclude icons
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('url-loader')
      .loader('url-loader')
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    // plugin

    // preload
    // runtime.js 内联的形式嵌入
    config.plugin('preload').tap(args => {
      args[0].fileBlacklist.push(/runtime\./)
      return args
    })

    // webpack-html-plugin
    config.plugin('html').tap(args => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
      return args
    })

    // optimization
    config.when(process.env.NODE_ENV === 'production', config => {
      config.plugin('ScriptExtHtmlWebpackPlugin').use('script-ext-html-webpack-plugin', [
        {
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/
        }
      ])
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 只打包初始时依赖的第三方
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 3, // 最小公用次数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
