<template>
  <div class="layout">
    <my-menu/>
    <main class="page">
      <nuxt/>
    </main>
    <my-footer/>
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
.button,
.button:visited {
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover,
.button:focus {
  color: #fff;
  background-color: #3B8070;
}

.title {
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}

.page {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
