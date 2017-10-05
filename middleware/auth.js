import { axios, cookie } from '~/hellpers'

export default async function ({ req, route, isServer, redirect }) {
  const token = isServer
    ? cookie.getCookie('auth-token', req)
    : localStorage.getItem('auth-token')
  if (route.path === '/auth' && token) {
    const { data } = await axios.get('/api/auth', {
      headers: {
        Authorization: token
      }
    })
    if (data.status) {
      redirect('/admin')
    }
  } else {
    if (!token) {
      redirect('/auth')
    } else {
      const { data } = await axios.get('/api/auth', {
        headers: {
          Authorization: token
        }
      })
      if (data.error || !data.status) {
        redirect('/auth')
      }
    }
  }
}
