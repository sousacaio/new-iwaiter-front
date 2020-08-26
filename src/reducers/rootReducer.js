import { combineReducers } from 'redux'
import mainReducer from './mainReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
    mainReducer,
    ordersReducer
})