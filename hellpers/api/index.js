import axios from 'axios'
import createAboutApi from './about'
import createAlbumsApi from './albums'
import createAuthApi from './auth'
import createImagesApi from './images'

axios.defaults.baseURL = 'http://localhost:3000'

const About = createAboutApi(axios)
const Albums = createAlbumsApi(axios)
const Auth = createAuthApi(axios)
const Images = createImagesApi(axios)

export { About, Albums, Auth, Images }
