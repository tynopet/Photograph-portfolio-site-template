<template>
  <nav class="navigation">
    <span class="menu-icon" @click="handleClick">
      <i class="fa fa-bars fa-lg"></i>
    </span>
    <ul v-show="isOpen" class="submenu">
      <li>
        <nuxt-link :to="link('/')">Главная</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="link('/about')">Контакты</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['type'],
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
    },
    link (path) {
      return this.type === 'admin'
        ? `/admin${path}`
        : path
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

.navigation .menu-icon {
  color: #fff;
  cursor: pointer;
}
</style>
