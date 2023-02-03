import {Route, Routes} from "react-router-dom";
import Login from "../login/Login";

export const PATH = {
    LOGIN: '/login',
    // TODOLISTS: '/todolists',
}

function RoutesForApp() {
    return (
        <div>
            <Routes>
                {/*<Route path={'/'} render={() => <Redirect to={PATH.LOGIN}/>}/>*/}
                <Route path={''}  element={<Login/>} />
            </Routes>
        </div>
    )
}

export default RoutesForApp