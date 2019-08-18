import axios from "axios";
import {GET_CATEGORIES, GET_ERRORS} from "./types";

export const createCategory = (newCategory) => async dispatch => {
  try{
    await axios.post("/api/category", newCategory)
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getCategories = () => async dispatch => {
    const res = await axios.get("/api/category/all");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    })

};