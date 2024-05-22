import { request } from "@/utils";

function loginAPI(formdata){
    return request({
        url:'/login',
        method:'POST',
        data:formdata
    })
}

function registerAPI(formdata){
    return request({
        url:'/register',
        method:'POST',
        data:formdata
    })
}

function protectedAPI(){
    return request({
        url:'/protected',
        method:'POST'
    })
}

export {loginAPI, registerAPI, protectedAPI}