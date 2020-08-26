import { STORE_ORDERS } from '../actions/main-types/main-actions';
const initState = {
    orders: [],
}
const ordersReducer = (state = initState, action) => {
    switch (action.type) {
        case STORE_ORDERS: {
            return { ...state, orders: action.orders }
        }
        default:
            return state;
    }
}

export default ordersReducer;
