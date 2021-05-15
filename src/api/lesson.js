import { POST, GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `online_lesson/${endpoint}`
}

export const createJoinId = (token, body) => {
    const endpoint = getEndpointWithPrefix(`create_join_id`)
    return POST(endpoint, body, token)
}

export const getJoinId = (token, id) => {
    const endpoint = getEndpointWithPrefix(`get_course_joinId/${id}`)
    return GET(endpoint, token)
}

export const startLesson = (token, body) => {
    const endpoint = getEndpointWithPrefix(`start_lesson`)
    return POST(endpoint, body, token)
}