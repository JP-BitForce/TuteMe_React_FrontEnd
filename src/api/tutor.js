import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `tutor/profile/${endpoint}`
}

export const getTutors = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getAll/${page}`)
    return GET(endpoint, token)
}

export const searchTutorByValue = (token, page, value) => {
    const endpoint = getEndpointWithPrefix(`search_tutor_by_value?value=${value}&page=${page}`)
    return GET(endpoint, token)
}

export const filterTutorsByCategories = (token, body) => {
    const endpoint = getEndpointWithPrefix(`filter_tutor_by_category`)
    return POST(endpoint, body, token)
}