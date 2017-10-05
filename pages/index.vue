<template>
  <div class="container">
    <album v-for="album in albums" :key="album.id" :album="album" />
  </div>
</template>

<script>
import { axios } from '~/hellpers'
import Album from '~/components/Album'

export default {
  components: {
    album: Album
  },
  data () {
    return { albums: [] }
  },
  async asyncData () {
    const { data } = await axios.get('/api/albums')
    return { albums: data };
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}
</style>
