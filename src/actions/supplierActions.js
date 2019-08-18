import axios from "axios";
import {GET_SUPPLIERS} from "./types";

export const getSuppliers = () => async dispatch => {
  const res = await axios.get("/api/supplier/all")
  dispatch({
    type: GET_SUPPLIERS,
    payload: res.data
  })
};