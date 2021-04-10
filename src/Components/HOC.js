import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../Utils/Context';

export const AuthenticatedOwner = ({ component: Component, auth, redirectTo, ...rest }) => {
    const { user } = useContext(Context);
    return <Route {...rest} render={(props) => (
        user.userType === 'OWNER' ? <Component {...props} />
            : <Redirect to={`${redirectTo ? redirectTo : '/'}`} />
    )} />
}