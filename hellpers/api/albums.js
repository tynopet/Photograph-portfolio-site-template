const createAlbumsApi = axios => {
  const fetch = () => axios.get('/api/albums')

  const find = id => axios.get(`/api/albums/${id}`)

  const create = data => {
    const token = localStorage.getItem('auth-token')
    return axios({
      method: 'post',
      url: '/api/albums',
      headers: {
        Authorization: token
      },
      data
    })
  }

  const save = (id, data) => {
    const token = localStorage.getItem('auth-token')
    return axios({
      method: 'put',
      url: `/api/albums/${id}`,
      headers: {
        Authorization: token
      },
      data
    })
  }

  const remove = id => {
    const token = localStorage.getItem('auth-token')
    return axios({
      method: 'delete',
      url: `/api/albums/${id}`,
      headers: {
        Authorization: token
      }
    })
  }

  return {
    create,
    fetch,
    find,
    remove,
    save
  }
}

export default createAlbumsApi
