import {filterAPI} from "../api/Api";
import {FilterType, SkillType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';

const initialState = {
    filter: [] as FilterType[],
    skills: [] as SkillType[]
}

const FilterReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "FILTER/SET_FILTER":
            return {
                ...state,
                filter: [...action.filter],
                skills: [...action.skills]
            };
        default:
            return state;
    }
}

export const actions = {
    setFilter: (filter: FilterType[], skills: SkillType[]) => ({type: "FILTER/SET_FILTER", filter, skills} as const),
}

export const getFilterTC = (): ThunkType => async (dispatch) => {
    await filterAPI.getFilter()
        .then((filter: FilterType[]) => {
            const skills = filter
                .map((item) => item.skills)
                .reduce((all, skills) => (all.concat(skills)), [])
                .map((item) => ({value: item.id, label: item.name}))
            dispatch(actions.setFilter(filter, skills))
        })
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default FilterReducer;
