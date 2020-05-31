<template>
  <div class="mobile-content">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style lang="less" scoped>
.mobile-content {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif;
}
</style>
