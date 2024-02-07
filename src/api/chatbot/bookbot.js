// 從 '@/utils/request' 導入 request 函數
import request from '@/utils/request'

export function getStudentBookBot(params) {
  return request({
    url: `/chatbot/student-book-bot/`,
    method: 'get',
    params
  })
}

export function createStudentBookBot(data) {
  return request({
    url: `/chatbot/student-book-bot/`,
    method: 'post',
    data
  })
}
