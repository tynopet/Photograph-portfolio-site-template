<template>
  <section>
    <album-image v-for="image in album.Images" :key="image.id" :src="image.path" :alt="image.alt" />
  </section>
</template>

<script>
import { Api } from '~/hellpers'
import Image from '~/components/Image'

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    'album-image': Image
  },
  data () {
    return { albums: [] }
  },
  async asyncData ({ params }) {
    const { data } = await Api.Albums.find(params.id)
    return { album: data }
  }
}
</script>

<style>

</style>
