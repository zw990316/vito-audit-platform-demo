import request from '@/utils/service/index'

export function getAuditUserInfoApi(data) {
    return request({
      url: '/api/audit/userInfo',
      data,
      method: 'post',
    })
  }

  export function getAuditAdDataApi(data) {
    return request({
      url: '/api/audit/adData',
      data,
      method: 'post',
    })
  }