import {vacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {VacancyExpendsType, VacancyType} from "../types/types";

const initialState = {
    vacancies: [] as VacancyType[],
    vacancy: null as VacancyExpendsType | null,
}

const VacancyReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "EMPLOYER_VACANCY/SET_VACANCIES":
            return {...state, vacancies: [...action.vacancies]};
        case "EMPLOYER_VACANCY/POST_VACANCY":
            return {...state, vacancies: [...state.vacancies, action.vacancy]};
        case "EMPLOYER_VACANCY/PUT_VACANCY":
            const newVacancies = [...state.vacancies];
            newVacancies[newVacancies.findIndex(vacancy => vacancy.id === action.id)] = action.vacancy
            return {...state, vacancies: newVacancies};
        case "EMPLOYER_VACANCY/DELETE_VACANCY":
            return {...state, vacancies: state.vacancies.filter(vacancy => vacancy.id !== action.id)};
        case "EMPLOYER_VACANCY/SET_VACANCY":
            return {...state, vacancy: {...action.vacancy}};
        case "EMPLOYER_VACANCY/RESET_VACANCY":
            return {...state, vacancy: null};
        default:
            return state;
    }
}

export const actions = {
    setVacancies: (vacancies: VacancyType[]) => ({type: "EMPLOYER_VACANCY/SET_VACANCIES", vacancies} as const),
    postVacancy: (vacancy: VacancyExpendsType) => ({type: "EMPLOYER_VACANCY/POST_VACANCY", vacancy} as const),
    putVacancy: (id: number, vacancy: VacancyExpendsType) => ({type: "EMPLOYER_VACANCY/PUT_VACANCY", id, vacancy} as const),
    deleteVacancy: (id: number) => ({type: "EMPLOYER_VACANCY/DELETE_VACANCY", id} as const),
    setVacancy: (vacancy: VacancyExpendsType) => ({type: "EMPLOYER_VACANCY/SET_VACANCY", vacancy} as const),
    resetVacancy: () => ({type: "EMPLOYER_VACANCY/RESET_VACANCY"} as const),
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

export const closeVacancyTC = (id: number, authorId: number): ThunkType => async (dispatch) => {
    await vacancyAPI.getVacancy(id)
        .then(data => {
            data.is_open = !data.is_open;
            data.author = authorId;
            vacancyAPI.putVacancy(id, data)
                .then(result => {
                    // @ts-ignore
                    if (result.status === 200) {
                        dispatch(getVacanciesTC(!data.is_open))
                    }
                })
        })

}

export const deleteVacancyTC = (id: number, authorId: number): ThunkType => async (dispatch) => {
    await vacancyAPI.deleteVacancy(id, authorId)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.deleteVacancy(id))
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
