import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1'
    }
})


export const authAPI = {
    login(email: string, password: string, rememberME: boolean, captcha?: string) {
        const payload = {
            email,
            password,
            rememberME,
            captcha,
        };
        return (
            instance.post<typeof payload, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", payload)
        )
    },
    me() {
        return (
            instance.get<{}, AxiosResponse<AuthResponseType>>("auth/me")
        )
    },
    logOut() {
        return (
            instance.delete<{}, AxiosResponse<ResponseType>>("auth/login")
        )
    }

}

export const taskAPI = {
    getTasks(todoListID: string) {
        return (
            instance.get<{}, AxiosResponse<GetTaskResponseType>>(`todo-lists/${todoListID}/tasks`)
        )
    },
    createTask(todoListID: string, taskTitle: string) {
        return (
            instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoListID}/tasks`,
                {title: taskTitle})
        )
    },
    updateTask(todoListID: string, taskID: string, updateTaskModel: UpdateTaskModelType) {
        return (
            instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoListID}/tasks/${taskID}`,
                updateTaskModel)
        )
    },
    deleteTask(todoListID: string, taskID: string) {
        return(
            instance.delete<{}, AxiosResponse<ResponseType>>(`todo-lists/${todoListID}/tasks/${taskID}`)
        )
    }
}

export const todoListAPI = {
    getTodoLists() {
        return(
            instance.get<{}, AxiosResponse<TodoListType[]>>('todo-lists')
        )
    },
    createTodoList(todoListTitle: string) {
        return(
            instance.post<{title:string}, AxiosResponse<ResponseType<{item: TodoListType}>>>('todo-lists',
                {title: todoListTitle})
        )

    },
    updateTodolist(todoListID: string, todoListTitle: string) {
        return(
            instance.put<{title:string}, AxiosResponse<ResponseType<{item: TodoListType}>>>(`todo-lists/${todoListID}`,
                {title: todoListTitle}  )
        )
    },
    deleteTodoList(todoListID: string) {
        return(
            instance.delete<{}, AxiosResponse<ResponseType>>(`todo-lists/${todoListID}`)
        )
    }

}

type AuthResponseType = {
    id: number
    email: string
    login: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}