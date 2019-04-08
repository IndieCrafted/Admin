<template>
  <div id="app">
    <el-menu
      mode="horizontal"
      :router="true"
      :default-active="$route.path">
      <el-menu-item index="/beer-list">啤酒管理</el-menu-item>
      <el-menu-item index="/menu-control">酒单配置</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/assets/_base.scss';
</style>
