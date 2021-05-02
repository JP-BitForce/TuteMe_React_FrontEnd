import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `payments/${endpoint}`
}

export const getPayments = (token, page, userId) => {
    const endpoint = getEndpointWithPrefix(`get_payments?uId=${userId}&page=${page}`)
    return GET(endpoint, token)
}

export const upgradePlan = (token, userId, value) => {
    const endpoint = getEndpointWithPrefix(`upgrade_plan?uId=${userId}&plan=${value}`)
    return POST(endpoint, null, token)
}