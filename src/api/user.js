import { POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
  return `user/${endpoint}`
}

export const changePasswordApi = (token, body, userId) => {
    const endpoint = getEndpointWithPrefix(`changePassword/${userId}`);
    return POST(endpoint, body, token)
}