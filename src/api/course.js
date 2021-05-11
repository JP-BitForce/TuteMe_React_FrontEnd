import { GET, POST, MULTIPART } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `courses/${endpoint}`
}

export const getCourses = (token, page, userId) => {
    const endpoint = getEndpointWithPrefix(`getAll?page=${page}&userId=${userId}`)
    return GET(endpoint, token)
}

export const getEnrolledCourses = (token, uId, page) => {
    const endpoint = getEndpointWithPrefix(`enrollment/get_enrolled_courses?uId=${uId}&page=${page}`)
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

export const getCourseById = (token, id) => {
    const endpoint = getEndpointWithPrefix(`get_course_by_id/${id}`)
    return GET(endpoint, token)
}

export const filterEnrolledCourses = (token, body) => {
    const endpoint = getEndpointWithPrefix(`enrollment/filter_enrolled_courses`)
    return POST(endpoint, body, token)
}

export const searchEnrolledCourses = (token, body) => {
    const endpoint = getEndpointWithPrefix(`enrollment/search_enrolled_courses`)
    return POST(endpoint, body, token)
}

export const createNewCourse = (token, formData) => {
    const endpoint = getEndpointWithPrefix(`createNew`)
    return MULTIPART(endpoint, formData, token)
}

export const getCourseByTutor = (token, id) => {
    const endpoint = getEndpointWithPrefix(`get_course_by_tutor/${id}`)
    return GET(endpoint, token)
}

export const updateCourse = (token, formData) => {
    const endpoint = getEndpointWithPrefix(`update_course`)
    return MULTIPART(endpoint, formData, token)
}

export const updateCourseWithoutFormData = (token, body) => {
    const endpoint = getEndpointWithPrefix(`update_course/no_form_data`)
    return POST(endpoint, body, token)
}