import {authAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';

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

export const postAuthLoginTC = (data: {username: string, password: string}): ThunkType => async (dispatch) => {
    await authAPI.postAuthLogin(data)
        .then(() => dispatch(actions.authLogin(true)))
}

export const deleteAuthLoginTC = (): ThunkType => async (dispatch) => {
    await authAPI.deleteAuthLogin()
        .then(() => dispatch(actions.authLogin(false)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default AuthReducer;
