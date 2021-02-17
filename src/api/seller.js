import request from '@/utils/request'

export function getStore(params) {
  return request({
    url: '/seller/queryByID',
    method: 'get',
    params
  })
}

export function getStoreList(params) {
  return request({
    url: '/seller/sellerList',
    method: 'get',
    params
  })
}

export function getRunningCount() {
  return request({
    url: '/seller/runningCount',
    method: 'get'
  })
}

export function bannedStore(data) {
  return request({
    url: '/seller/updateStatus',
    method: 'post',
    data
  })
}
