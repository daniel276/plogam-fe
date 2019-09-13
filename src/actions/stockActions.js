import axios from "axios";
import {GET_WAREHOUSE, GET_WAREHOUSES, GET_STOCK, GET_ERRORS} from "./types";

export const addStock = (Stock, product_id) => async dispatch => {
  try{
    await axios.post(`/stock/add-stock/${product_id}`, Stock);
    window.location.reload();
  }catch (e) {
    console.log('err')
  }
};

export const addWarehouse = Warehouse => async dispatch => {
  try{
    await axios.post("/stock/add-warehouse", Warehouse);
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const updateWarehouse = Warehouse => async dispatch => {
  try {
    await axios.patch("/stock/update-warehouse", Warehouse)
    window.location.reload()
  }catch (e) {
    console.log("error patch")
  }
};

export const updateStockQuantity = (Stock, update_type, quantityChange) => async dispatch => {
  let type = "";
  if(update_type === "ADD"){
    type = "menambah"
  }else if(update_type === "SUBTRACT"){
    type = "mengurangi"
  }

  try {
    if(window.confirm(`Apakah anda yakin untuk ${type} stok di lokasi ini sejumlah ${quantityChange} unit?`)){
      await axios.patch(`/stock/update-quantity?update_type=${update_type}`, Stock);
      window.location.reload()
    }
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getWarehouses = () => async dispatch => {
  try{
    const res = await axios.get("/stock/warehouses");
    dispatch({
      type: GET_WAREHOUSES,
      payload: res.data
    })
  }catch (e) {
    console.log('err')
  }
};

export const getWarehouse = (warehouse_id) => async dispatch => {
  try {
    const res = await axios.get(`/stock/warehouse/${warehouse_id}`);
    dispatch({
      type: GET_WAREHOUSE,
      payload: res.data
    })
  }catch (e) {
    console.log('error fetching')
  }
};

export const getStock = stock_id => async dispatch => {
  try {
    const res = await axios.get(`/stock/${stock_id}`)
    dispatch({
      type: GET_STOCK,
      payload: res.data
    })
  }catch (e) {
    console.log('err',e)
  }
}