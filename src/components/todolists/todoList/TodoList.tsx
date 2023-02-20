import {TaskType, TodoListType} from "../../../dal/api";
import {Task} from "./task/Task";
import {fetchTask} from "../../../bll/taskReducer";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../../bll/store";
import {AddItemForm} from "../../utils/addItemForm/AddItemForm";
import {EditableSpan} from "../../utils/editable span/EditableSpan";

type PropsType = {
    todolist: TodoListType
    tasks: TaskType[]
    addTask: (todolistID: string, taskTitle: string) => void
    deleteTask: (todolistID: string, taskID: string) => void
    deleteTodoList: (todoListID: string) => void
    updateTodoListTitle: (todoListID: string, todoListTitle: string) => void
}

export const TodoList = React.memo(function ({
                                                 todolist,
                                                 tasks,
                                                 deleteTask,
                                                 addTask,
                                                 deleteTodoList,
                                                 updateTodoListTitle
                                             }: PropsType) {
    const dispatch = useAppDispatch();

console.log("todo")
    useEffect(() => {
        dispatch(fetchTask(todolist.id))
    }, []);


    const addTaskHandler = (title: string) => addTask(todolist.id, title);
    const deleteTodoListHandler = () => {
        deleteTodoList(todolist.id)
    }
    const changeTodoListTitleHandler = (todoListTitle: string) => {
        updateTodoListTitle(todolist.id, todoListTitle);
    }



    return (
        <div>
            <h3><EditableSpan title={todolist.title} onChangeTitle={changeTodoListTitleHandler}/></h3>
            <button onClick={deleteTodoListHandler}>delete</button>
            <AddItemForm onClickAdd={addTaskHandler}/>

            <div>
                {tasks.map(t => <Task key={t.id} task={t} deleteTask={deleteTask}/>)}
            </div>
        </div>
)
})
