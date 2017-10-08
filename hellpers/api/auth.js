import qs from 'qs'

const createAuthApi = axios => {
  const checkToken = token =>
    axios.get('/api/auth', {
      headers: {
        Authorization: token
      }
    })

  const login = (email, password) =>
    axios.post(
      '/api/auth',
      qs.stringify({
        email,
        password
      })
    )

  return {
    checkToken,
    login
  }
}

export default createAuthApi
