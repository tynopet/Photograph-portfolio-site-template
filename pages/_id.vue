<template>
  <section>
    <album-image v-for="image in album.Images" :key="image.id" :src="image.path" :alt="image.alt" />
  </section>
</template>

<script>
import axios from 'axios'
import Image from '~/components/Image'

export default {
  components: {
    'album-image': Image
  },
  data () {
    return { albums: [] }
  },
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/albums/${params.id}`)
    return { album: data }
  }
}
</script>

<style>

</style>
