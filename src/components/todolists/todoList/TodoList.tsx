import {TaskType, TodoListType} from "../../../dal/api";
import {Task} from "./task/Task";
import {fetchTask} from "../../../bll/taskReducer";
import {useEffect} from "react";
import {useAppDispatch} from "../../../bll/store";

type PropsType = {
    todolist: TodoListType
    tasks: TaskType[]
}

function TodoList ({todolist, tasks}: PropsType) {
    const dispatch = useAppDispatch();
   useEffect(() => dispatch(fetchTask(todolist.id)), [])

    return (
        <div>
            <h3>{todolist.title}</h3>
            <button>delete</button>
            <div>
                {tasks.map(t => <Task key={t.id} task={t}/>)}
            </div>
        </div>
    )
}

export default TodoList