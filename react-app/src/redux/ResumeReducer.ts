import {resumeAPI, vacancyAPI} from "../api/Api";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';
import {ResumeExpendsType, ResumeType, VacancyType} from "../types/types";

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
        default:
            return state;
    }
}

export const actions = {
    setResumes: (resumes: ResumeType[]) => ({type: "RESUME/SET_RESUMES", resumes} as const),
    setResume: (resume: ResumeExpendsType) => ({type: "RESUME/SET_RESUME", resume} as const),
}

export const getResumesTC = (filter: string[]): ThunkType => async (dispatch) => {
    await resumeAPI.getResumes(filter)
        .then(result => dispatch(actions.setResumes(result)))
}

export const getResumeTC = (id: number): ThunkType => async (dispatch) => {
    await resumeAPI.getResume(id)
        .then(result => dispatch(actions.setResume(result)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default ResumeReducer;
