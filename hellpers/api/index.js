import axios from 'axios'
import createAboutApi from './about'
import createAlbumsApi from './albums'
import createAuthApi from './auth'

axios.defaults.baseURL = 'http://localhost:3000'

const About = createAboutApi(axios)
const Albums = createAlbumsApi(axios)
const Auth = createAuthApi(axios)

export { About, Albums, Auth }
