<template>
  <label class="sexy-file">
    {{ text }}
    <input class="file" type="file" :name="name" @change="handleChange">
  </label>
</template>

<script>
export default {
  props: ['name'],
  data () {
    return {
      text: 'Файл не выбран'
    }
  },
  methods: {
    handleChange (e) {
      if (e.target.files.length) {
        if (e.target.files.length > 1) {
          this.text = `Выбрано файлов: ${e.target.files.length}`
        } else {
          this.text = e.target.files[0].name
        }
      }
    }
  }
}
</script>

<style scoped>
.file {
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: -1;
}

.sexy-file {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  height: 40px;
  width: 300px;
}

.sexy-file:focus {
  outline: none;
  border-bottom: 1px solid #FF8E53;
}
</style>

