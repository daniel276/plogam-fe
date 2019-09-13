import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const SecuredRoute = ({component: Component, security, ...otherProps}) => (
    <Route {...otherProps} render={props => security.user.role === "ADMIN" ? (<Component {...props}/>)
        :
        (<Redirect to="/"/>)}
    />
);


const mapStateToProps = state => ({
  security: state.security
});

export default withRouter(connect(mapStateToProps)(SecuredRoute));