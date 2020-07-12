import uuid from 'uuid';
import { GET_SERVICES, ADD_SERVICES, DELETE_SERVICE } from '../actions/types';


const initialState = {
    services: [
        { id: uuid(), name: 'Virtual Machine 1' },
        { id: uuid(), name: 'Virtual Machine 2' },
        { id: uuid(), name: 'Virtual Machine 3' },
        { id: uuid(), name: 'Virtual Machine 4' },
        { id: uuid(), name: 'Virtual Machine 5' },
        { id: uuid(), name: 'Virtual Machine 6' },
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state
            }
        default:
            return state;
    }
}