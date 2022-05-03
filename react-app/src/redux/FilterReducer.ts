import {filterAPI} from "../api/Api";
import {FilterType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from './ReduxStore';

const initialState = {
    filter: [] as FilterType[],
}

const FilterReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case "FILTER/SET_FILTER":
            return {...state, filter: [...action.filter]};
        default:
            return state;
    }
}

export const actions = {
    setFilter: (filter: FilterType[]) => ({type: "FILTER/SET_FILTER", filter} as const),
}

export const getFilterTC = (): ThunkType => async (dispatch) => {
    await filterAPI.getFilter()
        .then(result => dispatch(actions.setFilter(result)))
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export default FilterReducer;
