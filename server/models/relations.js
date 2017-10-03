export default ({ Album, Image }) => {
  Album.hasMany(Image, {
    as: 'Images',
    onDelete: 'cascade',
    foreignKey: { allowNull: false },
    foreignKeyConstraint: true,
    hooks: true
  })
  Album.hasOne(Image, {
    as: 'Cover',
    foreignKey: 'coverId',
    foreignKeyConstraint: true,
    onDelete: 'cascade'
  })
  Image.belongsTo(Album, {
    hooks: true
  })
}
