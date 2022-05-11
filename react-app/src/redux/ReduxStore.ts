import FilterReducer from "./FilterReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import AuthReducer from "./AuthReducer";
import EmployerVacancyReducer from "./EmployerVacancyReducer";
import AppReducer from "./AppReducer";
import ResumeReducer from "./ResumeReducer";

const reducers = combineReducers({
    appData: AppReducer,
    filterData: FilterReducer,
    employerVacancyData: EmployerVacancyReducer,
    resumeData: ResumeReducer,
    authData: AuthReducer,
});

export type AppStateType = ReturnType<typeof reducers>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
