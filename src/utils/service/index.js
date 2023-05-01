import Request from './request'
const request = new Request({
    baseURL: 'http://127.0.0.1:4523/m1/2670099-0-default',
    timeout: 5000,
    interceptorHooks: {
      requestInterceptor: (config) => {
        return config
      },
      requestInterceptorCatch: (err) => {
        console.log('请求错了')
        return Promise.reject(err)
      },
      responseInterceptor: (res) => {
        return res
      },
      responseInterceptorCatch: (err) => {
        return Promise.reject(err)
      },
    },
  })
  
  const myRequest = function(config) {
    const { method } = config
    if (method === 'get' || method === 'GET') {
      config.params = config.data
    }
    return request.request(config)
  }
  
  export default myRequest