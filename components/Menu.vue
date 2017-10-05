<template>
  <nav class="navigation">
    <span @click="handleClick">ICON</span>
    <ul v-show="isOpen" class="submenu">
      <li>
        <nuxt-link to="/">Главная</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">Контакты</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.isOpen = false
      return next()
    })
  },
  methods: {
    handleClick () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 10px;
  right: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 5;
}
</style>
