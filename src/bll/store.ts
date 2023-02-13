import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import {loginReducer} from "./loginReducer";
import {useDispatch} from "react-redux";
import {todoListReducer} from "./todoListReducer";
import {taskReducer} from "./taskReducer";

const reducers = combineReducers({
    login: loginReducer,
    todoList: todoListReducer,
    task: taskReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export const useAppDispatch: () => ThunkDispatch<AppStoreType, any, AnyAction> = useDispatch

export default store;

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev