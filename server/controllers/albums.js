import asyncBusboy from 'async-busboy'
import Router from 'koa-router'
import db from '../models'
import { passport } from '../auth'

const Album = db.Album
const Image = db.Image
const albums = new Router({ prefix: '/albums' })

albums.get('/', async ctx => {
  try {
    const albums = await Album.findAll({
      attributes: ['id', 'name'],
      include: [{ model: Image, as: 'Cover', attributes: ['path'] }]
    })
    ctx.body = JSON.stringify(albums)
  } catch (e) {
    ctx.body = `Error: ${e}`
  }
})

albums.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    if (ctx.isAuthenticated()) {
      const { fields } = await asyncBusboy(ctx.req)
      const newAlbum = {
        name: fields.name || null
      }
      try {
        const album = await Album.create(newAlbum)
        ctx.body = JSON.stringify(album)
      } catch (e) {
        ctx.status = 500
        ctx.body = `Error: ${e}`
      }
    } else {
      ctx.status = 403
      ctx.body = 'Forbidden'
    }
  }
)

albums.get('/:id', async ctx => {
  try {
    const id = ctx.params.id
    const albums = await Album.findOne({
      where: { id },
      attributes: ['id', 'name'],
      include: [
        { model: Image, as: 'Images', attributes: ['id', 'path', 'alt'] }
      ]
    })
    ctx.body = JSON.stringify(albums)
  } catch (e) {
    ctx.body = `Error: ${e}`
  }
})

albums.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const id = ctx.params.id
      const { fields } = await asyncBusboy(ctx.req)
      const album = Album.findById(id)
      const savedAlbum = await Album.update(
        {
          name: fields.name || album.name
        },
        { where: { id } },
        { returning: true }
      )
      ctx.body = JSON.stringify(savedAlbum)
    } catch (e) {
      ctx.status = 500
      ctx.body = `Error: ${e}`
    }
  }
)

albums.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const id = ctx.params.id
      const album = await Album.destroy(
        { where: { id }, individualHooks: true, cascade: true },
        { returning: true }
      )
      ctx.body = JSON.stringify(album)
    } catch (e) {
      ctx.status = 500
      ctx.body = `Error: ${e}`
    }
  }
)

export default albums
