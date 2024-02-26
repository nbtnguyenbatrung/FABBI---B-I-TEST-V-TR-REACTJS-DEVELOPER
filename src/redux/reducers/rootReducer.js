import {combineReducers} from "redux";
import layoutInteractionReducer from "./layout/interaction/Layout";

const rootReducer = combineReducers({
    layoutInteractionReducer,
});

export default rootReducer;
