import { GET_WAREHOUSE, GET_WAREHOUSES, GET_STOCK } from "../actions/types";

const initialState = {
  stock: {},
  stocks: [],
  warehouse: {},
  warehouses: []
}

export default function(state = initialState, action){

  switch (action.type) {
    case GET_WAREHOUSE:
      return {
        ...state,
        warehouse: action.payload
      }

    case GET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };

    case GET_STOCK:
      return {
        ...state,
        stock: action.payload
      }

    default:
      return state
  }

}