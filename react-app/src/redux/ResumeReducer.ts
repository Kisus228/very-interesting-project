import {authAPI, employerVacancyAPI, resumeAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {PhotoType, ResumeExpendsType, ResumeType} from "../types/types";
import {endLoadingTC, startLoadingTC} from "./AppReducer";

const initialState = {
    resumes: [] as ResumeType[],
    resume: null as ResumeExpendsType | null,
    photo: null as string | null,
}

const ResumeReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "RESUME/SET_RESUMES":
            return {...state, resumes: [...action.resumes]};
        case "RESUME/SET_RESUME":
            return {...state, resume: {...action.resume}};
        case "RESUME/LIKE_RESUME":
            const newResumes = [...state.resumes];
            const resumeIndex = newResumes.findIndex(resume => resume.id === action.id);
            newResumes[resumeIndex].is_liked = !newResumes[resumeIndex].is_liked
            return {...state, resumes: newResumes};
        case "RESUME/ACCEPT_APPLICATION":
            const resume = state.resume !== null
                ? {
                    ...state.resume, desired_vacancies: state.resume.desired_vacancies
                        .filter(desiredVacancy => desiredVacancy.id_job_app !== action.id)
                } : null;
            return {...state, resume: resume};
        case "RESUME/RESET_RESUME":
            return {...state, resume: null};
        case "RESUME/SET_PHOTO":
            return {...state, photo: action.photo};
        default:
            return state;
    }
}

export const actions = {
    setResumes: (resumes: ResumeType[]) => ({type: "RESUME/SET_RESUMES", resumes} as const),
    setResume: (resume: ResumeExpendsType) => ({type: "RESUME/SET_RESUME", resume} as const),
    likeResume: (id: number) => ({type: "RESUME/LIKE_RESUME", id} as const),
    acceptApplication: (id: number) => ({type: "RESUME/ACCEPT_APPLICATION", id} as const),
    resetResume: () => ({type: "RESUME/RESET_RESUME"} as const),
    photo: (photo: string | null) => ({type: "RESUME/SET_PHOTO", photo} as const),
}

export const getResumesTC = (filter: string[]): ThunkType => async (dispatch) => {
    await resumeAPI.getResumes(filter)
        .then(result => dispatch(actions.setResumes(result)))
}

export const getLikedResumesTC = (): ThunkType => async (dispatch) => {
    await resumeAPI.getLikedResumes()
        .then(result => dispatch(actions.setResumes(result)))
}

export const getResumeTC = (id: number): ThunkType => async (dispatch) => {
    dispatch(startLoadingTC());
    dispatch(actions.resetResume());
    const getResume = resumeAPI.getResume(id)
        .then(result => {
            dispatch(actions.setResume(result));
        })
    const getPhoto = dispatch(getPhotoTC(id))
    Promise.all([getResume, getPhoto]).then(() => dispatch(endLoadingTC()));
}

export const likeResumeTC = (id: number, resumePage: boolean): ThunkType => async (dispatch) => {
    await resumeAPI.likeResume(id)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.likeResume(id))
                if (resumePage)
                    dispatch(getResumeTC(id))
            }
        })
}

export const acceptApplicationTC = (id: number): ThunkType => async (dispatch) => {
    await employerVacancyAPI.acceptApplication(id)
        .then(result => {
            // @ts-ignore
            if (result.status === 200) {
                dispatch(actions.acceptApplication(id));
            }
        })
}

export const getPhotoTC = (resume: number): ThunkType => async (dispatch) => {
    await authAPI.getPhoto(PhotoType.worker, resume)
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
export default ResumeReducer;
