import { combineReducers } from "redux";
import authReducer from "./authReducer"
import audiovisualReducer from "./audiovisualReducer"

const mainReducer = combineReducers({
    authReducer: authReducer,
    audiovisual: audiovisualReducer
})

export default mainReducer