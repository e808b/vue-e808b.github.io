<template>
  <div class="app-layout">
    <div class="app-layout__inner">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.app-layout {
  height: 100vh;
  height: 100dvh;
  padding: 0 24px;
  overflow: hidden auto;
  overscroll-behavior: none;
}

.app-layout__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 0;
}

@media (max-width: 1279px) {
  .app-layout__inner {
    padding-top: 24px;
    padding-bottom: 48px;
  }
}
</style>
