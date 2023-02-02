import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import {loginReducer} from "./loginReducer";
import {useDispatch} from "react-redux";

const reducers = combineReducers({
    login: loginReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export const useAppDispatch: () => ThunkDispatch<AppStoreType, any, AnyAction> = useDispatch

export default store;

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev