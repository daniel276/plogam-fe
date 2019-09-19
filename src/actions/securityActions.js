import axios from "axios";
import jwt_decode from 'jwt-decode';
import setJWTToken from "../securityUtils/setJWTToken";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJTWTToken from "../securityUtils/setJWTToken";

export const login = loginRequest => async dispatch => {
  try{
    //post login request
    //hit endpoint
    const res = await axios.post("/users/login", loginRequest);
    //extract token from res.data
    const { token } = res.data;

    if( token ){
      //set the token in our localStorage
      localStorage.setItem("jwttoken", token);
      //set our token in the header
      setJWTToken(token);
      //decode the token
      const decoded = jwt_decode(token);
      //dispatch to securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      })
    }
  }catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwttoken");
  setJTWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
};