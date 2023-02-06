import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../login/Login";
import React from "react";
import TodoLists from "../todolists/TodoLists";


export const PATH = {
    LOGIN: '/login',
    TODOLISTS: '/todolists',
}

function RoutesForApp() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN} replace={true}/> }/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.TODOLISTS} element={<TodoLists/>}/>
            </Routes>
        </div>
    )
}

export default RoutesForApp