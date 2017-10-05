<template>
  <section class="about">
    <div class="background-image" :style="{ 'background-image': `url(${background})` }" />
    <div class="content">
      <h1>{{ title }}</h1>
      <div class="html" v-html="text"></div>
    </div>
  </section>
</template>

<script>
import { axios } from '~/hellpers'

export default {
  data () {
    return {
      background: '',
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      text: '',
    }
  },
  async asyncData () {
    const { data } = await axios.get('/api/about')
    const {
      backgroundImage: background,
      firstName,
      lastName,
      email,
      title,
      text
    } = data[0];
    return {
      background,
      firstName,
      lastName,
      email,
      title,
      text
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
</style>
