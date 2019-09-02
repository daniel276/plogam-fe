import axios from "axios";
import {GET_PRODUCTS, GET_PRODUCT, GET_ERRORS, GET_PRODUCTS_BY_SUPPLIER, DELETE_PRODUCT} from "./types";

export const getProducts = () => async dispatch => {
  try{
    const res = await axios.get("/api/product/all");
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

export const getProduct = (product_id) => async dispatch => {
  try{
    const res = await axios.get(`/api/product/${product_id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const createProduct = (newProduct, history) => async dispatch => {
  try{
    await axios.post("/api/product/add-product", newProduct);
    history.push("/menu");
    window.location.reload();

  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const updateProduct = (Product) => async dispatch => {
  try{
    await axios.patch("/api/product", Product);
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const deleteProduct = (product_id) => async dispatch => {
  if(window.confirm("Apakah anda yakin menghapus barang ini?")){
    await axios.delete(`/api/product/${product_id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: product_id
    })
  }
};

export const getProductsBySupplierId = (supplierId) => async dispatch => {
  try{
    const res = await axios.get(`/api/product/supplier_id=${supplierId}`);
    dispatch({
      type: GET_PRODUCTS_BY_SUPPLIER,
      payload: res.data
    })
  }catch(err){
    console.log('error fetch')
  }
};