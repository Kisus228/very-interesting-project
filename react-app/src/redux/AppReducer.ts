import {InferActionsTypes} from "./ReduxStore";
import {getAuthMeTC} from "./AuthReducer";

const initialState = {
    initialized: false,
    loading: false,
}

const AppReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {...state, initialized: true};
        case "APP/LOADING":
            return {...state, loading: action.loading};
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: "APP/INITIALIZED_SUCCESS"} as const),
    loading: (loading: boolean) => ({type: "APP/LOADING", loading} as const),
}

export const initializeApp = () => (dispatch: any) => {
    const authMe = dispatch(getAuthMeTC());
    Promise.all([authMe]).then(() => {
        dispatch(actions.initializedSuccess())
    });
}

export const startLoadingTC = () => (dispatch: any) => {
    dispatch(actions.loading(true));
}
export const endLoadingTC = () => (dispatch: any) => {
    dispatch(actions.loading(false));
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
export default AppReducer;
