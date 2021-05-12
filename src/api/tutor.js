import { GET, POST, PUT, MULTIPART } from './core';

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

export const getTutorProfile = (token, tutorId) => {
    const endpoint = getEndpointWithPrefix(`get_tutor_profile/${tutorId}`)
    return GET(endpoint, token)
}

export const updateProfilePic = (token, userId, formData) => {
    const endpoint = getEndpointWithPrefix(`upload/${userId}`)
    return MULTIPART(endpoint, formData, token)
}

export const updateProfile = (token, userDetails) => {
    const endpoint = getEndpointWithPrefix(`update_profile`)
    return PUT(endpoint, userDetails, token)
}