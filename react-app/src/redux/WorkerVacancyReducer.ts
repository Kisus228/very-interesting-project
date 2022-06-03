import {authAPI, workerVacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {ApplicationsType, PhotoType, WorkerVacancyExpendsType, WorkerVacancyType} from "../types/types";
import {endLoadingTC, startLoadingTC} from "./AppReducer";

const initialState = {
    vacancies: [] as WorkerVacancyType[],
    vacancy: null as WorkerVacancyExpendsType | null,
    applications: [] as ApplicationsType[],
    photo: null as string | null,
}

const VacancyReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "WORKER_VACANCY/SET_VACANCIES":
            return {...state, vacancies: [...action.vacancies]};
        case "WORKER_VACANCY/SET_APPLICATIONS":
            return {...state, applications: [...action.applications]};
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
        case "WORKER_VACANCY/SET_PHOTO":
            return {...state, photo: action.photo};
        default:
            return state;
    }
}

export const actions = {
    setVacancies: (vacancies: WorkerVacancyType[]) => ({type: "WORKER_VACANCY/SET_VACANCIES", vacancies} as const),
    setApplications: (applications: ApplicationsType[]) => ({
        type: "WORKER_VACANCY/SET_APPLICATIONS",
        applications
    } as const),
    setVacancy: (vacancy: WorkerVacancyExpendsType) => ({type: "WORKER_VACANCY/SET_VACANCY", vacancy} as const),
    likeVacancy: (id: number) => ({type: "WORKER_VACANCY/LIKE_VACANCY", id} as const),
    sendRequest: () => ({type: "WORKER_VACANCY/SEND_REQUEST"} as const),
    resetVacancy: () => ({type: "WORKER_VACANCY/RESET_VACANCY"} as const),
    photo: (photo: string | null) => ({type: "WORKER_VACANCY/SET_PHOTO", photo} as const),
}

export const getVacanciesTC = (filter: number[]): ThunkType => async (dispatch) => {
    await workerVacancyAPI.getVacancies(filter)
        .then(result => dispatch(actions.setVacancies(result)));
}

export const getLikedVacanciesTC = (): ThunkType => async (dispatch) => {
    await workerVacancyAPI.getLikedVacancies()
        .then(result => dispatch(actions.setVacancies(result)));
}

export const getVacancyTC = (id: number): ThunkType => async (dispatch) => {
    dispatch(startLoadingTC());
    dispatch(actions.resetVacancy());
    const getVacancy = workerVacancyAPI.getVacancy(id)
        .then(result => {
            dispatch(actions.setVacancy(result));
        })
    const getPhoto = dispatch(getPhotoTC(id))
    Promise.all([getVacancy, getPhoto]).then(() => dispatch(endLoadingTC()));
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
        .then(response => {
            // @ts-ignore
            if (response.ok) {
                dispatch(actions.sendRequest())
            }
        })
}

export const getApplicationsTC = (): ThunkType => async (dispatch) => {
    await workerVacancyAPI.getApplications()
        .then(result => dispatch(actions.setApplications(result)));
}

export const getPhotoTC = (vacancy: number): ThunkType => async (dispatch) => {
    await authAPI.getPhoto(PhotoType.employer, vacancy)
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

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default VacancyReducer;
