import { GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `landingPage/${endpoint}`
}

export const getCoursesForLandingPage = (page) => {
    const endpoint = getEndpointWithPrefix(`courses?page=${page}`)
    return GET(endpoint)
}
