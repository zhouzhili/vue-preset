<template>
  <div class="home-page">
    <div class="container">
      正文
    </div>
    <section>
      <van-tabbar v-model="activeBar">
        <van-tabbar-item icon="wap-home" @click.native="onTabBarClick(0)">首页</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" @click.native="onTabBarClick(1)">购物车</van-tabbar-item>
        <van-tabbar-item icon="manager" @click.native="onTabBarClick(3)">我的</van-tabbar-item>
      </van-tabbar>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home-page',
  components: {
  },
  data() {
    return {
      activeBar: 0
    }
  },
  methods: {
    onTabBarClick() {

    }
  }
}
</script>

<style lang='less' scoped>
.home-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .container {
    flex: 1;
    width: 100%;
  }
}
</style>