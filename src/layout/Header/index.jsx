import React, { PureComponent } from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, Collapse, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from  "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends PureComponent {

  constructor(){
    super();

    this.state = {
      isOpenToggle: false
    }
  }

  handleToggle = () => {
    this.setState(prevState => ({
      isOpenToggle: !prevState.isOpenToggle
    }))
  };

  logout = () => {
    this.props.logout();
    window.location.href = "/";
    console.log('this,', this.props);
  };

  render() {

    const { security } = this.props;

    const { user, validToken } = security;

    const isUserAuthenticated = validToken;

    return(
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            Panca Logam
          </NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpenToggle} navbar>
           {isUserAuthenticated &&
           <Nav navbar>
              <NavItem>
                <Link className="nav-link" to="/">Menu <span className="sr-only">(current)</span></Link>
              </NavItem>
             <NavItem>
               <Link className="nav-link" to="/product">Produk <span className="sr-only">(current)</span></Link>
             </NavItem>
              <NavItem>
                <Link className="nav-link" to="/supplier">Supplier <span className="sr-only">(current)</span></Link>
              </NavItem>
             <NavItem>
               <Link className="nav-link" to="/simulasi-harga">Simulasi Harga<span className="sr-only">(current)</span></Link>
             </NavItem>
            </Nav>}
            {!isUserAuthenticated &&
            <Nav className="ml-auto mr-3" navbar>
              <NavItem>
                <Link className="nav-link" to="/">
                  Masuk
                </Link>
              </NavItem>
            </Nav>}
           {isUserAuthenticated && (
             <React.Fragment>
               <Nav className="ml-auto mr-3" navbar>
                 <NavItem>
                   <Link className="nav-link" to="">
                     Hi, {user.fullName}
                   </Link>
                 </NavItem>
                 <NavItem>
                   <Link className="nav-link" onClick={this.logout} to="">
                     Keluar
                   </Link>
                 </NavItem>
               </Nav>
             </React.Fragment>
            )}
          </Collapse>
        </Navbar>
        // <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        //   <button className="navbar-toggler" type="button" data-toggle="collapse"
        //           data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
        //           aria-label="Toggle navigation">
        //     <span className="navbar-toggler-icon"/>
        //   </button>
        //   <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        //     <Link className="navbar-brand" to="/">Inventory App</Link>
        //     <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        //       <li className="nav-item">
        //         <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
        //       </li>
        //       <li className="nav-item">
        //         <Link className="nav-link" to="/supplier">Supplier <span className="sr-only">(current)</span></Link>
        //       </li>
        //       {/*<li className="nav-item">*/}
        //       {/*    <a className="nav-link" href="#">Link</a>*/}
        //       {/*</li>*/}
        //       {/*<li className="nav-item">*/}
        //       {/*    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>*/}
        //       {/*</li>*/}
        //     </ul>
        //
        //     {!isUserAuthenticated &&
        //     <ul className="navbar-nav ml-auto">
        //       <li className="nav-item active">
        //         <Link className="nav-link" to="/">
        //           Masuk
        //         </Link>
        //       </li>
        //     </ul>}
        //     {isUserAuthenticated && (
        //     <React.Fragment>
        //       <ul className="navbar-nav ml-auto">
        //         <li className="nav-item active">
        //           <Link className="nav-link">
        //             Hi, {user.fullName}
        //           </Link>
        //         </li>
        //       </ul>
        //       <ul className="navbar-nav">
        //         <li className="nav-item active">
        //           <Link className="nav-link" onClick={this.logout} to="">
        //             Keluar
        //           </Link>
        //         </li>
        //       </ul>
        //     </React.Fragment>
        //     )}
        //   </div>
        // </nav>
    )
  }

}

const mapStateToProps = state => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);