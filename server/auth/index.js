import passport from 'koa-passport'
import { Strategy as LocalStategy } from 'passport-local'
import jwt from 'jsonwebtoken'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import db from '../models'

const User = db.User
const jwtsecret = 'mysecretkey'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret
}

passport.use(
  new LocalStategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user || !user.checkPassword(password)) {
            return done(null, false, {
              message: 'User not found or incorrect password'
            })
          }
          return done(null, user)
        })
        .catch(e => done(e))
    }
  )
)

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id)
      if (user) return done(null, user)
      return done(null, false)
    } catch (e) {
      return done(e)
    }
  })
)

const sign = payload => jwt.sign(payload, jwtsecret)

export { passport, sign }
