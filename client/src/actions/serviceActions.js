import { GET_SERVICES, ADD_SERVICES, DELETE_SERVICE, SERVICES_LOADING } from './types';
import axios from 'axios'

export const getServices = () => dispatch => {
    dispatch(setServicesLoading());
    axios.
        get('/api/service').
            then(res => 
                dispatch({
                    type: GET_SERVICES,
                    payload: res.data
                })
                )
};

export const addService = (service) => dispatch => {
    axios.
        post('/api/service', service).
        then(res => 
            dispatch({
                type: ADD_SERVICES,
                payload: res.data
            })
            )
};
export const deleteService = (id) => dispatch =>{
    axios.delete(`/api/service/${id}`).then(res =>
        dispatch({
            type: DELETE_SERVICE,
            payload: id
        })
        )
};


export const setServicesLoading = () => {
    return {
        type: SERVICES_LOADING
    };
};


