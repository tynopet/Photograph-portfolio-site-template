const createImagesApi = axios => {
  const fetch = () => axios.get('/api/images')

  const save = (id, data) => {
    const token = localStorage.getItem('auth-token')
    return axios({
      method: 'put',
      url: `/api/images/${id}`,
      headers: {
        Authorization: token
      },
      data
    })
  }

  const create = data => {
    const token = localStorage.getItem('auth-token')
    return axios({
      method: 'post',
      url: '/api/images',
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
      url: `/api/images/${id}`,
      headers: {
        Authorization: token
      }
    })
  }

  return {
    create,
    fetch,
    remove,
    save
  }
}

export default createImagesApi
