module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5, // 设计稿除以10
      propList: ['*']
    }
  }
}
