import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useFormik} from "formik";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

function Login() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (value) => {
            const errors: FormikErrorType = {}

        },
        onSubmit: () => {

    }
    })




    return(
        <div>
            <h3> Sign in </h3>
        </div>
    )

}

export default Login