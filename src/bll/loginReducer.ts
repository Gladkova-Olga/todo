

type InitialStateType = typeof initialState;
type ActionLoginType = any;

const initialState = {

}

export const loginReducer = (state: InitialStateType = initialState, action: ActionLoginType ): InitialStateType => {
    switch (action.type) {
        default: {
            return state
        }
    }
}