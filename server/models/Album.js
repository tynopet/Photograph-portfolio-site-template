export default (sequelize, DataTypes) => {
  const Album = sequelize.define('album', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'You need to set a album name'
        }
      }
    }
  })
  return Album
}
