import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Landing from "./layout/landing";
import Dashboard from "./layout/landing/Dashboard";
import './App.css';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./layout/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/menu" component={Dashboard}/>
      </div>
    </Router>
  );
}

export default App;
