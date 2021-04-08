import { GET, PUT, MULTIPART } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `student/profile/${endpoint}`
}

export const getProfileDetails = (token, userId) => {
    const endpoint = getEndpointWithPrefix(`${userId}`);
    return GET(endpoint, token)
}

export const updateStudentProfile = (token, stId, userDetails) => {
    const endpoint = getEndpointWithPrefix(`${stId}`)
    return PUT(endpoint, userDetails, token)
}

export const updateStudentProfilePic = (token, userId, formData) => {
    const endpoint = getEndpointWithPrefix(`upload/${userId}`)
    return MULTIPART(endpoint, formData, token)
}