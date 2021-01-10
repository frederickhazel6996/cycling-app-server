import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import RPT from 'react-proptypes';

const Privateroutes = ({ isAuth, render: Component, ...rest }) => (
    <Route
        {...rest}
        component={props =>
            isAuth ? <Component {...props} /> : <Redirect to="/sign" />
        }
    />
);

const mapStateToProps = state => {
    return {
        isAuth: state.admin.isAuth
    };
};

const mapDispatchtoProps = dispatch => {
    return {};
};

Privateroutes.propTypes = {
    isAuth: RPT.bool
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Privateroutes));
