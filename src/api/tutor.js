import { GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `tutor/profile/${endpoint}`
}

export const getTutors = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getAll/${page}`)
    return GET(endpoint, token)
}