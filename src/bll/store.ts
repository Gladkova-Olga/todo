import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {loginReducer} from "./loginReducer";

const reducers = combineReducers({
    login: loginReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev