import path from 'path'
import fs from 'fs-extra'

const imagesPath = '/images'
const publicPath = path.join(process.cwd(), './static')
const uploadPath = path.join(publicPath, imagesPath)

const directoryIsExist = fs.existsSync(uploadPath)

if (!directoryIsExist) {
  fs.mkdirSync(uploadPath)
}

export function saveFile (file) {
  return new Promise((resolve, reject) => {
    const filename = `${new Date().getTime().toString()}_${file.filename}`
    const fullPath = path.join(uploadPath, filename)
    console.log(fullPath)
    const writeStream = fs.createWriteStream(fullPath)
    const stream = file.pipe(writeStream)
    stream.on('finish', () => resolve(path.join(imagesPath, filename)))
    stream.on('error', e => reject(e))
  })
}

export function deleteFile (filepath) {
  return fs.remove(path.join(publicPath, filepath))
}
