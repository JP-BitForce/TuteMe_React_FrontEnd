import { GET, POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `oneStep/${endpoint}`
}

export const getTags = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getTags/${page}`)
    return GET(endpoint, token)
}

export const postQuestion = (token, body) => {
    const endpoint = getEndpointWithPrefix('add_new_question')
    return POST(endpoint, body, token)
}

export const getQuestions = (token, page) => {
    const endpoint = getEndpointWithPrefix(`getQuestions/${page}`)
    return GET(endpoint, token)
}

export const searchTagByTitle = (token, title) => {
    const endpoint = getEndpointWithPrefix(`searchTagByTitle/${title}`)
    return GET(endpoint, token)
}

export const filterTagsByAlphabet = (token) => {
    const endpoint = getEndpointWithPrefix(`filterTagsByAlphabet`)
    return GET(endpoint, token)
}

export const filterQuestions = (token, type, page) => {
    const endpoint = getEndpointWithPrefix(`filterQuestionsByType?type=${type}&page=${page}`)
    return GET(endpoint, token)
}

export const getQuestionAnswers = (token, id, uId) => {
    const endpoint = getEndpointWithPrefix(`get_question_answers?uId=${uId}&qId=${id}`)
    return GET(endpoint, token)
}

export const addQuestionVote = (token, body) => {
    const endpoint = getEndpointWithPrefix(`add_question_vote`)
    return POST(endpoint, body, token)
}

export const postAnswer = (token, body) => {
    const endpoint = getEndpointWithPrefix(`post_answer`)
    return POST(endpoint, body, token)
}

export const filterQuestionBytag = (token, tag, page) => {
    const endpoint = getEndpointWithPrefix(`filter_question_by_tag?tag=${tag}&page=${page}`)
    return GET(endpoint, token)
}

export const searchQuestion = (token, value, page) => {
    const endpoint = getEndpointWithPrefix(`search_question?value=${value}&page=${page}`)
    return GET(endpoint, token)
}