<template>
  <div class="container">
    Hello admin
  </div>
</template>

<script>
import { axios } from '~/hellpers'

export default {
  middleware: 'auth'
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}
</style>
