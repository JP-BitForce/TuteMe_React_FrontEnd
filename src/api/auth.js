import { POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
  return `auth/${endpoint}`
}

export function signUpUser(userDetails, type) {
    const endpoint = getEndpointWithPrefix(`signup?userType=${type}`);
    return POST(endpoint, userDetails)
}

export function signInUser(loginCredentials) {
  const endpoint =  getEndpointWithPrefix('signin');
  return POST(endpoint, loginCredentials)
}