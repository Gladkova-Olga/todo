import {todoListAPI, TodoListType} from "../dal/api";
import {Dispatch} from "redux";
import {setEmptyTasks, SetEmptyTasksType} from "./taskReducer";

export type SetTodoListsType = ReturnType<typeof setTodoLists>
export type CreateTodoListType = ReturnType<typeof createTodoList>
type UpdateTodoListTitleType = ReturnType<typeof updateTodoListTitle>
export type DeleteTodoList = ReturnType<typeof deleteTodoList>
type ActionTodoListType =
    SetTodoListsType
    | CreateTodoListType
    | UpdateTodoListTitleType
    | DeleteTodoList
    | SetEmptyTasksType
type ThunkDispatch = Dispatch<ActionTodoListType>

const initialState: TodoListType[] = []

export const todoListReducer = (state: typeof initialState = initialState, action: ActionTodoListType): typeof initialState => {
    switch (action.type) {
        case "TODOLIST/SET-TODOLISTS": {
            return action.todoLists.map(tl => ({...tl, filter: "all"}))
        }
        case "TODOLIST/CREATE-TODOLIST": {
            return [{...action.todoList}, ...state]
        }
        case "TODOLIST/UPDATE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "TODOLIST/DELETE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        default:
            return state;
    }
}

const setTodoLists = (todoLists: TodoListType[]) => {
    return (
        {type: "TODOLIST/SET-TODOLISTS", todoLists} as const)
}

const createTodoList = (todoList: TodoListType) => {
    return (
        {type: "TODOLIST/CREATE-TODOLIST", todoList} as const
    )
}
const updateTodoListTitle = (id: string, title: string) => {
    return (
        {type: "TODOLIST/UPDATE-TODOLIST-TITLE", id, title} as const
    )
}
const deleteTodoList = (id: string) => {
    return (
        {type: "TODOLIST/DELETE-TODOLIST", id} as const
    )
}


export const fetchTodoLists = () => {
    return (dispatch: ThunkDispatch) => {
        todoListAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodoLists(res.data))
                dispatch(setEmptyTasks(res.data))
            })
    }
}
export const addTodoList = (todolistTitle: string) => {
    return (dispatch: ThunkDispatch) => {
        todoListAPI.createTodoList(todolistTitle)
            .then((res) => {
                dispatch(createTodoList(res.data.data.item))
            })
    }
}
export const changeTodoListTitle = (id: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        todoListAPI.updateTodolist(id, title)
            .then(res => {
                dispatch(updateTodoListTitle(id, title))
            })
    }
}
export const removeTodoList = (id: string) => {
    return (dispatch: ThunkDispatch) => {
        todoListAPI.deleteTodoList(id)
            .then(res => dispatch(deleteTodoList(id)))
    }
}


