import {
    GOOGLE,
    GOOGLE_AUTH_WITH_STATE,
    FACEBOOK,
    FACEBOOK_AUTH_WITH_STATE,
} from './values'
  
export const getOAuthRedirectURI = (platform, state = "/") => {
    if (platform === GOOGLE) {
      return GOOGLE_AUTH_WITH_STATE + state
    }
    if (platform === FACEBOOK) {
      return FACEBOOK_AUTH_WITH_STATE + state
    }
}