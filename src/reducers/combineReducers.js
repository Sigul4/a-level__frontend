import { combineReducers } from "redux";
import   authReducer       from "./authReducer.ts";
import   changePostReducer from "./changePostReducer.ts";
import   promiseReducer    from "./promiseReducer.ts";

const combinedReducers = combineReducers({promise: promiseReducer, auth: authReducer, deletePosts: changePostReducer})

export default combinedReducers
