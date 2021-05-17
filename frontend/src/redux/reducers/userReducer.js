const initialState = {
    userLogged: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOG_USER': 
            localStorage.setItem('userLogged', JSON.stringify({id: action.payload.id, premium: action.payload.premium}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload
            }
        case 'LOGOUT_USER':
            localStorage.clear()
            return {
                ...state,
                userLogged: null,
            }
        case 'CHANGE_MEMBERTYPE':
            return {
                ...state,
                userLogged: {...state.userLogged, premium: action.payload}
            }
        default:
            return state
    }
}
export default userReducer 