import axios from "axios";
import {GET_CATEGORIES, GET_CATEGORY, GET_ERRORS} from "./types";

export const createCategory = (newCategory) => async dispatch => {
  try{
      await axios.post("/plogam/category", newCategory);
      window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const updateCategory = (updatedCategory) => async dispatch => {
  try {
    if(window.confirm("Yakin untuk mengubah kategori ini?")){
      await axios.patch(`/plogam/category`, updatedCategory);
      window.location.reload()
    }
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getCategory = (id) => async dispatch => {
  const res = await axios.get(`/plogam/category/${id}`);
  dispatch({
    type: GET_CATEGORY,
    payload: res.data
  })
};

export const getCategories = () => async dispatch => {
    const res = await axios.get("/plogam/category/all");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    })
};