<template>
  <section class="admin">
    <form class="login-form" @submit.prevent="handleSubmit">
      <sexy-input type="email" placeholder="Email" v-model="email" />
      <sexy-input type="password" placeholder="Пароль" v-model="password" />
      <sexy-error v-show="error">{{ errorMessage }}</sexy-error>
      <sexy-button>Log In</sexy-button>
    </form>
  </section>
</template>

<script>
import qs from 'qs'
import { axios } from '~/hellpers'
import SexyButton from '~/components/Button'
import SexyInput from '~/components/Input'
import SexyError from '~/components/Error'

export default {
  middleware: 'auth',
  components: {
    SexyButton,
    SexyInput,
    SexyError
  },
  head: {
    title: 'Вход в админку'
  },
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  computed: {
    errorMessage () {
      if (this.error) {
        return `Ошибка входа: ${this.error}`
      }
      return null
    }
  },
  methods: {
    async handleSubmit () {
      const { status, data } = await axios.post('/api/auth', qs.stringify({
        email: this.email,
        password: this.password
      }));
      if (status === 200) {
        if (data.error) {
          this.error = data.error;
        } else {
          localStorage.setItem('auth-token', data.token)
          document.cookie = `auth-token=${data.token}`
          this.$router.replace({ path: '/admin' })
        }
      } else {
        if (data.error) {
          this.error = data.error;
        } else {
          this.error = 'Внутренняя ошибка приложения'
        }
      }
    }
  }
}
</script>

<style>
.admin {
  background-color: #3e365f;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin .login-form {
  background-color: #2a1d4b;
  display: flex;
  flex-direction: column;
  padding: 30px;
}
</style>
