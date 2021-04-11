import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `blog/comment/${endpoint}`
}

export const getComments = (token, blogId) => {
    const endpoint = getEndpointWithPrefix(`getComments/${blogId}`)
    return GET(endpoint, token)
}

export const addReply = (token, body) => {
    const endpoint = getEndpointWithPrefix(`addCommentReply`)
    return POST(endpoint, body, token)
}

export const addComment = (token, body) => {
    const endpoint = getEndpointWithPrefix(`addComment`)
    return POST(endpoint, body, token)
}