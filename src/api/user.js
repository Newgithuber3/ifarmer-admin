import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/adminLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/user/userList',
    method: 'post',
    data: data
  })
}
