import React, { PureComponent } from 'react';

import "./styles.scss";
import Login from "../../components/Login";

class Landing extends PureComponent {

  render() {
    return(
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Login/>
            </div>
          </div>
        </div>
    )
  }

}

export default Landing;