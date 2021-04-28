import { GET, POST, MULTIPART } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `courses/${endpoint}`
}

export const getCourses = (token, page, userId) => {
    const endpoint = getEndpointWithPrefix(`getAll?page=${page}&userId=${userId}`)
    return GET(endpoint, token)
}

export const getEnrolledCourses = (token, uId) => {
    const endpoint = getEndpointWithPrefix(`enrollment/get_enrolled_courses?uId=${uId}`)
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

export const searchCourseByValue = (token, body) => {
    const endpoint = getEndpointWithPrefix(`searchCourseByValue`)
    return POST(endpoint, body, token)
}

export const filterCourses = (token, body) => {
    const endpoint = getEndpointWithPrefix(`filterCourses`)
    return POST(endpoint, body, token)
}

export const enrollmentByBankPay = (token, formData) => {
    const endpoint = getEndpointWithPrefix(`enrollment/byBank`)
    return MULTIPART(endpoint, formData, token)
}

export const enrollmentByPaypalPay = (token, body) => {
    const endpoint = getEndpointWithPrefix(`enrollment/byPaypal`)
    return POST(endpoint, body, token)
}