import { combineReducers } from "redux";
import audiovisualReducer from "./audiovisualReducer"
import userReducer from "./userReducer"

const mainReducer = combineReducers({
    user: userReducer,
    audiovisual: audiovisualReducer
})

export default mainReducer