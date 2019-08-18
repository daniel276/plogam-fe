import axios from "axios";
import {GET_PRODUCTS, GET_PRODUCT, GET_ERRORS} from "./types";

export const getProducts = () => async dispatch => {
  try{
    const res = await axios.get("/product/all");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
};

export const createProduct = (newProduct, history) => async dispatch => {
  try{
    await axios.post("/api/product/add-product", newProduct);
    history.push("/menu")

  }catch (e) {
    console.log('error');
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
}