import {GET_PRODUCTS, GET_PRODUCT, GET_PRODUCTS_BY_SUPPLIER, DELETE_PRODUCT} from "../actions/types";

const initialState = {
  products: [],
  product: {}
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_PRODUCTS:
      return {
        ...state,
        product: action.payload
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => (product.id !== action.payload))
      };

    case GET_PRODUCTS_BY_SUPPLIER:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }

}