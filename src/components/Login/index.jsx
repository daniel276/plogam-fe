import React, { PureComponent } from "react";

import "./styles.scss";

class Login extends PureComponent {

  render() {
    return(
        <div className="login-box">
          <h1 className="display-4 text-center">Login</h1>
          <form>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Username"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password"/>
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4"/>
          </form>
        </div>
    )
  }

}

export default Login;