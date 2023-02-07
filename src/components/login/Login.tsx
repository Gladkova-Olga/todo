import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../bll/store";
import {useFormik} from "formik";
import {login} from "../../bll/loginReducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../routes/RoutesForApp";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

function Login() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "password is required";
            } else if (values.password.length <= 3) {
                errors.password = "Must be more than 3 symbols";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return (
            <Navigate to={PATH.TODOLISTS} replace={true}/>
        )
    }


    return (
        <div>
            <h3> Sign in </h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input id={"email"} name={"email"} type={"text"} placeholder={"E-mail"}
                           onChange={formik.handleChange}
                           value={formik.values.email} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div>
                        : null}
                </div>
                <div>
                    <input id={"password"} name={"password"} type={"password"} placeholder={"Password"}
                           onChange={formik.handleChange}
                           value={formik.values.password} onBlur={formik.handleBlur}/>
                    {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div>
                        : null}
                </div>
                <div>
                    <input type={"checkbox"} id={"rememberMe"} name={"rememberMe"}
                           onChange={formik.handleChange}/>
                    <label htmlFor={"rememberMe"}>remember Me</label>
                </div>
                <button type={"submit"}>Login</button>

            </form>
        </div>
    )

}

export default Login