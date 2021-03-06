import {employerVacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {EmployerVacancyExpendsType, EmployerVacancyType} from "../types/types";
import {endLoadingTC, startLoadingTC} from "./AppReducer";

const initialState = {
    vacancies: [] as EmployerVacancyType[],
    vacancy: null as EmployerVacancyExpendsType | null,
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
        case "EMPLOYER_VACANCY/OPEN_CLOSE_VACANCY":
            return {
                ...state,
                vacancies: state.vacancies.filter(vacancy => vacancy.id !== action.id),
                vacancy: state.vacancy !== null ? {...state.vacancy, is_open: !action.isOpen} : null
            };
        case "EMPLOYER_VACANCY/SET_VACANCY":
            return {...state, vacancy: {...action.vacancy}};
        case "EMPLOYER_VACANCY/RESET_VACANCY":
            return {...state, vacancy: null};
        default:
            return state;
    }
}

export const actions = {
    setVacancies: (vacancies: EmployerVacancyType[]) => ({type: "EMPLOYER_VACANCY/SET_VACANCIES", vacancies} as const),
    postVacancy: (vacancy: EmployerVacancyExpendsType) => ({type: "EMPLOYER_VACANCY/POST_VACANCY", vacancy} as const),
    putVacancy: (id: number, vacancy: EmployerVacancyExpendsType) => ({
        type: "EMPLOYER_VACANCY/PUT_VACANCY",
        id,
        vacancy
    } as const),
    deleteVacancy: (id: number) => ({type: "EMPLOYER_VACANCY/DELETE_VACANCY", id} as const),
    openCloseVacancy: (id: number, isOpen: boolean) => ({
        type: "EMPLOYER_VACANCY/OPEN_CLOSE_VACANCY",
        id,
        isOpen
    } as const),
    setVacancy: (vacancy: EmployerVacancyExpendsType) => ({type: "EMPLOYER_VACANCY/SET_VACANCY", vacancy} as const),
    resetVacancy: () => ({type: "EMPLOYER_VACANCY/RESET_VACANCY"} as const),
}

export const getVacanciesTC = (isOpen: boolean): ThunkType => async (dispatch) => {
    await employerVacancyAPI.getVacancies(isOpen)
        .then(result => dispatch(actions.setVacancies(result)))
}

export const postVacancyTC = (data: EmployerVacancyExpendsType): ThunkType => async (dispatch) => {
    await employerVacancyAPI.postVacancy(data)
        .then(result => {
            if (!isNaN(Number(result))) {
                data.id = result;
                dispatch(actions.postVacancy(data))
            }
        })
}

export const openCloseVacancyTC = (id: number, isOpen: boolean): ThunkType => async (dispatch) => {
    await employerVacancyAPI.openCloseVacancy(id)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.openCloseVacancy(id, isOpen))
            }
        })

}

export const acceptApplicationTC = (acceptId: number, vacancyId: number): ThunkType => async (dispatch) => {
    await employerVacancyAPI.acceptApplication(acceptId)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                employerVacancyAPI.getVacancy(vacancyId)
                    .then(result => dispatch(actions.setVacancy(result)))
            }
        })
}

export const deleteVacancyTC = (id: number, authorId: number): ThunkType => async (dispatch) => {
    await employerVacancyAPI.deleteVacancy(id, authorId)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.deleteVacancy(id))
            }
        })

}

export const putVacancyTC = (id: number, data: EmployerVacancyExpendsType): ThunkType => async (dispatch) => {
    await employerVacancyAPI.putVacancy(id, data)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.putVacancy(id, data))
            }
        })
}

export const getVacancyTC = (id: number): ThunkType => async (dispatch) => {
    dispatch(startLoadingTC());
    dispatch(actions.resetVacancy());
    await employerVacancyAPI.getVacancy(id)
        .then(result => {
            dispatch(actions.setVacancy(result))
            dispatch(endLoadingTC())
        })
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default VacancyReducer;
