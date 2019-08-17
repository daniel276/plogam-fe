import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import { connect } from  "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends PureComponent {

  logout = () => {
    this.props.logout();
    window.location.href = "/";
    console.log('this,', this.props);
  };

  render() {

    const { security } = this.props;

    const { user, validToken } = security;

    console.log('header', this.props);

    const isUserAuthenticated = validToken;

    console.log('what', isUserAuthenticated);

    return(
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
          <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">Inventory App</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              {/*<li className="nav-item">*/}
              {/*    <a className="nav-link" href="#">Link</a>*/}
              {/*</li>*/}
              {/*<li className="nav-item">*/}
              {/*    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>*/}
              {/*</li>*/}
            </ul>

            {!isUserAuthenticated &&
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Masuk
                </Link>
              </li>
            </ul>}
            {isUserAuthenticated && (
            <React.Fragment>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link">
                    Hi, {user.fullName}
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" onClick={this.logout} to="">
                    Keluar
                  </Link>
                </li>
              </ul>
            </React.Fragment>
            )}
          </div>
        </nav>
    )
  }

}

const mapStateToProps = state => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);