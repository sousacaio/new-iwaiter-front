import { FETCH_CATALOG, FETCH_ADDRESS, FETCH_SETTINGS } from '../actions/main-types/main-actions'

const initState = {
    address: {},
    settings: {},
    points: [],
    catalog: [],
}
const mainReducer = (state = initState, action) => {
    if (action.type === FETCH_CATALOG) {
        return { ...state, catalog: action.data };
    }
    if (action.type === FETCH_ADDRESS) {
        return { ...state, address: action.data };
    }

    if (action.type === FETCH_SETTINGS) {
        return { ...state, settings: action.data };
    }
    return state;
}

export default mainReducer;
