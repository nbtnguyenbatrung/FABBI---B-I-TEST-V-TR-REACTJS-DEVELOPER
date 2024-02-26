import {layoutInteractionType} from "../../../actions/layout/interaction/type";


const initialState = {
    reloadData: false,
};
const layoutInteractionReducer = (state = initialState, action) => {
    switch (action.type) {

        case layoutInteractionType.ON_RELOAD_DATA:
            return {
                ...state,
                reloadData: action.params
            }
        default:
            return state;
    }
};

export default layoutInteractionReducer;
