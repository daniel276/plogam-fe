import { combineReducers } from "redux";
import securityReducer from "../../../ppm-tool-fe/src/reducers/securityReducer";
import errorReducer from "../../../ppm-tool-fe/src/reducers/errorReducer";

export default combineReducers({
  security: securityReducer,
  errors: errorReducer
})