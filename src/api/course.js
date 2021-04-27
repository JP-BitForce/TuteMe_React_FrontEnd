import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `courses/${endpoint}`
}

export const getCourses = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getAll/${page}`)
    return GET(endpoint, token)
}

export const getEnrolledCourses = (token, stId, page) => {
    const endpoint = getEndpointWithPrefix(`enrollment/${stId}/${page}`)
    return GET(endpoint, token)
}

export const getFilterCategories = (token) => {
    const endpoint = getEndpointWithPrefix(`getFilterCategories`)
    return GET(endpoint, token)
}

export const getCourseCategories = (token, page) => {
    const endpoint = getEndpointWithPrefix(`category/getAll/${page}`)
    return GET(endpoint, token)
}

export const searchCourseByValue = (token, value, page) => {
    const endpoint = getEndpointWithPrefix(`searchCourseByValue?page=${page}&value=${value}`)
    return GET(endpoint, token)
}

export const filterCourses = (token, body) => {
    const endpoint = getEndpointWithPrefix(`filterCourses`)
    return POST(endpoint, body, token)
}