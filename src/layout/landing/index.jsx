import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import "./styles.scss";
import Login from "../../components/Login";

class Landing extends PureComponent {

  componentDidMount() {
    const isAdmin = this.props.security.user.role === "ADMIN";
    const isAuth = this.props.security.validToken;

    if(isAuth && isAdmin){
      this.props.history.push('/menu')
    }if(isAuth && !isAdmin) {
      this.props.history.push("/product")
    }
  }

  render() {
    return(
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Login {...this.props} />
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(Landing);