import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import Landing from "./layout/landing";
import Dashboard from "./layout/landing/Dashboard";
import store from "./store";
import Header from "./layout/Header";
import CreateUpdateProduct from "./components/Product/CreateUpdateProduct";
import CreateUpdateSupplier from "./components/Supplier/CreateUpdateSupplier";
import ProductDetail from "./layout/landing/Product/ProductDetail";
import SupplierDetail from "./layout/landing/Supplier/SupplierDetail";
import './App.css';
import NotFoundPage from "./layout/landing/NotFoundPage";
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";
import Supplier from "./layout/landing/Supplier";
import Warehouse from "./components/Warehouse";

const jwtToken = localStorage.jwttoken;

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwt = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwt
  });

  const currentTime = Date.now()/1000;
  if(decoded_jwt.exp < currentTime){
    store.dispatch(logout());
    window.location.href = "/"
    // window.location.href("/");
  }
}

function App() {
  return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Switch>
              <SecuredRoute exact path="/menu" component={Dashboard}/>
              <SecuredRoute exact path="/add-product" component={CreateUpdateProduct}/>
              <SecuredRoute exact path="/add-warehouse" component={Warehouse}/>
              <SecuredRoute exact path="/supplier" component={Supplier}/>
              <SecuredRoute exact path="/add-supplier" component={CreateUpdateSupplier}/>
              <SecuredRoute exact path="/product/:id" component={ProductDetail}/>
              <SecuredRoute exact path="/supplier/:id" component={SupplierDetail}/>
              <SecuredRoute path="*" component={NotFoundPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
  );
}

export default App;
