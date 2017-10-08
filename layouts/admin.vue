<template>
  <div class="layout">
    <my-menu type="admin" />
    <main class="page">
      <nuxt/>
    </main>
    <portal-target name="modal" />
    <portal-target name="float-button" />
  </div>
</template>

<script>
import MyMenu from '~/components/Menu.vue'
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    MyFooter,
    MyMenu,
  }
}
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #000;
}
</style>
