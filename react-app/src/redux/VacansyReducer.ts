import {vacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {VacancyType} from "../types/types";

const initialState = {
    vacancies: [] as VacancyType[],
    vacancy: {} as VacancyType,
}

const VacancyReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "VACANCY/SET_VACANCIES":
            return {...state, vacancies: [...action.vacancies]};
        case "VACANCY/SET_VACANCY":
            return {...state, vacancy: {...action.vacancy}};
        default:
            return state;
    }
}

export const actions = {
    setVacancies: (vacancies: VacancyType[]) => ({type: "VACANCY/SET_VACANCIES", vacancies} as const),
    setVacancy: (vacancy: VacancyType) => ({type: "VACANCY/SET_VACANCY", vacancy} as const),
}

export const getVacanciesTC = (): ThunkType => async (dispatch) => {
    await vacancyAPI.getVacancies()
        .then(result => dispatch(actions.setVacancies(result)))
}

export const getVacancyTC = (id: number): ThunkType => async (dispatch) => {
    await vacancyAPI.getVacancy(id)
        .then(result => dispatch(actions.setVacancy(result)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default VacancyReducer;
