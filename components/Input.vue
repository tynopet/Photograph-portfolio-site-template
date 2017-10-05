<template>
  <input class="sexy-input" :type="type" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: ['value', 'type', 'placeholder']
}
</script>

<style scoped>
.sexy-input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #FE6B8B;
  color: #fff;
  height: 30px;
  width: 300px;

  margin: 10px;
  font-size: 18px;
}

.sexy-input::placeholder {
  color: #FE6B8B;
}

.sexy-input:focus {
  outline: none;
  border-bottom: 1px solid #FF8E53;
}
</style>

