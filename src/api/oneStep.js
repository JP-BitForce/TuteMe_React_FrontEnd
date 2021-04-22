import { GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `oneStep/${endpoint}`
}

export const getTags = (token) => {
    const endpoint = getEndpointWithPrefix(`getTags`)
    return GET(endpoint, token)
}