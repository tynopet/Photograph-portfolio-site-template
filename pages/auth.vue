<template>
  <section class="admin">
    <form class="login-form" @submit.prevent="handleSubmit">
      <input class="input" type="email" placeholder="Email" v-model="email">
      <input class="input" type="password" placeholder="Пароль" v-model="password">
      <span class="error" v-show="error">{{ errorMessage }}</span>
      <button class="gay-btn">Log In</button>
    </form>
  </section>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
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
  // async mounted () {
  //   const token = localStorage.getItem('auth-token')
  //   if (token) {
  //     const { data } = await axios.get('http://localhost:3000/api/auth', {
  //       headers: {
  //         Authorization: token
  //       }
  //     })
  //     if (data.status) {
  //       this.$router.replace({ path: '/admin' })
  //     }
  //   }
  // },
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
      const { status, data } = await axios.post('http://localhost:3000/api/auth', qs.stringify({
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

.admin .login-form .error {
  background-color: transparent;
  color: #FE6B8B;
  font-size: 18px;
  font-weight: 900;
  margin: 10px;
}

.admin .login-form .input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #FE6B8B;
  color: #fff;
  height: 30px;
  width: 300px;

  margin: 10px;
  font-size: 18px;
}

.admin .login-form .input::placeholder {
  color: #FE6B8B;
}

.admin .login-form .input:focus {
  outline: none;
  border-bottom: 1px solid #FF8E53;
}

.admin .login-form .gay-btn {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;
  height: 40px;
  width: 300px;

  margin: 10px;
}
</style>
