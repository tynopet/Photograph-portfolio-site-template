import { Api, cookie } from '~/hellpers'

export default async function ({ req, route, isServer, redirect }) {
  const token = isServer
    ? cookie.getCookie('auth-token', req)
    : localStorage.getItem('auth-token')
  if (route.path === '/auth' && token) {
    const { data } = await Api.Auth.checkToken(token)
    if (data.status) {
      redirect('/admin')
    }
  } else {
    if (!token) {
      redirect('/auth')
    } else {
      const { data } = await Api.Auth.checkToken(token)
      if (data.error || !data.status) {
        redirect('/auth')
      }
    }
  }
}
