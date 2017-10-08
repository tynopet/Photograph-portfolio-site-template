<template>
  <div class="container">
    <my-title :firstName="firstName" :lastName="lastName" />
    <album v-for="album in albums" :key="album.id" :to="`/${album.id}`" :album="album" />
  </div>
</template>

<script>
import { Api } from '~/hellpers'
import Album from '~/components/Album'
import MyTitle from '~/components/Title'

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    Album,
    MyTitle
  },
  data () {
    return {
      albums: [],
      title: '',
      firstName: '',
      lastName: ''
    }
  },
  async asyncData () {
    const { data } = await Api.Albums.fetch()
    const about = await Api.About.fetch()
    const title = about.data.length
      ? `${about.data[0].firstName} ${about.data[0].lastName}`
      : 'Портфолио'
    const firstName = about.data.length
      ? about.data[0].firstName
      : ''
    const lastName = about.data.length
      ? about.data[0].lastName
      : ''
    return { albums: data, title, firstName, lastName };
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}
</style>
