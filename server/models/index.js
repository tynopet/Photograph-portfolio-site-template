import Sequelize from 'sequelize'
// require('sequelize-isunique-validator')(Sequelize)
import createRelations from './relations'
import About from './About'
import Album from './Album'
import Image from './Image'
import User from './User'

const sequelizeConnection = new Sequelize('test', 'test', 'test', {
  host: '172.17.0.2',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8'
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const db = {
  Sequelize: Sequelize,
  sequelize: sequelizeConnection
}

db.About = About(db.sequelize, db.Sequelize)
db.Image = Image(db.sequelize, db.Sequelize)
db.Album = Album(db.sequelize, db.Sequelize)
db.User = User(db.sequelize, db.Sequelize)
createRelations(db)

export default db
