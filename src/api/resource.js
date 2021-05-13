import { MULTIPART, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `resource/${endpoint}`
}

export const uploadFile = (token, formData) => {
    const endpoint = getEndpointWithPrefix(`upload_file`)
    return MULTIPART(endpoint, formData, token)
}

export const uploadVideo = (token, formData) => {
    const endpoint = getEndpointWithPrefix(`upload_video`)
    return MULTIPART(endpoint, formData, token)
}

export const uploadLink = (token, body) => {
    const endpoint = getEndpointWithPrefix(`upload_link`)
    return POST(endpoint, body, token)
}
