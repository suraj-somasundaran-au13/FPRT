import { combineReducers } from "redux";
import auth from "./authReducer";
import profile from "./profile";
import images from "./images";

const reducers = combineReducers({auth, profile, images});

export default reducers;