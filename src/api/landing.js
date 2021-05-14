import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
  return `landingPage/${endpoint}`
}

export const getFeedbacks = (page) => {
    const endpoint = getEndpointWithPrefix(`feedback/${page}`)
    return GET(endpoint)
}

export const getCourses = (page) => {
    const endpoint = getEndpointWithPrefix(`get_courses/${page}`)
    return GET(endpoint)
}

export const searchCourseByValue = (page, value) => {
    const endpoint = getEndpointWithPrefix(`search_course?page=${page}&value=${value}`)
    return GET(endpoint)
}

export const getTutors = (page) => {
    const endpoint = getEndpointWithPrefix(`get_tutors/${page}`)
    return GET(endpoint)
}

export const searchTutorByValue = (page, value) => {
    const endpoint = getEndpointWithPrefix(`search_tutor?page=${page}&value=${value}`)
    return GET(endpoint)
}

export const sendMessage = (body) => {
    const endpoint = getEndpointWithPrefix(`send_message`)
    return POST(endpoint, body)
}