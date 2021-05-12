const initialState = {
    movies: []
}

const audiovisualReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MOVIES':
            return {
                ...state,
                movies: action.payload
            }
            break
        default:
            return state
    }
}

export default audiovisualReducer