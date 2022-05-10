import {authAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {LoginType, RegisterType} from "../types/types";

const initialState = {
    auth: false,
    isWorker: true,
    loginError: "",
    registerError: [] as [string, string][],
}

const AuthReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "AUTH/SET_AUTH":
            return {...state, auth: action.auth, loginError: "", registerError: []};
        case "AUTH/SET_LOGIN_ERROR":
            return {...state, loginError: action.error};
        case "AUTH/SET_REGISTER_ERROR":
            return {...state, registerError: action.error};
        case "AUTH/TEMP_SET_IS_WORKER":
            return {...state, isWorker: !state.isWorker};
        default:
            return state;
    }
}

export const actions = {
    authMe: (auth: boolean) => ({type: "AUTH/SET_AUTH", auth} as const),
    loginError: (error: string) => ({type: "AUTH/SET_LOGIN_ERROR", error} as const),
    registerError: (error: [string, string][]) => ({type: "AUTH/SET_REGISTER_ERROR", error} as const),
    temp: () => ({type: "AUTH/TEMP_SET_IS_WORKER"} as const),
}

export const temp = actions.temp;

export const getAuthMeTC = (): ThunkType => async (dispatch) => {
    await authAPI.getAuthMe().then((data) => {
        if (data.is_authenticated) {
            dispatch(actions.authMe(true))
        }
    })
}

export const postAuthLoginTC = (data: LoginType): ThunkType => async (dispatch) => {
    await authAPI.postAuthLogin(data)
        .then(response => {
            if (response.status === "Success")
                dispatch(getAuthMeTC())
            else
                dispatch(actions.loginError("Неверный логин или пароль"))
        })
}

export const deleteAuthLoginTC = (): ThunkType => async (dispatch) => {
    await authAPI.deleteAuthLogin()
        .then(() => dispatch(actions.authMe(false)))
}

export const postAuthRegisterTC = (data: RegisterType): ThunkType => async (dispatch) => {
    await authAPI.postAuthRegister(data)
        .then(response => {
            if (response.status === "Success")
                dispatch(postAuthLoginTC(data))
            else
                dispatch(actions.registerError(Object.entries(response)))
        })
}

export const removeError = () => (dispatch: any) => {
    dispatch(actions.loginError(""))
    dispatch(actions.registerError([]))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default AuthReducer;
