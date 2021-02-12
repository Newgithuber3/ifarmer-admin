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

export function getUserList(data) {
  return request({
    url: '/user/userList',
    method: 'post',
    data: data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function getUser(params) {
  return request({
    url: '/user/queryUser',
    method: 'get',
    params
  })
}

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/deleteUser',
    method: 'get',
    params
  })
}
