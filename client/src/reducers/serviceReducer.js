import { GET_SERVICES, ADD_SERVICES, DELETE_SERVICE, SERVICES_LOADING } from '../actions/types';


const initialState = {
    services: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload,
                loading: false
            };
        case DELETE_SERVICE:
            return {
                ...state,
                services: state.services.filter(service => service._id !== action.payload)
            };
        case ADD_SERVICES:
            return {
                ...state,
                services: [action.payload, ...state.services]
            };
        case SERVICES_LOADING:
            return {
                ...state, 
                loading: true
            };
        default:
            return state;
    }
}