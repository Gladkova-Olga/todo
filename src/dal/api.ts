import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1'
    }
})


export const authAPI = {
    login(email: string, password: string, rememberME: boolean, captcha?: boolean) {
        const payload = {
            email,
            password,
            rememberME,
            captcha,
        };
        return (
            instance.post<typeof payload, AxiosResponse<{ userId: number }>>("auth/login", payload)
        )

    },
    me() {
        return (
            instance.get<{}, AxiosResponse<AuthResponseType>>("auth/me")
        )
    },
    logOut() {
        instance.delete<{}, AxiosResponse<any>>("auth/login")
    }


}

type AuthResponseType = {
    id: number,
    email: string,
    login: string
}