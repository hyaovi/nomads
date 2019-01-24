import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//register users action
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//GET THE USER A TOKEN
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //SAVE TO LOCALSTORAGE
      localStorage.setItem("jwtToken", token);

      //SET TOKEN TO AUTH HEADER
      setAuthToken(token);
      //Decode the bearer token
      const userDataDecoded = jwt_decode(token);
      dispatch(setCurrentUser(userDataDecoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//set logged user
export const setCurrentUser = userDataDecoded => {
  return {
    type: SET_CURRENT_USER,
    payload: userDataDecoded
  };
};
