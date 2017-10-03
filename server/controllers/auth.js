import asyncBusboy from 'async-busboy'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import db from '../models'
import { passport, sign } from '../auth'

const User = db.User
const auth = new Router({ prefix: '/auth' })

auth.get('/', async ctx => {
  ctx.body = JSON.stringify(await User.findAll())
})

auth.post('/', bodyParser(), async (ctx, next) => {
  try {
    await passport.authenticate('local', (err, user) => {
      if (err) {
        ctx.status = 500
        ctx.body = `Error ${err}`
      }
      if (!user) {
        ctx.body = 'Login failed'
      } else {
        const payload = {
          id: user.id,
          email: user.email
        }
        const token = sign(payload)
        ctx.body = JSON.stringify({ token: `Bearer ${token}` })
      }
    })(ctx, next)
  } catch (e) {
    ctx.status = 500
    ctx.body = `Error ${e}`
  }
})

auth.post('/create', async (ctx, next) => {
  try {
    const { fields } = await asyncBusboy(ctx.req)
    await User.create({
      email: fields.email || null,
      password: fields.password || null
    })
    ctx.body = 'OK'
  } catch (e) {
    ctx.status = 500
    ctx.body = `Error ${e}`
  }
})

export default auth
