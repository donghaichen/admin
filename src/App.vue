<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
<!--    <router-view/>-->
  </transition>
</template>

<style lang="scss">
$loadingBg:rgba(45, 58, 75, .3);
#app {
  height: 100%;
}
.global-loading{
  position: fixed!important;
  height: 100%;
  width: 100%;
  background-color: $loadingBg;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 999;
  opacity: 1;
  .ant-spin-dot{
    margin-top: 49vh;
  }
}

.meta {
  font-size: 12px;
  margin: 0;
  line-height: 150%;
}
</style>
