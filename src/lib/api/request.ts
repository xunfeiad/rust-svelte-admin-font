import { PostType } from '$lib/enum'
import Cookies from 'js-cookie'
import { goto } from '$app/navigation';
import {transformObj2Params} from '$lib/utils'
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'
  headers?: { [key: string]: string }
  body?: BodyInit,
  params?: String
}

export interface ResponseMessage{
  code: number
  message?: string
  page?: number,
  total?: number,
  data?: Array<object>,
  access_token?: string
}


// 定义拦截器的接口
interface Intercepter<T> {
  onFulfilled?: (value: T) => T | Promise<T>
  onRejected?: (error: any) => any
}

// 定义拦截器管理类-用于管理多个拦截器，可以通过 `use()`方法相拦截器数组中添加一个拦截器，通过`forEach()`方法对所有的拦截器进行遍历和执行
class InterceptorManager<T> {
  private interceptors: Array<Intercepter<T>>
  constructor() {
    this.interceptors = []
  }

  use(intercepor: Intercepter<T>) {
    this.interceptors.push(intercepor)
  }

  forEach(fn: (interceptor: Intercepter<T>) => void) {
    this.interceptors.forEach((interceptor) => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }
}

// 添加拦截器的 `request` 函数
async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<any> {
  const requestInterceptors = new InterceptorManager<RequestOptions>()
  const responseInterceptors = new InterceptorManager<any>()
  // 添加请求拦截器
  requestInterceptors.use({
    onFulfilled: (options): RequestOptions => {
      // 处理请求;
      const access_token = Cookies.get("access_token")
      if(!access_token){
        goto("/authentication/sign-in")
      }
      console.log('请求拦截，处理请求')
      return options
    },
    onRejected: (error: any): any => {
      console.log('请求拦截器: 处理错误', error)
      return error
    },
  })

  // 添加响应拦截器
  responseInterceptors.use({
    onFulfilled: (response): any => {
      // 处理响应
      console.log('响应拦截器:处理响应')
      if(response.status === 301){
        goto("/") 
      }
      return response
    },
    onRejected: (error) => {
      console.log('响应拦截器: 处理错误', error)
      return error
    },
  })

  requestInterceptors.forEach(async (interceptor) => {
    options = (await interceptor.onFulfilled?.(options)) ?? options
  })
  let response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: options.headers || {
      'Content-Type': 'application/json',
    },
    body: options.body,
  })

  // 处理响应拦截器，一一遍历所有的响应拦截器，并执行onFulfilled方法，将返回值赋值给response
  responseInterceptors.forEach((intercepor) => {
    response = intercepor.onFulfilled?.(response) ?? response
  })

  return response.json() as Promise<T>
}

export const get = async(url: string, params: any): Promise<ResponseMessage> => {
  url = transformObj2Params(params, url)
  const response = await request(url, {
    method: 'GET',
    params
  })
  return response as Promise<ResponseMessage>
}
export const post = async <T>(
  url: string,
  body: T,
  postType: PostType = PostType.Json
): Promise<ResponseMessage> => {
  const response = await request(url, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return response as Promise<ResponseMessage>
}
export const put = async <T>(url: string, body: BodyInit): Promise<T> => {
  const response = await request(url, {
    method: 'PUT',
    body,
  })
  return response as Promise<T>
}
export const del = async <T>(url: string, params: BodyInit): Promise<T> => {
  const response = await request(url, {
    method: 'DELETE',
    body: params,
  })
  return response as Promise<T>
}
