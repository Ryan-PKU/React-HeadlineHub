import axios from 'axios'
import { getLocalToken } from './token'

const request = axios.create({
    baseURL: 'http://localhost:8880',
    timeout: 8000
})


request.interceptors.request.use(config => {
    // if not login add token
    const token = getLocalToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {

    return Promise.reject(error)
})


request.interceptors.response.use((response) => {

    return response.data
}, (error) => {

    return Promise.reject(error)
})

export { request }