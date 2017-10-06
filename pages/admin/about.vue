<template>
  <section class="about">
    <div class="background-image" :style="{ 'background-image': `url(${background})` }" />
    <div class="content">
      <form class="about-form" @submit.prevent="handleSubmit">
        <sexy-input placeholder="Email" type="email" name="email" v-model="email"></sexy-input>
        <sexy-input placeholder="Имя" type="text" name="first_name" v-model="firstName"></sexy-input>
        <sexy-input placeholder="Фамилия" type="text" name="last_name" v-model="lastName"></sexy-input>
        <sexy-input placeholder="Заголовок страницы" type="text" name="title" v-model="title"></sexy-input>
        <sexy-input placeholder="Описание" type="text" name="text" v-model="text"></sexy-input>
        <sexy-file-input name="background"></sexy-file-input>
        <sexy-error v-show="error">{{ error }}</sexy-error>
        <sexy-button>Сохранить</sexy-button>
      </form>
    </div>
    </div>
  </section>
</template>

<script>
import { Api } from '~/hellpers'
import SexyButton from '~/components/Button'
import SexyError from '~/components/Error'
import SexyFileInput from '~/components/FileInput'
import SexyInput from '~/components/Input'

export default {
  middleware: 'auth',
  components: {
    SexyButton,
    SexyError,
    SexyFileInput,
    SexyInput
  },
  data () {
    return {
      id: '',
      background: '',
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      text: '',
      error: null
    }
  },
  async asyncData () {
    const { data } = await Api.About.fetch()
    const {
      id,
      backgroundImage: background,
      firstName,
      lastName,
      email,
      title,
      text
    } = data[0];
    return {
      id,
      background,
      firstName,
      lastName,
      email,
      title,
      text
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        const about = new FormData(e.target)
        const { data } = await Api.About.save(this.id, about)
        this.id = data.id
        this.background = data.backgroundImage
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.email = data.email
        this.title = data.title
        this.text = data.text
        this.error = null
      } catch (e) {
        if (e.response.status === 401) {
          this.$route.replace('/auth')
        } else {
          if (e.response.data.error) {
            this.error = e.response.data.error
          } else {
            this.error = 'Внутренняя ошибка сервера. Свяжитесь с разработчиком'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.about {
  flex: 1 1 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about .background-image {
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  filter: blur(3px);
}

.about .content {
  flex: 1 1 auto;
  position: relative;
  z-index: 2;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about .content .html {
  max-width: 90vw;
  overflow: auto;
}

.about .about-form {
  background-color: #2a1d4b;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
