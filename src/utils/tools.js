// http.js封装axios的请求方式(get请求、post请求) 
// 封装axios超时请求时间
// token设置


import axios from 'axios' // 引用axios
import config from '@/api/config'
const _baseUrl = config.baseUrl.dev // 使用到代理
const apiUrl = _baseUrl
// axios 配置
axios.defaults.timeout = 120000 // 设置接口响应时间
axios.defaults.baseURL = 'api' // 这是调用数据接口,公共接口url+调用接口名

// axios.defaults.headers.common['X-Access-Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzkxMTYzMzcsInVzZXJuYW1lIjoiYWRtaW4ifQ.YPJ7BV_Pg27NtPVk0FfoYsTXRpR35KXA64mMDibUzHI';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const service = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  timeout: 20000 // 请求超时 20s
})
// 封装get请求
export function get(url, params = {},header={}) {
  return new Promise((resolve, reject) => {
    service
      .get(apiUrl+url, {
        params: params,
        headers:header
      })
      .then(response => {
        console.log(response)
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
 
// 封装post请求
export function post(url, data = {},header={}) {
  console.log(data)
  return new Promise((resolve, reject) => {
    service.post(apiUrl+url, data,{
      headers:header
    }).then(
      response => {
        // console.log(response.data.code)
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
