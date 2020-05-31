<template>
  <div class="wrapper" v-show="requestLoading > 0">
    <div class="shadowBox"></div>
    <div class="block">
      <van-loading type="spinner" />
    </div>
  </div>
</template>
<script>

export default {
  name: 'AppMain',
  computed: {
    requestLoading () {
      return this.$store.state.common.requestLoading
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .shadowBox {
    background: #fff;
    opacity: 0.1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .block {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
