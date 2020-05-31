# vue-preset
结合 vue-cli3 的 preset 搭建基于 git repo 的前端项目模板


## 快速开始

```bash
# 安装 vue-cli 3.0
npm install -g @vue/cli

# 根据远程 preset 创建项目
vue create --preset zhouzhili/vue-preset my-project
# or
vue create --preset direct:https://github.com/zhouzhili/vue-preset.git my-project --clone

# 本地预览
cd my-project && npm run install && npm run dev

```

## 简介

模板包含pc和mobile，

PC模板根据[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)搭建，集成了elementUI，axios，js-cookie，nprogress等，使用scss预处理语言。

Mobile模板集成了VantUI，集成了amfe-flexible、postcss-pxtorem，是要less预处理语言，并使用postcss根据375底稿，将px转为rem进行移动端适配。

#### 说明

preset.json 不使用vue 默认的vue-router和vuex，可避免vue-cli生成默认的vue文件。

