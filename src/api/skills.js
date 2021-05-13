import { PUT,GET } from './core';

export const getEndpointWithPrefix = (endpoint) => {
    return `user-skills/${endpoint}`
  }
  
  export const addSkills = (token, body) => {
      const endpoint = getEndpointWithPrefix(`update_skills`)
      return PUT(endpoint, body, token)
  }

  export const getUserSkills = (token, userId) => {
    const endpoint = getEndpointWithPrefix(`get_skills?userId=${userId}`)

    return GET(endpoint, token)
}