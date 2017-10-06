<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <span class="close" @click="$emit('close')">❌</span>
        <div class="modal-container">
          <div class="modal-header">
            <h3>
              <slot name="header">Редакторование элемента</slot>
            </h3>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}

.modal-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close {
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
  color: #FE6B8B;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #3e365f;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: flex;
  justify-content: center;
}

.modal-header>h3 {
  margin-top: 0;
  color: #FE6B8B;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

