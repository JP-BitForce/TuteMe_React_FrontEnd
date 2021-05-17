export const APP_BASE_URL = "http://localhost:8080/"
const OAUTH2_REDIRECT_URI = `http://localhost:3000/oauth2/redirect`

export const GOOGLE = 'google'
export const FACEBOOK = 'facebook'

const OAUTH2_ENDPOINT = APP_BASE_URL + 'oauth2/authorize/'
const RIDERECT_PARAM = '?redirect_uri=' + OAUTH2_REDIRECT_URI
const STATE_PARAM = '&state='

export const GOOGLE_AUTH_URL = OAUTH2_ENDPOINT + GOOGLE + RIDERECT_PARAM
export const FACEBOOK_AUTH_URL = OAUTH2_ENDPOINT + FACEBOOK + RIDERECT_PARAM

export const GOOGLE_AUTH_WITH_STATE = GOOGLE_AUTH_URL + STATE_PARAM
export const FACEBOOK_AUTH_WITH_STATE = FACEBOOK_AUTH_URL + STATE_PARAM