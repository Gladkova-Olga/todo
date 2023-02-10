import {taskAPI, TaskType, UpdateTaskModelType} from "../dal/api";
import {Dispatch} from "redux";

type SetTasksType = ReturnType<typeof setTasks>
type AddTaskType = ReturnType<typeof addTask>
type UpdateTaskType = ReturnType<typeof updateTask>
type ActionsTaskType = SetTasksType | AddTaskType | UpdateTaskType
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
        case "TASK/ADD-TASK":{
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
        }
        case "TASK/UPDATE-TASK":{
            return {...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t,
                ...action.model} : t )
                }
        }


        default: return state;
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
const updateTask = (todoListID: string, taskID: string, model: UpdateTaskModelType) => {
    return({
        type: "TASK/UPDATE-TASK", todoListID, taskID, model
    } as const)
}


export const fetchTask = (todoListID: string) => {
    return (dispatch: ThunkDispatch) => {
        taskAPI.getTasks(todoListID)
            .then((res) => {
                dispatch(setTasks(res.data.items, todoListID))
            } )
    }
}

