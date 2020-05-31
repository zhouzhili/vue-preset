<template>
  <div id="app">
    <Loading />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  name: 'App',
  components: {
    Loading
  }
}
</script>
<style lang="less" scoped>
#app {
  font-size: 14px;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
