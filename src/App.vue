<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
<!--    <router-view/>-->
  </transition>
</template>

<style lang="scss">
#app {
  height: 100%;
}
</style>
