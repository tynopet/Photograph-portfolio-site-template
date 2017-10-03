import { deleteFile } from '../utils'

export default (sequelize, DataTypes) =>
  sequelize.define(
    'about',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a first name'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a last name'
          }
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a text information'
          }
        }
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a text information'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a text information'
          },
          isEmail: true
        }
      },
      backgroundImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a backgorund-image'
          }
        }
      }
    },
    {
      hooks: {
        afterDestroy: async (about, options) => {
          await deleteFile(about.backgroundImage)
        }
      }
    }
  )
