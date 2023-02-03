import style from './Header.module.css'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../bll/store";

function Header() {
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
    return (
        <div className={style.headerBlock}>
            {!isLoggedIn &&  <button>Log In</button>}
            {isLoggedIn && <button>Log Out</button>}

        </div>

    )
}

export default Header