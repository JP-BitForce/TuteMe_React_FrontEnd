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

export function sendResetCode(email) {
  const endpoint = getEndpointWithPrefix(`forgotPassword?email=${email}`)
  return POST(endpoint)
}

export function verifyCode(code, email) {
  const endpoint = getEndpointWithPrefix(`forgotPassword/verifyCode?email=${email}&code=${code}`)
  return POST(endpoint)
}

export function resetPassword(password, email) {
  const endpoint = getEndpointWithPrefix(`forgotPassword/resetPassword?email=${email}&password=${password}`)
  return POST(endpoint)
}