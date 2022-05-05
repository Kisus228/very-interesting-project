import {authAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {LoginType, RegisterType} from "../types/types";

const initialState = {
    auth: false,
}

const AuthReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "AUTH/SET_AUTH":
            return {...state, auth: action.auth};
        default:
            return state;
    }
}

export const actions = {
    authLogin: (auth: boolean) => ({type: "AUTH/SET_AUTH", auth} as const),
}

export const postAuthLoginTC = (data: LoginType): ThunkType => async (dispatch) => {
    await authAPI.postAuthLogin(data)
        .then(() => dispatch(actions.authLogin(true)))
}

export const deleteAuthLoginTC = (): ThunkType => async (dispatch) => {
    await authAPI.deleteAuthLogin()
        .then(() => dispatch(actions.authLogin(false)))
}

export const postAuthRegisterTC = (data: RegisterType): ThunkType => async (dispatch) => {
    await authAPI.postAuthRegister(data)
        .then(() => dispatch(postAuthLoginTC(data)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default AuthReducer;
