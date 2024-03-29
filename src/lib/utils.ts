export const transformObj2Params = (obj:Object,url:string) =>{
    const res =  Object.entries(obj)
    .filter(e=>e[0].trim().length > 0)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
    console.log(res)
    if (res.trim().length > 0){
        return `${url}?${res}`
    }else{
        return url
    }
}

