<template>
  <router-view v-slot="{ Component }">
    <Transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: calc(1rem + 0.3vw);
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  margin-bottom: 1.5rem;

  .btn {
    border: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
}

.icon {
  width: 30px;
}

.hint {
  color: gray;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
