import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import "./styles.scss";
import Login from "../../components/Login";

class Landing extends PureComponent {

  componentDidMount() {
    if(this.props.security.validToken){
      this.props.history.push("/menu")
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