// 從 '@/utils/request' 導入 request 函數
import request from '@/utils/request'

export function getStudetnBookBot(params) {
  return request({
    url: `/chatbot/student-book-bot/`,
    method: 'get',
    params
  })
}

export function creatStudentBookBot(data) {
  return request({
    url: `/chatbot/student-book-bot/`,
    method: 'post',
    data
  })
}
