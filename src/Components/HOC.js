import { Route, Redirect, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Utils/Context';
export const AuthenticatedOwner = ({ component: Component, auth, redirectTo, ...rest }) => {
    const { user } = useContext(Context);
    return <Route {...rest} render={(props) => (
        user.userType === 'OWNER' ? <Component {...props} />
            : <Redirect to={`${redirectTo ? redirectTo : '/signin'}`} />
    )} />
}
export const Authenticated = ({ component: Component, auth, redirectTo, ...rest }) => {
    const { authService, user } = useContext(Context);
    const [usePayload, setusePayload] = useState(false)
    let location = useLocation();
    console.log(location)
    useEffect(() => {
        const fetch = async () => {
            const loggedUser = await authService.signInToken();
            user.dispatch({ type: "SET_USER", payload: { user: loggedUser } });
            setusePayload(true);

        }
        if (!user.id) {
            fetch();
        } else {
            setusePayload(true);
        }
        return () => null
    }, [])
    return usePayload ? <Route {...rest} render={(props) => (
        user.id ? <Component {...props} />
            : <Redirect to={{
                pathname: `${redirectTo ? redirectTo : '/signin'}`,
                query: {
                    prevPath: location.pathname
                }
            }}
            />
    )} /> : null
}