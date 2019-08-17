import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  security: PropTypes.object.isRequired
};

const SecuredRoute = ({component: Component, security, ...otherProps}) => (
    <Route {...otherProps} render={props => security.validToken === true ? (<Component {...props}/>)
        :
        (<Redirect to="/"/>)}
    />
);


const mapStateToProps = state => ({
  security: state.security
});

export default withRouter(connect(mapStateToProps)(SecuredRoute));