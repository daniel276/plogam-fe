import axios from "axios";
import {GET_CATEGORIES, GET_CATEGORY, GET_ERRORS} from "./types";

export const createCategory = (newCategory) => async dispatch => {
  try{
    if(window.confirm("Menambahkan kategori akan menghapus data di halaman ini, lanjutkan ?")){
      await axios.post("/category", newCategory);
      window.location.reload();
    }
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getCategory = (id) => async dispatch => {
  const res = await axios.get(`/category/${id}`);
  dispatch({
    type: GET_CATEGORY,
    payload: res.data
  })
};

export const getCategories = () => async dispatch => {
    const res = await axios.get("/category/all");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    })
};