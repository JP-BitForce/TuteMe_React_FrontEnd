import { POST, GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
  return `notification/${endpoint}`
}

export const setNotification = (token, body, userId) => {
    const endpoint = getEndpointWithPrefix(`?userId=${userId}`);
    return POST(endpoint, body, token)
}

export const getNotificationSetting = (token, userId) => {
    const endpoint = getEndpointWithPrefix(`${userId}`);
    return GET(endpoint, token)
}