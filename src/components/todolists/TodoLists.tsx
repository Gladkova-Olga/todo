import {AppStoreType, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import {PATH} from "../routes/RoutesForApp";

function TodoLists() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);

    if(!isLoggedIn) return (
        <Navigate to={PATH.LOGIN} replace={true}/>
    )

    return (
        <div>
            TodoLists!
        </div>
    )

}
export default TodoLists