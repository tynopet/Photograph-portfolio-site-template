<template>
  <section>
    <album-image v-for="image in album.Images" :key="image.id" :src="image.path" :alt="image.alt">
      <sexy-float-button @click="handleCoverChange(image)" right="150px" left="">
        <i class="fa fa-paint-brush"></i>
      </sexy-float-button>
      <sexy-float-button @click="handleEditImage(image)" right="75px" left="">
        <i class="fa fa-pencil"></i>
      </sexy-float-button>
      <sexy-float-button @click="handleRemoveImage(image)">
        <i class="fa fa-trash"></i>
      </sexy-float-button>
    </album-image>
    <portal to="modal">
      <modal v-show="showModal" @close="handleCloseModal">
        <span slot="header">{{ imageParams.header }}</span>
        <form slot="body" @submit.prevent="handleSubmit" class="image-form">
          <sexy-input autofocus v-model="image.alt" name="alt" type="text" placeholder="Описание картинки" />
          <sexy-file-input name="image" type="file" />
          <sexy-error v-show="error">{{ error }}</sexy-error>
          <sexy-button>{{ imageParams.text }}</sexy-button>
        </form>
      </modal>
    </portal>
    <portal to="float-button">
      <sexy-float-button @click="handleCreateImage" left="15px" right="" :fixed="true">
        <i class="fa fa-plus"></i>
      </sexy-float-button>
    </portal>
  </section>
</template>

<script>
import { Api } from '~/hellpers'
import Image from '~/components/Image'
import Modal from '~/components/Modal'
import SexyButton from '~/components/Button'
import SexyError from '~/components/Error'
import SexyFileInput from '~/components/FileInput'
import SexyFloatButton from '~/components/FloatButton'
import SexyInput from '~/components/Input'

export default {
  layout: 'admin',
  head: {
    title: 'Редактирование альбома'
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  middleware: 'auth',
  components: {
    'album-image': Image,
    Modal,
    SexyButton,
    SexyError,
    SexyFileInput,
    SexyFloatButton,
    SexyInput
  },
  data () {
    return {
      album: {},
      error: null,
      image: {},
      imageParams: {},
      showModal: false
    }
  },
  async asyncData ({ params }) {
    const { data } = await Api.Albums.find(params.id)
    return { album: data }
  },
  methods: {
    async handleCoverChange ({ id }) {
      try {
        const image = new FormData()
        image.append('cover_id', this.album.id)
        await Api.Images.save(id, image)
        alert('Успех')
      } catch (e) {
        alert('Не удалось поменять обложку альбома')
      }
    },
    handleEditImage (image) {
      this.image = {
        id: image.id,
        path: image.path,
        alt: image.alt
      }
      this.imageParams = {
        action: 'save',
        header: `Редактирование изображения ${image.alt}`,
        text: 'Сохранить'
      }
      this.showModal = true
    },
    handleCloseModal () {
      this.showModal = false
      this.image = {}
      this.imageParams = {}
      this.error = null
    },
    handleCreateImage () {
      this.image = {
        path: '',
        alt: ''
      }
      this.imageParams = {
        action: 'create',
        header: 'Добавление изображения',
        text: 'Добавить'
      }
      this.showModal = true
    },
    async handleRemoveImage ({ id, alt }) {
      const confirm = window.confirm(`Точно удалить ${alt}?`)
      if (confirm) {
        const { data } = await Api.Images.remove(id)
        this.album.Images = this.album.Images.filter(img => img.id !== id)
      }
    },
    async handleSubmit (e) {
      const image = new FormData(e.target)
      try {
        if (this.imageParams.action === 'save') {
          const { id } = this.image
          const { data } = await Api.Images.save(id, image)
          this.album.Images = this.album.Images.map(img => (img.id === id ? data : img))
        } else if (this.imageParams.action === 'create') {
          image.append('album_id', this.album.id)
          const { data } = await Api.Images.create(image)
          this.album.Images = [...this.album.Images, data]
        }
        this.showModal = false;
        this.error = null
        this.image = {}
        this.imageParams = {}
      } catch (e) {
        if (e.response.status === 401) {
          this.$route.replace('/auth')
        } else {
          if (e.response.data.error) {
            this.error = e.response.data.error
          } else {
            this.error = 'Внутренняя ошибка сервера. Свяжитесь с разработчиком'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.image-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
