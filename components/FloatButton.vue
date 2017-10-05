<template>
  <button class="sexy-button" @click="$emit('click')" :style="{ left: left, right: right }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['left', 'right']
}
</script>

<style scoped>
.sexy-button {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  height: 50px;
  width: 50px;

  position: absolute;
  bottom: 15px;
  right: 15px;
}

.sexy-button:focus,
.sexy-button:active {
  outline: none;
  background: linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%);
}
</style>

