import { GET_ERRORS } from "./types";
import axios from "axios";

//register users action
export const registerUser = userData => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(response => console.log(response.data))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
