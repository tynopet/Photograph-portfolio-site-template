<template>
  <section>
    <my-title :firstName="firstName" :lastName="lastName" />
    <album-image v-for="image in album.Images" :key="image.id" :src="image.path" :alt="image.alt" />
  </section>
</template>

<script>
import { Api } from '~/hellpers'
import Image from '~/components/Image'
import MyTitle from '~/components/Title'

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    'album-image': Image,
    MyTitle
  },
  data () {
    return {
      albums: [],
      lastName: '',
      firstName: ''
    }
  },
  async asyncData ({ params }) {
    const { data } = await Api.Albums.find(params.id)
    const about = await Api.About.fetch()
    const firstName = about.data.length
      ? about.data[0].firstName
      : ''
    const lastName = about.data.length
      ? about.data[0].lastName
      : ''
    return { album: data, firstName, lastName }
  }
}
</script>

<style>

</style>
