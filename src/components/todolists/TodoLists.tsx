import {AppStoreType, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../routes/RoutesForApp";
import {TodoListType} from "../../dal/api";
import {createTask, removeTask, TaskStateType} from "../../bll/taskReducer";
import {TodoList} from "./todoList/TodoList";
import {useEffect} from "react";
import {addTodoList, changeTodoListTitle, fetchTodoLists, removeTodoList} from "../../bll/todoListReducer";
import Login from "../login/Login";
import {AddItemForm} from "../utils/addItemForm/AddItemForm";

function TodoLists() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const todolists = useSelector<AppStoreType, TodoListType[]>(state => state.todoList);
    const tasks = useSelector<AppStoreType, TaskStateType>(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, []);


    const addTask = (todoListID: string, taskTitle: string) => {
        dispatch(createTask(todoListID, taskTitle));
    }
    const deleteTask = (todoListID: string, taskID: string) => {
        dispatch(removeTask(todoListID, taskID));
    }
    const deleteTodoList = (todoListID: string) => {
        dispatch(removeTodoList(todoListID))
    }
    const createTodoList = (todoListTitle: string) => {
        dispatch(addTodoList(todoListTitle));
    }
    const updateTodoListTitle = (todoListID: string, todoListTitle: string) => {
        dispatch(changeTodoListTitle(todoListID, todoListTitle));
    }

    // if (!isLoggedIn) return (
    // <Navigate to={PATH.LOGIN}/>
    // )


    if (isLoggedIn) {
        return (
            <div>
                <AddItemForm onClickAdd={createTodoList}/>
                {todolists.map(tl => <TodoList key={tl.id}
                                               todolist={tl}
                                               tasks={tasks[tl.id]}
                                               addTask={addTask}
                                               deleteTask={deleteTask}
                                               deleteTodoList={deleteTodoList}
                                               updateTodoListTitle={updateTodoListTitle}
                />)}
            </div>
        )
    } else {
        return <Login/>
    }

}

export default TodoLists