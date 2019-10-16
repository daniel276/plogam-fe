import axios from "axios";
import {ADD_CART, ADD_QUANTITY, GET_ERRORS, REMOVE_ITEM, RESET_CART, SEARCH_ITEMS, SUB_QUANTITY} from "./types";
import {trackPromise} from "react-promise-tracker";

export const searchProducts = (searchQuery) => async dispatch => {
    await trackPromise(
        axios.get(`/plogam/product/cari?search=productName:'*${searchQuery}*'`).then(res =>
            dispatch({
              type: SEARCH_ITEMS,
              payload: res.data
            })
        ).catch(e =>
        dispatch({
          type: GET_ERRORS,
          payload: e.response.data
        }))
    )

    // dispatch({
    //   type: SEARCH_ITEMS,
    //   payload: res.data
    // })

};

export const addToCart = id => async dispatch => {
  try{
    dispatch({
      type: ADD_CART,
      payload: id
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e
    })
  }
};

export const resetCart = () => async dispatch => {
  try{
    dispatch({
      type: RESET_CART
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS
    })
  }
};

export const removeItem = id => async dispatch =>{
  try{
    dispatch({
      type: REMOVE_ITEM,
      payload: id
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e
    })
  }
};

export const addQuantity = id => async dispatch => {
  try{
    dispatch({
      type: ADD_QUANTITY,
      payload: id
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e
    })
  }
};

export const subQuantity = id => async dispatch => {
  try{
    dispatch({
      type: SUB_QUANTITY,
      payload: id
    })
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e
    })
  }
};

