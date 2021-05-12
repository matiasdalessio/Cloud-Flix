const initialState = {
    userLogged: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOG_USER': 
            localStorage.setItem('userLogged', JSON.stringify({photoUser: action.payload.photoUser}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload
            }
        case 'SIGNOUT_USER':
            localStorage.clear()
            return {
                ...state,
                userLogged: null
            }
        default:
            return state
    }
}
export default userReducer 