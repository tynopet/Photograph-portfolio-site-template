import asyncBusboy from 'async-busboy'
import Router from 'koa-router'
import { saveFile, deleteFile } from '../utils'
import db from '../models'
import { passport } from '../auth'

const Image = db.Image
const images = new Router({ prefix: '/images' })

images.get('/', async ctx => {
  try {
    const images = await Image.findAll()
    ctx.body = JSON.stringify(images)
  } catch (e) {
    ctx.status = 500
    ctx.body = `Error ${e}`
  }
})

images.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const { files, fields } = await asyncBusboy(ctx.req)
      const path = files.length ? await saveFile(files[0]) : null
      const image = await Image.create({
        path: path,
        alt: fields.alt || null,
        albumId: fields.album_id || null,
        coverId: fields.cover_id || null
      })
      ctx.body = JSON.stringify(image)
    } catch (e) {
      ctx.status = 500
      ctx.body = `Error: ${e}`
    }
  }
)

images.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const id = ctx.params.id
      const { files, fields } = await asyncBusboy(ctx.req)
      const image = await Image.findById(id)
      const path = files.length ? await saveFile(files[0]) : null
      const savedImage = await Image.update(
        {
          path: path || image.path,
          alt: fields.alt || image.alt,
          albumId: fields.album_id || image.albumId
        },
        { where: { id } },
        { returning: true }
      )
      await deleteFile(image.path)
      ctx.body = JSON.stringify(savedImage)
    } catch (e) {
      ctx.status = 500
      ctx.body = `Error: ${e}`
    }
  }
)

images.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const id = ctx.params.id
      const image = await Image.destroy(
        { where: { id }, individualHooks: true },
        { returning: true }
      )
      ctx.body = JSON.stringify(image)
    } catch (e) {
      ctx.status = 500
      ctx.body = `Error: ${e}`
    }
  }
)

export default images
