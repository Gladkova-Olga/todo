import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../login/Login";
import React from "react";
import TodoLists from "../todolists/TodoLists";
import {Task} from "../todolists/todoList/task/Task";


export const PATH = {
    LOGIN: '/login',
    TODOLISTS: '/todolists',
    TASK: '/task'
}

function RoutesForApp() {
    return (
        <div>
            <Routes>
                {/*<Route path={'/'} element={<Navigate to={PATH.LOGIN} replace={true}/> }/>*/}
                <Route path={"/"} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.TODOLISTS} element={<TodoLists/>}/>
                {/*<Route path={PATH.TASK} element={<Task/>}/>*/}
            </Routes>
        </div>
    )
}

export default RoutesForApp