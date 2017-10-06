<template>
  <span class="image-container">
    <img class="image" :src="src" :alt="alt">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      requreid: true
    },
    alt: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
}

.image-container .image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>

