import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    service: serviceReducer,
    error: errorReducer,
    auth: authReducer
});