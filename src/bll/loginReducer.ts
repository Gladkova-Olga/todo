import {Dispatch} from "redux";
import {authAPI} from "../dal/api";

type ThunkDispatch = Dispatch<ActionLoginType>
type InitialStateType = typeof initialState;
type ActionLoginType = SetIsLoggedInType
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>

const initialState = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionLoginType ): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN":{
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default: {
            return state
        }
    }
}

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return ({
        type: "LOGIN/SET-IS-LOGGED-IN",
        isLoggedIn
    } as const)
}

export const login = (email: string, password: string, rememberMe: boolean, captcha?: boolean) => {
    return (dispatch: ThunkDispatch) => {
        authAPI.login(email, password, rememberMe, captcha)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                } else {

                }
            })
    }
}

export const logout = () => {
    return (dispatch: ThunkDispatch) => {
        authAPI.logOut()
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(false))
                }
            })
    }
}


