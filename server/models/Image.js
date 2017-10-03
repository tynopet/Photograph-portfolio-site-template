import { deleteFile } from '../utils'

export default (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'image',
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a image'
          }
        }
      },
      alt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a alternative image text'
          }
        }
      }
    },
    {
      hooks: {
        afterDestroy: async (image, options) => {
          await deleteFile(image.path)
        }
      }
    }
  )
  return Image
}
