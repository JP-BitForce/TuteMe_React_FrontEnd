const INITIAL_STATE = {
    user: null
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "USER_LOGIN_RESPONSE": return {
            ...state,
            user: action.payload
        }

        default: return state
    }
}

export default authReducer