import axios from "axios";
import jwt_decode from 'jwt-decode';
import setJWTToken from "../securityUtils/setJWTToken";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";

export const login = loginRequest => async dispatch => {
  try{
    //post login request
    //hit endpoint
    const res = await axios.post("/api/users/login", loginRequest)
    //extract token from res.data
    const { token } = res.data;
    //set the token in our localStorage
    localStorage.setItem("jwttoken", token);
    //set our token in the header
    setJWTToken(token);
    //decode the token
    const decoded = jwt_decode(token)
    //dispatch to securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    })
  }catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}