import request from '@/utils/request'

// 新增書籍
export function createBook(data) {
  return request({
    url: '/courses/books/',
    method: 'post',
    data
  })
}
// 获取書籍列表
export function getBooks(data) {
  return request({
    url: '/courses/books/',
    method: 'get',
    params: data
  })
}

// 获取書籍详情
export function getBook(book_id) {
  return request({
    url: `/courses/books/${book_id}/`,
    method: 'get'
  })
}

// 修改書籍
export function updateBook(id, data) {
  return request({
    url: `/courses/books/${id}/`,
    method: 'put',
    data
  })
}
// // 新增用户
// export function createUser(data) {
//   return request({
//     url: '/system/users/',
//     method: 'post',
//     data
//   })
// }

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/system/users/${id}/`,
    method: 'delete'
  })
}

// 批量删除用户
export function deleteUsers(ids) {
  return request({
    url: '/system/users/',
    method: 'delete',
    data: { 'ids': ids }
  })
}

// 修改用户
export function updateUser(id, data) {
  return request({
    url: `/system/users/${id}/`,
    method: 'put',
    data
  })
}

// 修改用户状态
export function updateUserActive(id, data) {
  return request({
    url: `/system/users/${id}/`,
    method: 'patch',
    data
  })
}

// // 获取用户列表
// export function getUsers(data) {
//   return request({
//     url: '/system/users/',
//     method: 'get',
//     params: data
//   })
// }

// // 获取用户详情
// export function getUser(id) {
//   return request({
//     url: `/system/users/${id}/`,
//     method: 'get'
//   })
// }

// 重置密码
export function resetPassword(id, data) {
  return request({
    url: `/system/users/reset-password/${id}/`,
    method: 'patch',
    data
  })
}

// 获取用户权限列表
export function getUserPermissions(id) {
  return request({
    url: `/system/users/${id}/permissions/`,
    method: 'get'
  })
}
