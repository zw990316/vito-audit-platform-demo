import axios from 'axios'
class Request {
  config
  instance
  interceptorHooks

  constructor(options) {
    this.config = options
    this.instance = axios.create(options)
    this.interceptorHooks = options.interceptorHooks
    this.setupInterceptor()
  }

  setupInterceptor() {
    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    // 类拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      async (response) => {
        return response.data
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  request(config){
    return new Promise((resolve, reject) => {
      // 接口拦截器
      if (config.interceptorHooks?.requestInterceptor) {
        config = config.interceptorHooks.requestInterceptor(config)
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptorHooks?.responseInterceptor) {
            res = config.interceptorHooks.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default Request
