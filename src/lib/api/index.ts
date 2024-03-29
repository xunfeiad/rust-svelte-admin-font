import type{ResponseMessage} from "./request";
import {get,post, put, del} from "./request";

const BaseUrl = "http://localhost:33333/"
export const login =async(body:object):Promise<ResponseMessage>=>{
    return await post(`${BaseUrl}auth/user/login`, body)
}

export const getRoles =async(params:object):Promise<ResponseMessage>=>{
    return await get(`${BaseUrl}auth/user_role/`, params)
}



