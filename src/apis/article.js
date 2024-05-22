import { request } from "@/utils";

function getChannelsAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

function createArticleAPI(formData) {
    return request({
        url: '/uploadarticle',
        method: 'POST',
        data: formData
    })
}

export { getChannelsAPI, createArticleAPI }