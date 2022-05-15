import {employerVacancyAPI, resumeAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {ResumeExpendsType, ResumeType} from "../types/types";

const initialState = {
    resumes: [] as ResumeType[],
    resume: null as ResumeExpendsType | null,
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
        default:
            return state;
    }
}

export const actions = {
    setResumes: (resumes: ResumeType[]) => ({type: "RESUME/SET_RESUMES", resumes} as const),
    setResume: (resume: ResumeExpendsType) => ({type: "RESUME/SET_RESUME", resume} as const),
    likeResume: (id: number) => ({type: "RESUME/LIKE_RESUME", id} as const),
    acceptApplication: (id: number) => ({type: "RESUME/ACCEPT_APPLICATION", id} as const),
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
    await resumeAPI.getResume(id)
        .then(result => dispatch(actions.setResume(result)))
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

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default ResumeReducer;
