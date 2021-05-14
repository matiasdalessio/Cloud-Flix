const initialState = {
    userProfiles:[],
    selectedProfile:[]
        
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case 'USER_PROFILES':
            return {
                ...state,
                userProfiles: action.payload
            }
        case 'SELECTED_PROFILE':
            localStorage.setItem('profile', JSON.stringify({_id: action.payload._id}))
            return {
                ...state,
                selectedProfile: action.payload
            }
        case 'UNSELECT_PROFILE':
            return {
                ...state,
                selectedProfile: []
            }
        default:
            return state
    }
}
export default profileReducer 