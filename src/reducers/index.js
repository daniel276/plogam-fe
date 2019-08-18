import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import supplierReducer from "./supplierReducer";

export default combineReducers({
  security: securityReducer,
  category: categoryReducer,
  product: productReducer,
  supplier: supplierReducer,
  errors: errorReducer
})