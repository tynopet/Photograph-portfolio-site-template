import Router from 'koa-router'
import about from './about'
import albums from './albums'
import images from './images'
import auth from './auth'

const api = new Router({ prefix: '/api' })

api.get('/', ctx => {
  ctx.body = 'Hello world!'
})

api.use(auth.routes())
api.use(about.routes())
api.use(albums.routes())
api.use(images.routes())

export default api
