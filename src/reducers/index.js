import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";

export default combineReducers({
  security: securityReducer,
  product: productReducer,
  errors: errorReducer
})