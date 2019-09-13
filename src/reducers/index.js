import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import supplierReducer from "./supplierReducer";
import stockReducer from "./stockReducer";

export default combineReducers({
  security: securityReducer,
  category: categoryReducer,
  product: productReducer,
  supplier: supplierReducer,
  stock: stockReducer,
  errors: errorReducer
})