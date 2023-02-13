import {taskAPI, TaskType, UpdateTaskModelType} from "../dal/api";
import {Dispatch} from "redux";
import {CreateTodoListType, DeleteTodoList, SetTodoListsType} from "./todoListReducer";

type SetTasksType = ReturnType<typeof setTasks>
type AddTaskType = ReturnType<typeof addTask>
type UpdateTaskType = ReturnType<typeof updateTask>
type DeleteTaskType = ReturnType<typeof deleteTask>
type ActionsTaskType =
    SetTasksType
    | AddTaskType
    | UpdateTaskType
    | DeleteTaskType
    | CreateTodoListType
    | DeleteTodoList
    | SetTodoListsType

type TaskStateType = {
    [key: string]: TaskType[]
}
type ThunkDispatch = Dispatch<ActionsTaskType>

const initialState = {};


export const taskReducer = (state: TaskStateType = initialState, action: ActionsTaskType): TaskStateType => {
    switch (action.type) {
        case "TASK/SET-TASKS": {
            return {...state, [action.todoListID]: action.tasks}
        }
        case "TASK/ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "TASK/UPDATE-TASK": {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    ...action.task
                } : t)
            }
        }
        case "TASK/DELETE-TASK": {
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        }
        case "TODOLIST/CREATE-TODOLIST": {
            return {...state, [action.todoList.id]: []}
        }
        case "TODOLIST/DELETE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState
        }
        case "TODOLIST/SET-TODOLISTS": {
            const copyState = {...state};
            action.todoLists.forEach(tl => copyState[tl.id] = []
        )
            return copyState
        }

        default:
            return state;
    }
}

const setTasks = (tasks: TaskType[], todoListID: string) => {
    return (
        {type: "TASK/SET-TASKS", tasks, todoListID} as const
    )
}
const addTask = (todoListID: string, task: TaskType) => {
    return (
        {type: "TASK/ADD-TASK", task, todoListID} as const
    )
}
const updateTask = (todoListID: string, taskID: string, task: TaskType) => {
    return ({
        type: "TASK/UPDATE-TASK", todoListID, taskID, task
    } as const)
}
const deleteTask = (todoListID: string, taskID: string) => {
    return ({
        type: "TASK/DELETE-TASK", todoListID, taskID
    } as const)
}


export const fetchTask = (todoListID: string) => {
    return (dispatch: ThunkDispatch) => {
        taskAPI.getTasks(todoListID)
            .then((res) => {
                dispatch(setTasks(res.data.items, todoListID))
            })
    }
}
export const createTask = (todoListID: string, taskTitle: string) => {
    return (dispatch: ThunkDispatch) => {
        taskAPI.createTask(todoListID, taskTitle)
            .then((res) => {
                dispatch(addTask(todoListID, res.data.data.item))
            })
    }
}

export const changeTask = (todoListID: string, taskID: string, updateTaskModel: UpdateTaskModelType) => {
    return (dispatch: ThunkDispatch) => {
        taskAPI.updateTask(todoListID, taskID, updateTaskModel)
            .then((res) => {
                dispatch(updateTask(todoListID, taskID, res.data.data.item))
            })
    }
}

export const removeTask = (todoListID: string, taskID: string) => {
    return (dispatch: ThunkDispatch) => {
        taskAPI.deleteTask(todoListID, taskID)
            .then((res) => {
                dispatch(deleteTask(todoListID, taskID))
            })
    }
}

