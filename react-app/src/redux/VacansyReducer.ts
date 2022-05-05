import {vacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';

const initialState = {
    vacancy: [] as any,
}

const VacancyReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "VACANCY/SET_VACANCY":
            return {...state, vacancy: [...action.vacancy]};
        default:
            return state;
    }
}

export const actions = {
    setVacancy: (vacancy: any) => ({type: "VACANCY/SET_VACANCY", vacancy} as const),
}

export const getVacancyTC = (): ThunkType => async (dispatch) => {
    await vacancyAPI.getVacancy()
        .then(result => dispatch(actions.setVacancy(result)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default VacancyReducer;
