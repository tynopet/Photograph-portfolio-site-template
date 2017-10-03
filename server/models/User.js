import crypto from 'crypto'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        notEmpty: {
          message: 'You need to set a email'
        },
        isEmail: true
      }
    },
    passwordHash: DataTypes.TEXT,
    salt: DataTypes.TEXT,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (password) {
        if (password) {
          this.salt = crypto.randomBytes(256).toString('base64')
          this.passwordHash = crypto
            .pbkdf2Sync(password, this.salt, 100, 512, 'sha512')
            .toString('base64')
        } else {
          this.salt = undefined
          this.passwordHash = undefined
        }
      },
      get: function () {
        return this.passwordHash
      }
    }
  })
  User.prototype.checkPassword = function (password) {
    if (!password) return false
    if (!this.passwordHash) return false
    return (
      crypto
        .pbkdf2Sync(password, this.salt, 100, 512, 'sha512')
        .toString('base64') === this.passwordHash
    )
  }
  return User
}
