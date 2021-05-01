import { GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `payments/${endpoint}`
}

export const getPayments = (token, page, userId) => {
    const endpoint = getEndpointWithPrefix(`get_payments?uId=${userId}&page=${page}`)
    return GET(endpoint, token)
}
