import {vacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {VacancyExpendsType, VacancyType} from "../types/types";

const initialState = {
    vacancies: [] as VacancyType[],
    vacancy: null as VacancyExpendsType | null,
}

const VacancyReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "VACANCY/SET_VACANCIES":
            return {...state, vacancies: [...action.vacancies]};
        case "VACANCY/POST_VACANCY":
            return {...state, vacancies: [...state.vacancies, action.vacancy]};
        case "VACANCY/PUT_VACANCY":
            const newVacancies = [...state.vacancies];
            newVacancies[newVacancies.findIndex(vacancy => vacancy.id === action.id)] = action.vacancy
            return {...state, vacancies: newVacancies};
        case "VACANCY/SET_VACANCY":
            return {...state, vacancy: {...action.vacancy}};
        case "VACANCY/RESET_VACANCY":
            return {...state, vacancy: null};
        default:
            return state;
    }
}

export const actions = {
    setVacancies: (vacancies: VacancyType[]) => ({type: "VACANCY/SET_VACANCIES", vacancies} as const),
    postVacancy: (vacancy: VacancyExpendsType) => ({type: "VACANCY/POST_VACANCY", vacancy} as const),
    putVacancy: (id: number, vacancy: VacancyExpendsType) => ({type: "VACANCY/PUT_VACANCY", id, vacancy} as const),
    setVacancy: (vacancy: VacancyExpendsType) => ({type: "VACANCY/SET_VACANCY", vacancy} as const),
    resetVacancy: () => ({type: "VACANCY/RESET_VACANCY"} as const),
}

export const getVacanciesTC = (isOpen: boolean): ThunkType => async (dispatch) => {
    await vacancyAPI.getVacancies(isOpen)
        .then(result => dispatch(actions.setVacancies(result)))
}

export const postVacancyTC = (data: VacancyExpendsType): ThunkType => async (dispatch) => {
    await vacancyAPI.postVacancy(data)
        .then(result => {
            if (!isNaN(Number(result))) {
                data.id = result;
                dispatch(actions.postVacancy(data))
            }
        })
}

export const putVacancyTC = (id: number, data: VacancyExpendsType): ThunkType => async (dispatch) => {
    await vacancyAPI.putVacancy(id, data)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.putVacancy(id, data))
            }
        })
}

export const getVacancyTC = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.resetVacancy())
    await vacancyAPI.getVacancy(id)
        .then(result => dispatch(actions.setVacancy(result)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default VacancyReducer;
