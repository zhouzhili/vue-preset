module.exports = (api, options, rootOptions) => {
  const utils = require('./utils')(api)
  // 命令
  api.extendPackage({
    scripts: {
      bootstrap: 'npm install',
      serve: 'vue-cli-service serve',
      build: 'node build/index.js',
      lint: 'vue-cli-service lint',
      analyz: 'vue-cli-service build --mode analyz'
    },
    'scripts-info': {
      serve: '运行开发服务器',
      build: '生产环境执行构建',
      analyz: '生产环境执行构建打包分析'
    }
  })

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      'core-js': '^3.6.4',
      vue: '^2.6.11',
      'vue-router': '^3.1.6',
      vuex: '^3.1.3',
      axios: '0.19.1',
      'normalize.css': '8.0.1'
    },
    devDependencies: {
      '@vue/cli-plugin-babel': '~4.3.0',
      '@vue/cli-plugin-eslint': '~4.3.0',
      '@vue/cli-plugin-router': '~4.3.0',
      '@vue/cli-plugin-vuex': '~4.3.0',
      '@vue/cli-service': '~4.3.0',
      '@vue/eslint-config-standard': '^5.1.2',
      'babel-eslint': '^10.1.0',
      eslint: '^6.7.2',
      'eslint-plugin-import': '^2.20.2',
      'eslint-plugin-node': '^11.1.0',
      'eslint-plugin-promise': '^4.2.1',
      'eslint-plugin-standard': '^4.0.0',
      'eslint-plugin-vue': '^6.2.2',
      less: '^3.0.4',
      'less-loader': '^5.0.0',
      'vue-template-compiler': '^2.6.11'
    }
  })

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    }
  })

  // application 应用类型为 mobile,添加 px转rem
  if (options.application === 'mobile') {
    api.extendPackage({
      dependencies: {
        'amfe-flexible': '^2.2.1'
      },
      devDependencies: {
        'postcss-pxtorem': '^4.0.1'
      },
      postcss: {
        plugins: {
          'postcss-pxtorem': {
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['height', 'line-height', 'width', 'padding', 'margin', 'top', 'left', 'right', 'bottom', 'font-size'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1
          }
        }
      }
    })
  }

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  if (options['ui-framework'] === 'element-ui') {
    require('./element.js')(api, options)
  } else if (options['ui-framework'] === 'ant') {
    require('./ant.js')(api, options)
  } else if (options['ui-framework'] === 'vant') {
    require('./vant.js')(api, options)
  }

  // 公共基础目录和文件
  api.render('./template')

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
    if (options.application === 'mobile') {
      utils.deleteDir('./src/vendor')
    }
  })
}
