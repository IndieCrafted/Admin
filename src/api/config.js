import axios from 'axios'

const isDev = window.location.host.indexOf('localhost') > -1

const baseURL = isDev ? 'http://127.0.0.1:7001' : 'https://api.wildnode.cc/beer/v1'

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

const createRequest = (method, url, data, options = {}) => {
  const configMap = {
    'get': {
      url,
      method: 'get',
      params: data,
      ...options
    },
    'post': {
      url,
      method: 'post',
      data,
      ...options
    },
    'postFile': {
      url,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...options
    },
    'put': {
      url,
      method: 'put',
      data,
      ...options
    },
    'delete': {
      url,
      method: 'delete',
      data,
      ...options
    }
  }
  return instance(configMap[method])
}

const api = {
  get: (url, data) => createRequest('get', url, data),
  post: (url, data) => createRequest('post', url, data),
  postFile: (url, data) => createRequest('postFile', url, data),
  put: (url, data) => createRequest('put', url, data),
  delete: (url, data) => createRequest('delete', url, data)
}

export default api
