export const transformObj2Params = (obj) =>{
    const res =  Object.entries(obj)
    .filter(e=>e[0].trim().length > 0)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    return res
}

const res1 = transformObj2Params({"name":"xunfei"})
const res2 = transformObj2Params({"name":" "})
const res3 = transformObj2Params({})
const res4 = transformObj2Params({"":""})
console.log(res1)
console.log(res2)
console.log(res3)
console.log(res4)

