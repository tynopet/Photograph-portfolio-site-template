<template>
  <div class="container">
    <album v-for="album in albums" :key="album.id" :to="`/admin/${album.id}`" :album="album">
      <sexy-float-button @click="handleEditAlbum(album)" right="75px" left="">🖊</sexy-float-button>
      <sexy-float-button @click="handleRemoveAlbum(album)">🗑</sexy-float-button>
    </album>
    <portal to="modal">
      <modal v-show="showModal" @close="handleCloseModal">
        <span slot="header">{{ albumParams.header }}</span>
        <form slot="body" @submit.prevent="handleSubmit" class="admin-form">
          <sexy-input v-model="album.name" type="text" placeholder="Название альбома" />
          <sexy-error v-show="error">{{ error }}</sexy-error>
          <sexy-button>{{ albumParams.text }}</sexy-button>
        </form>
      </modal>
    </portal>
    <portal to="float-button">
      <sexy-float-button @click="handleCreateAlbum" left="15px" right="" :fixed="true">➕</sexy-float-button>
    </portal>
  </div>
</template>

<script>
import { Albums } from '~/hellpers/api'
import Album from '~/components/Album'
import Modal from '~/components/Modal'
import SexyButton from '~/components/Button'
import SexyError from '~/components/Error'
import SexyFloatButton from '~/components/FloatButton'
import SexyInput from '~/components/Input'

export default {
  middleware: 'auth',
  components: {
    Album,
    Modal,
    SexyButton,
    SexyError,
    SexyFloatButton,
    SexyInput
  },
  data () {
    return {
      albums: [],
      showModal: false,
      album: {},
      albumParams: {},
      error: null
    }
  },
  async asyncData () {
    const { data } = await Albums.fetch()
    return { albums: data }
  },
  methods: {
    handleEditAlbum (album) {
      this.album = {
        id: album.id,
        name: album.name
      }
      this.albumParams = {
        action: 'save',
        header: `Редактирование альбома ${album.name}`,
        text: 'Сохранить'
      }
      this.showModal = true
    },
    handleCloseModal () {
      this.showModal = false
      this.album = {}
      this.albumParams = {}
      this.error = null
    },
    handleCreateAlbum () {
      this.album = {
        name: ''
      }
      this.albumParams = {
        action: 'create',
        header: 'Создание альбома',
        text: 'Создать'
      }
      this.showModal = true
    },
    async handleRemoveAlbum ({ id, name }) {
      const confirm = window.confirm(`Точно удалить ${name}?`)
      if (confirm) {
        const { data } = await Albums.remove(id)
        this.albums = this.albums.filter(album => album.id !== id)
      }
    },
    async handleSubmit () {
      const album = new FormData()
      try {
        if (this.albumParams.action === 'save') {
          const { id, name } = this.album
          album.append('name', name)
          const { data } = await Albums.save(id, album)
          this.albums = this.albums.map(album => (album.id === id ? data : album))
        } else if (this.albumParams.action === 'create') {
          const { name } = this.album
          album.append('name', name)
          const { data } = await Albums.create(album)
          this.albums = { ...this.albums, data }
        }
        this.showModal = false;
        this.error = null
        this.album = {}
        this.albumParams = {}
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

<style>
.container {
  display: flex;
  flex-direction: column;
}

.admin-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
