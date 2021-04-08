import { MULTIPART, GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `blog/${endpoint}`
}

export const createNewBlog = (token, formData) => {
    const endpoint = getEndpointWithPrefix(`addNew`)
    return MULTIPART(endpoint, formData, token)
}

export const getAllBlogs = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getAll/${page}`)
    return GET(endpoint, token)
}
