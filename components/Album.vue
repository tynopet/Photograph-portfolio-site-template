<template>
  <section>
    <nuxt-link :to="`/${album.id}`">
      <album-image :src="album.Cover.path" :alt="album.name" />
    </nuxt-link>
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
      type: Object
    }
  }
}
</script>

<style>
.image-container {
  width: 100%;
}

.image-container .image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>

