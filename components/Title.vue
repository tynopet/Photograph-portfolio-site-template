<template>
  <span class="title">
    <h3>{{ firstName }}</h3>
    <h3>{{ lastName }}</h3>
  </span>
</template>

<<script>
export default {
  props: ['firstName', 'lastName']  
}
</script>

<style scoped>
.title {
  color: #fff;
  font-size: 20px;
  position: fixed;
  left: 40px;
  top: 10px;
  z-index: 5;
}

.title>h3 {
  margin: 0;
}
</style>

