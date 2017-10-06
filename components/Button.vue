<template>
  <button class="sexy-button">
    <slot></slot>
  </button>
</template>

<script>

</script>

<style scoped>
.sexy-button {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;
  height: 40px;
  width: 300px;

  margin: 10px;
}

.sexy-button:focus,
.sexy-button:active {
  outline: none;
  background: linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%);
}
</style>

