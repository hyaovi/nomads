import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILES
} from "./types";
import { SET_CURRENT_USER } from "../actions/types";

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))

    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: {} });
    });
};

//get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: null });
    });
};

//get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile/all")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROFILES, payload: null });
    });
};

//Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("api/profile/", profileData)
    .then(res => {
      // console.log(res.data);
      history.push("/dashboard");
    })
    .catch(err => {
      // console.log(err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//Profile loading
export const setProfileLoading = () => {
  return { type: PROFILE_LOADING };
};

// clear profile on logout
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};

// add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//delete experience credential
export const deleteExperience = id => dispatch => {
  axios
    .delete(`api/profile/experience/:${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete experience credential
export const deleteEducation = id => dispatch => {
  axios
    .delete(`api/profile/education/:${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete profile and user account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can't be undone!")) {
    axios
      .delete("api/profile")
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      );
  }
};