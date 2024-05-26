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

function getArticleListAPI(params) {
    return request({
        url: '/getarticles',
        method: 'GET',
        params: params
    });
}

function deleteArticleAPI(id) {
    return request({
        url: `/deletearticle/${id}`,
        method: 'DELETE'
    });
}

function fetchArticleAPI(id) {
    return request({
        url: `/fetcharticle/${id}`,
        method: 'GET'
    });
}


export { getChannelsAPI, createArticleAPI, getArticleListAPI, deleteArticleAPI, fetchArticleAPI }