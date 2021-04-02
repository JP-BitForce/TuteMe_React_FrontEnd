import { GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `student/profile/${endpoint}`
}

export function getProfileDetails(token, userId) {
    const endpoint = getEndpointWithPrefix(`${userId}`);
    return GET(endpoint, token)
}