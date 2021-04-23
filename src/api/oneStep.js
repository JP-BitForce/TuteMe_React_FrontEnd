import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `oneStep/${endpoint}`
}

export const getTags = (token) => {
    const endpoint = getEndpointWithPrefix(`getTags`)
    return GET(endpoint, token)
}

export const postQuestion = (token, body) => {
    const endpoint = getEndpointWithPrefix('add_new_question')
    return POST(endpoint, body, token)
}

export const getQuestions = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getQuestions/${page}`)
    return GET(endpoint, token)
}