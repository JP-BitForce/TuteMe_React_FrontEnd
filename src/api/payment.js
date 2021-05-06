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

export const getPaymentPlan = (token, userId) => {
    const endpoint = getEndpointWithPrefix(`get_payment_plan/${userId}`)
    return GET(endpoint, token)
}

export const getPaymentSummaryFacts = (token, userId) => {
    const endpoint = getEndpointWithPrefix(`get_payment_summary_facts/${userId}`)
    return GET(endpoint, token)
}

export const deletePaymentCard = (token, userId, cardId) => {
    const endpoint = getEndpointWithPrefix(`delete_payment_card?uId=${userId}&cardId=${cardId}`)
    return POST(endpoint, null, token)
}