import { POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `event/${endpoint}`
}

export const addNewEvent = (token, body) => {
    const endpoint = getEndpointWithPrefix(`addEvent`)
    return POST(endpoint, body, token)
}

export const getEvents = (token, body) => {
    const endpoint = getEndpointWithPrefix(`getEvents`)
    return POST(endpoint, body, token)
}

export const updateEvent = (token, body) => {
    const endpoint = getEndpointWithPrefix(`updateEvent`)
    return POST(endpoint, body, token)
}

export const deleteEvent = (token, body) => {
    const endpoint = getEndpointWithPrefix(`deleteEvent`)
    return POST(endpoint, body, token)
}