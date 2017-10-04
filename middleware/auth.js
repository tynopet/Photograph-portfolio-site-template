import axios from 'axios'

const getCookie = (cname, req) => {
  let name = cname + '='
  let decodedCookie
  if (typeof window === 'undefined') {
    decodedCookie = decodeURIComponent(req.headers.cookie)
  } else decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default async function ({ req, isServer, redirect }) {
  const token = isServer
    ? getCookie('auth-token', req)
    : localStorage.getItem('auth-token')
  if (!token) {
    redirect('/auth')
  } else {
    const { data } = await axios.get('http://localhost:3000/api/auth', {
      headers: {
        Authorization: token
      }
    })
    if (data.error || !data.status) {
      redirect('/auth')
    }
  }
}
