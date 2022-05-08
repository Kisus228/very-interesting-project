import {BaseThunkType, InferActionsTypes} from "./ReduxStore";
import {getAuthMeTC} from "./AuthReducer";

const initialState = {
    initialized: false,
}

const AppReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {...state, initialized: true};
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: "APP/INITIALIZED_SUCCESS"} as const)
}

export const initializeApp = () => (dispatch: any) => {
    const authMe = dispatch(getAuthMeTC());
    Promise.all([authMe]).then(() => dispatch(actions.initializedSuccess()));
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
export default AppReducer;