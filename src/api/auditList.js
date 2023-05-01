import request from '@/utils/service/index'

export function getAuditListApi(data) {
    return request({
      url: 'api/audit/list',
      data,
      method: 'post',
    })
  }
  

export function deleteTableDateApi(data) {
  return request({
    url: 'api/audit/delete',
    data,
    method: 'post',
  })
}