import { createStore, applyMiddleware } from "redux";
import combinedReducers                 from "../reducers/combineReducers.js";     
import thunk                            from "redux-thunk";
import actionAuthLogin                  from "../actions/actionAuthLogin";
import actionAboutMe                    from "../actions/actionAboutMe";

const store = createStore(combinedReducers, applyMiddleware(thunk))
if (localStorage.authToken){
    store.dispatch(actionAuthLogin(localStorage.authToken))
    console.log('store',store.getState(),store.getState().auth.payload.id)
    store.dispatch(actionAboutMe(store.getState().auth.payload.id))
}

store.subscribe(() => console.log(store.getState()));

export default store;
