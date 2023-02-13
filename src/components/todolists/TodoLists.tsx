import {AppStoreType, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../routes/RoutesForApp";
import {TodoListType} from "../../dal/api";
import {TaskStateType} from "../../bll/taskReducer";
import TodoList from "./todoList/TodoList";
import {useEffect} from "react";
import {fetchTodoLists} from "../../bll/todoListReducer";

function TodoLists() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const todolists = useSelector<AppStoreType, TodoListType[]>(state => state.todoList);
    const tasks = useSelector<AppStoreType, TaskStateType>(state => state.task);

    useEffect(() => dispatch(fetchTodoLists()), [])
    useEffect(() => dispatch(fetchTodoLists()), [])

    if (!isLoggedIn) return (
        <Navigate to={PATH.LOGIN} replace={true}/>
    )


    return (
        <div>
            <button>Add TodoList</button>
            {todolists.map(tl => <TodoList key={tl.id}
                                           todolist={tl}
                                           tasks={tasks[tl.id]}
            />)}
        </div>
    )

}

export default TodoLists