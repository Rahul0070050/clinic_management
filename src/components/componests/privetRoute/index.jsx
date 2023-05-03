import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLogedIn } from '../../../util/utilFunnctions';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // useSelector(state => state.root)
    return (
        <Route {...rest} render={props => (
            isLogedIn() ?
                <Component {...props} />
                : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;
