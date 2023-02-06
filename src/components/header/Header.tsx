import style from './Header.module.css'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../bll/store";
import {logout} from "../../bll/loginReducer";

function Header() {
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
    const onClickLogoutHandler = () => {
        dispatch(logout());
    }
    return (
        <div className={style.headerBlock}>
            {!isLoggedIn &&  <button>Log In</button>}
            {isLoggedIn && <button onClick={onClickLogoutHandler}>Log Out</button>}

        </div>

    )
}

export default Header