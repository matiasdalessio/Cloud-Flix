const initialState = {
    userProfiles:[]
        
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case 'USER_PROFILES':
            console.log(action.payload)
            localStorage.setItem('userLogged', JSON.stringify({id: action.payload.id}))
            return {
                ...state,
                userProfiles: action.payload
            }
        default:
            return state
    }
}
export default profileReducer 