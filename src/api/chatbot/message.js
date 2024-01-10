// 從 '@/utils/request' 導入 request 函數
import request from '@/utils/request'

// 新增對話
export function sendMessage(data) {
  return request({
    url: '/chatbot/save-message/',
    method: 'put',
    data
  })
}

// 取得對話
export function getMessage(data) {
  return request({
    url: '/chatbot/get-message/',
    method: 'get',
    data
  })
}
