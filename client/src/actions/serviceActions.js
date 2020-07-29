import {
  GET_SERVICES,
  ADD_SERVICES,
  DELETE_SERVICE,
  SERVICES_LOADING,
} from "./types";
import axios from "axios";

export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  };


export const getServices = () => (dispatch) => {
  dispatch(setServicesLoading());
  axios.get("/api/service").then((res) =>
    dispatch({
      type: GET_SERVICES,
      payload: res.data,
    })
  );
};

export const addService = (service) => (dispatch, getState) => {
  axios.post("/api/service", service, tokenConfig(getState)).then((res) =>
    dispatch({
      type: ADD_SERVICES,
      payload: res.data,
    })
  );
};
export const deleteService = (id) => (dispatch, getState) => {
  axios.delete(`/api/service/${id}`, tokenConfig(getState)).then((res) =>
    dispatch({
      type: DELETE_SERVICE,
      payload: id,
    })
  );
};

export const setServicesLoading = () => {
  return {
    type: SERVICES_LOADING,
  };
};
