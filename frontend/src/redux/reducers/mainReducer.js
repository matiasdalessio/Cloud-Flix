import { combineReducers } from "redux";
<<<<<<< HEAD
import authReducer from "./authReducer"
import audiovisualReducer from "./audiovisualReducer"

const mainReducer = combineReducers({
    authReducer: authReducer,
    audiovisual: audiovisualReducer
=======
import userReducer from "./userReducer"

const mainReducer = combineReducers({
    user: userReducer
>>>>>>> dd3b12df823121e4aa298b282500bce063a57430
})

export default mainReducer