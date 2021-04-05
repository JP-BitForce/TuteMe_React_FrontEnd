import { POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
  return `feedback/${endpoint}`
}

export const addSystemFeedback = (token, body) => {
    const endpoint = getEndpointWithPrefix('add_system_Feedback');
    return POST(endpoint, body, token)
}