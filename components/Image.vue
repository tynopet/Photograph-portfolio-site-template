<template>
  <span class="image-container">
    <img class="image" :src="src" :alt="alt">
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

