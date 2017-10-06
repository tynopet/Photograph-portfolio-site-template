<template>
  <section class="album">
    <nuxt-link :to="to">
      <album-image :src="src" :alt="album.name" />
    </nuxt-link>
    <slot></slot>
  </section>
</template>

<script>
import Image from '~/components/Image'

export default {
  components: {
    'album-image': Image
  },
  props: {
    album: {
      type: Object,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    src () {
      return this.album.Cover ? this.album.Cover.path : ''
    }
  }
}
</script>

<style scoped>
.album {
  position: relative;
  min-height: 100px;
}
</style>

