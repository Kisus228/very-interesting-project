import {workerVacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {WorkerVacancyExpendsType, WorkerVacancyType} from "../types/types";

const initialState = {
    vacancies: [] as WorkerVacancyType[],
    vacancy: null as WorkerVacancyExpendsType | null,
}

const VacancyReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "WORKER_VACANCY/SET_VACANCIES":
            return {...state, vacancies: [...action.vacancies]};
        case "WORKER_VACANCY/SET_VACANCY":
            return {...state, vacancy: {...action.vacancy}};
        case "WORKER_VACANCY/RESET_VACANCY":
            return {...state, vacancy: null};
        case "WORKER_VACANCY/LIKE_VACANCY":
            const newVacancies = [...state.vacancies];
            const vacancyIndex = newVacancies.findIndex(vacancy => vacancy.id === action.id);
            newVacancies[vacancyIndex].is_liked = !newVacancies[vacancyIndex].is_liked;
            return {...state, vacancies: newVacancies};
        case "WORKER_VACANCY/SEND_REQUEST":
            const newVacancy = {...state.vacancy} as WorkerVacancyExpendsType;
            newVacancy.is_registered = true;
            return {...state, vacancy: newVacancy};
        default:
            return state;
    }
}

export const actions = {
    setVacancies: (vacancies: WorkerVacancyType[]) => ({type: "WORKER_VACANCY/SET_VACANCIES", vacancies} as const),
    setVacancy: (vacancy: WorkerVacancyExpendsType) => ({type: "WORKER_VACANCY/SET_VACANCY", vacancy} as const),
    likeVacancy: (id: number) => ({type: "WORKER_VACANCY/LIKE_VACANCY", id} as const),
    sendRequest: () => ({type: "WORKER_VACANCY/SEND_REQUEST"} as const),
    resetVacancy: () => ({type: "WORKER_VACANCY/RESET_VACANCY"} as const),
}

export const getVacanciesTC = (filter: number[]): ThunkType => async (dispatch) => {
    await workerVacancyAPI.getVacancies(filter)
        .then(result => dispatch(actions.setVacancies(result)))
}

export const getLikedVacanciesTC = (): ThunkType => async (dispatch) => {
    await workerVacancyAPI.getLikedVacancies()
        .then(result => dispatch(actions.setVacancies(result)))
}

export const getVacancyTC = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.resetVacancy())
    await workerVacancyAPI.getVacancy(id)
        .then(result => dispatch(actions.setVacancy(result)))
}

export const likeVacancyTC = (id: number, vacancyPage: boolean): ThunkType => async (dispatch) => {
    await workerVacancyAPI.likeVacancy(id)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.likeVacancy(id))
                if (vacancyPage)
                    dispatch(getVacancyTC(id))
            }
        })
}

export const sendRequestTC = (id: number): ThunkType => async (dispatch) => {
    await workerVacancyAPI.sendRequest(id)
        .then(result => {
            // @ts-ignore
            if (result.status === 200 && !result.json().mess) {
                dispatch(actions.sendRequest())
            }
        })
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default VacancyReducer;
