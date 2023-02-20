import {TaskType, TodoListType} from "../../../dal/api";
import {Task} from "./task/Task";
import {fetchTask} from "../../../bll/taskReducer";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../../bll/store";
import {AddItemForm} from "../../utils/addItemForm/AddItemForm";

type PropsType = {
    todolist: TodoListType
    tasks: TaskType[]
    addTask: (todolistID: string, taskTitle: string) => void
    deleteTask: (todolistID: string, taskID: string) => void
    deleteTodoList: (todoListID: string) => void
}

export const TodoList = React.memo(function ({todolist, tasks, deleteTask, addTask, deleteTodoList}: PropsType) {
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fetchTask(todolist.id))
    }, []);


    const addTaskHandler = (title: string) => addTask(todolist.id, title);
    const deleteTodoListHandler = () => {
        deleteTodoList(todolist.id)
    }


    return (
        <div>
            <h3>{todolist.title}</h3>
            <button onClick={deleteTodoListHandler} >delete</button>
            <AddItemForm onClickAdd={addTaskHandler}/>
            {/*<button onClick={addTaskHandler}>Add task</button>*/}
            <div>
                {tasks.map(t => <Task key={t.id} task={t} deleteTask={deleteTask}/>)}
                {/*{tasks[todolist.id].map(t => <Task key={t.id} task={t} />)}*/}
            </div>
        </div>
    )
})
