const initialState = {
    fallenServer: false
}

const audiovisualReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ERR':
            return {
                ...state,
                fallenServer: action.payload
            }
        case 'FILTER_ACTORS':
            return {
                ...state,
                movies: state.movies.filter(movie => {return (movie.cast === action.payload)})
            }
        default:
            return state
    }
}

export default audiovisualReducer