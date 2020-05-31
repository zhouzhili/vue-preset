module.exports = (api, options, rootOptions) => {
  const utils = require("./utils")(api);

  options.BASE_URL = "<%= BASE_URL %>";

  options.title = "<%= webpackConfig.name %>";

  // 命令
  api.extendPackage({
    scripts: {
      dev: "vue-cli-service serve",
      "build:prod": "vue-cli-service build",
      "build:stage": "vue-cli-service build --mode staging",
      lint: "eslint --ext .js,.vue src",
    },
    "scripts-info": {
      dev: "运行开发服务器",
      "build:prod": "生产环境执行构建",
      "build:stage": "生产环境执行构建打包分析",
      lint: "eslint",
    },
  });

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      axios: "^0.18.0",
      "core-js": "^3.6.5",
      vue: "^2.6.11",
      "vue-router": "^3.2.0",
      vuex: "^3.4.0",
    },
    devDependencies: {
      "@babel/core": "7.0.0",
      "@babel/register": "7.0.0",
      "@vue/cli-plugin-babel": "^4.4.0",
      "@vue/cli-plugin-eslint": "^4.4.0",
      "@vue/cli-service": "^4.4.0",
      autoprefixer: "^9.5.1",
      "babel-core": "7.0.0-bridge.0",
      "babel-eslint": "^10.1.0",
      eslint: "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "html-webpack-plugin": "3.2.0",
      "script-ext-html-webpack-plugin": "2.1.3",
      "script-loader": "0.7.2",
      "vue-template-compiler": "^2.6.11",
    },
  });

  // application 应用类型为 pc
  if (options.application === "pc") {
    api.extendPackage({
      dependencies: {
        "element-ui": "^2.13.2",
        "js-cookie": "2.2.0",
        nprogress: "0.2.0",
        "path-to-regexp": "2.4.0",
      },
      devDependencies: {
        "node-sass": "^4.9.0",
        "sass-loader": "^7.1.0",
        "svg-sprite-loader": "4.1.3",
        svgo: "1.2.2",
      },
    });
  }
  // application 应用类型为 mobile
  else if (options.application === "mobile") {
    api.extendPackage({
      dependencies: {
        "lib-flexible": "^0.3.2",
        vant: "^2.8.4",
      },
      devDependencies: {
        "postcss-pxtorem": "^4.0.1",
        autoprefixer: "^9.5.1",
        less: "^3.11.1",
        "less-loader": "^5.0.0",
      },
    });
  }

  // 删除 vue-cli3 默认目录
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith("src/") || path.startsWith("public/"))
      .forEach((path) => delete files[path]);
  });

  // 公共基础目录和文件
  // application 应用类型为 mobile
  if (options.application === "mobile") {
    api.render("./template/mobile");
  } else if (options.application === "pc") {
    api.render("./template/pc");
  }

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
    if (options.application === "mobile") {
      utils.deleteDir("./src/vendor");
    }
  });
};
