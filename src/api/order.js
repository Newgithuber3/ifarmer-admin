import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/order/orderList',
    method: 'post',
    data
  })
}

export function getOrder(params) {
  return request({
    url: '/order/queryOrder',
    method: 'get',
    params
  })
}

export function getAddress(params) {
  return request({
    url: '/common/getAddress',
    method: 'get',
    params
  })
}
