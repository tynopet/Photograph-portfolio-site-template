const createAboutApi = axios => {
  const fetch = () => axios.get('/api/about')

  const save = (id, data) => {
    const token = localStorage.getItem('auth-token')
    return axios({
      method: 'put',
      url: `/api/about/${id}`,
      headers: {
        Authorization: token
      },
      data
    })
  }

  return {
    fetch,
    save
  }
}

export default createAboutApi
