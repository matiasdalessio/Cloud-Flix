import { combineReducers } from "redux";
import audiovisualReducer from "./audiovisualReducer"
import profileReducer from "./profileReducer";
import userReducer from "./userReducer"

const mainReducer = combineReducers({
    user: userReducer,
    audiovisual: audiovisualReducer,
    profile: profileReducer
})

export default mainReducer