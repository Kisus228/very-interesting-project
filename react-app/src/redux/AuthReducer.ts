import {authAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {
    FullEmployerDataType,
    FullWorkerDataType,
    LoginType,
    PhotoType,
    RegisterType,
    UserDataType
} from "../types/types";
import {endLoadingTC, startLoadingTC} from "./AppReducer";

const initialState = {
    auth: false,
    name: "",
    lastName: "",
    patronymic: "",
    isHeadDepartment: false,
    id: 0,
    loginError: "",
    registerError: [] as [string, string][],
    photo: null as string | null,
    userData: null as FullWorkerDataType | FullEmployerDataType | null
}

const AuthReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "AUTH/SET_AUTH":
            return {...state, auth: action.auth, loginError: "", registerError: []};
        case "AUTH/SET_LOGIN_ERROR":
            return {...state, loginError: action.error};
        case "AUTH/SET_REGISTER_ERROR":
            return {...state, registerError: action.error};
        case "AUTH/SET_USER_DATA":
            return {...state, ...action.data};
        case "AUTH/SET_FULL_USER_DATA":
            return {...state, userData: {...action.data}};
        case "AUTH/RESET_FULL_USER_DATA":
            return {...state, userData: null};
        case "AUTH/SET_PHOTO":
            return {...state, photo: action.photo};
        default:
            return state;
    }
}

export const actions = {
    authMe: (auth: boolean) => ({type: "AUTH/SET_AUTH", auth} as const),
    loginError: (error: string) => ({type: "AUTH/SET_LOGIN_ERROR", error} as const),
    registerError: (error: [string, string][]) => ({type: "AUTH/SET_REGISTER_ERROR", error} as const),
    setUserData: (data: UserDataType) => ({type: "AUTH/SET_USER_DATA", data} as const),
    setFullUserData: (data: FullEmployerDataType | FullWorkerDataType) => ({
        type: "AUTH/SET_FULL_USER_DATA",
        data
    } as const),
    resetFullUserData: () => ({type: "AUTH/RESET_FULL_USER_DATA"} as const),
    photo: (photo: string | null) => ({type: "AUTH/SET_PHOTO", photo} as const),
}

export const getAuthMeTC = (): ThunkType => async (dispatch) => {
    await authAPI.getAuthMe().then(async (data) => {
        if (data.is_authenticated) {
            const getPhoto = dispatch(getPhotoTC());
            const getUserData = dispatch(getUserDataTC());
            return Promise.all([getPhoto, getUserData]).then(() => {
                dispatch(actions.resetFullUserData());
                dispatch(actions.authMe(true));
            })
        } else {
            dispatch(actions.authMe(false));
        }
    })
}

export const getUserDataTC = (): ThunkType => async (dispatch) => {
    await authAPI.getUserData().then(async (response: any) => {
        if (response.ok) {
            await response.json().then((data: UserDataType) => {
                dispatch(actions.setUserData(data))
            });
        }
    })
}

export const getFullUserDataTC = (): ThunkType => async (dispatch) => {
    dispatch(startLoadingTC())
    dispatch(actions.resetFullUserData())
    await authAPI.getFullUserData().then(async (response: any) => {
        if (response.ok) {
            await response.json().then((data: FullEmployerDataType | FullWorkerDataType) => {
                dispatch(actions.setFullUserData(data))
                dispatch(endLoadingTC())
            });
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

export const getPhotoTC = (): ThunkType => async (dispatch) => {
    await authAPI.getPhoto(PhotoType.user)
        .then(async (response: any) => {
            if (response.ok) {
                const binaryData = [];
                binaryData.push(await response.blob())
                const previewUrl = window.URL.createObjectURL(new Blob(binaryData,
                    {type: response.headers.get("content-type") || "text"}
                ));
                dispatch(actions.photo(previewUrl))
            } else {
                dispatch(actions.photo(null))
            }
        })
}

export const putPhotoTC = (photo: File): ThunkType => async (dispatch) => {
    await authAPI.putPhoto(photo).then((response: any) => {
        if (response.ok) dispatch(getPhotoTC())
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
