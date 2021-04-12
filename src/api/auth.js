import { POST } from './core';

export const getEndpointWithPrefix = (endpoint) => {
  return `auth/${endpoint}`
}

export const signUpUser = (userDetails, type) => {
    const endpoint = getEndpointWithPrefix(`signup?userType=${type}`);
    return POST(endpoint, userDetails)
}

export const signInUser = (loginCredentials) => {
  const endpoint =  getEndpointWithPrefix('sign-in');
  return POST(endpoint, loginCredentials)
}

export const sendResetCode = (email) => {
  const endpoint = getEndpointWithPrefix(`forgotPassword?email=${email}`)
  return POST(endpoint)
}

export const verifyCode = (code, email) => {
  const endpoint = getEndpointWithPrefix(`forgotPassword/verifyCode?email=${email}&code=${code}`)
  return POST(endpoint)
}

export const resetPassword = (password, email) => {
  const endpoint = getEndpointWithPrefix(`forgotPassword/resetPassword?email=${email}&password=${password}`)
  return POST(endpoint)
}