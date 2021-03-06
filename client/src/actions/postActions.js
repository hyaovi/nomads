import axios from "axios";
import { BASE_URL } from '../config';
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

//add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${BASE_URL}posts`, postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get(`${BASE_URL}posts`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_POSTS, payload: [] }));
};
// get post
export const getPost = id => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get(`${BASE_URL}posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

// Delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`${BASE_URL}posts/${id}`)
    .then(res => {
      dispatch({ type: DELETE_POST, payload: id }); // cant recall getPosts actions and reload the whole page
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add like
export const addLike = id => dispatch => {
  axios
    .post(`${BASE_URL}posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
// Add like
export const removeLike = id => dispatch => {
  axios
    .post(`${BASE_URL}posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//add comment
export const addComment = (postID, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(
      `${BASE_URL}posts/comment/${postID}`,
      commentData
    )
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//delete comment
export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(
      `${BASE_URL}posts/comment/${postID}/${commentID}`
    )
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//posts set loading
export const setPostsLoading = () => {
  return { type: POST_LOADING };
};

//clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
