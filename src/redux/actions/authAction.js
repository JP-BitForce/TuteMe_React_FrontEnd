export const storeLoginResponse = (data) => {
    return {
        type: "USER_LOGIN_RESPONSE",
        payload: data
    }
}

export const logout = () => {
    return {
        type: "USER_LOGOUT",
        payload: null
    }
}