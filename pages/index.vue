<template>
  <div class="container">
    <album v-for="album in albums" :key="album.id" :album="album" />
  </div>
</template>

<script>
import axios from 'axios'
import Album from '~/components/Album'

export default {
  components: {
    album: Album
  },
  data () {
    return { albums: [] }
  },
  async asyncData () {
    const { data } = await axios.get('http://localhost:3000/api/albums')
    console.log(data[0]);
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
