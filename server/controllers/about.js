import asyncBusboy from 'async-busboy'
import Router from 'koa-router'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { saveFile } from '../utils'
import db from '../models'
import { passport } from '../auth'

const About = db.About
const about = new Router({ prefix: '/about' })
const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

about.get('/', async ctx => {
  try {
    const about = await About.findAll({
      attributes: [
        'id',
        'backgroundImage',
        'firstName',
        'lastName',
        'email',
        'title',
        'text'
      ]
    })
    ctx.body = JSON.stringify(about)
  } catch (e) {
    ctx.body = JSON.stringify({ error: e })
  }
})

about.post('/', passport.authenticate('jwt', { session: false }), async ctx => {
  try {
    const { files, fields } = await asyncBusboy(ctx.req)
    const background =
      files.length && files[0].filename.length ? await saveFile(files[0]) : null
    const about = await About.create({
      email: fields.email || null,
      firstName: fields.first_name || null,
      lastName: fields.last_name || null,
      title: fields.title || null,
      text: fields.text ? DOMPurify.sanitize(fields.text) : null,
      backgroundImage: background
    })
    ctx.body = JSON.stringify(about)
  } catch (e) {
    ctx.status = 500
    ctx.body = JSON.stringify({ error: e })
  }
})

about.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const id = ctx.params.id
      const { files, fields } = await asyncBusboy(ctx.req)
      const about = await About.findById(id)
      const background =
        files.length && files[0].filename.length
          ? await saveFile(files[0])
          : null
      await About.update(
        {
          email: fields.email || about.email,
          firstName: fields.first_name || about.firstName,
          lastName: fields.last_name || about.lastName,
          title: fields.title || about.title,
          text: fields.text ? DOMPurify.sanitize(fields.text) : about.text,
          backgroundImage: background || about.backgroundImage
        },
        { where: { id } }
      )
      const savedAbout = await About.findOne({
        where: { id },
        attributes: [
          'id',
          'backgroundImage',
          'firstName',
          'lastName',
          'email',
          'title',
          'text'
        ]
      })
      ctx.body = JSON.stringify(savedAbout)
    } catch (e) {
      ctx.status = 500
      ctx.body = JSON.stringify({ error: e })
    }
  }
)

about.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    try {
      const id = ctx.params.id
      const about = await About.destroy(
        { where: { id }, individualHooks: true },
        { returning: true }
      )
      ctx.body = JSON.stringify(about)
    } catch (e) {
      ctx.status = 500
      ctx.body = JSON.stringify({ error: e })
    }
  }
)

export default about
