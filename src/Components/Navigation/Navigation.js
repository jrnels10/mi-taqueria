import { useContext, useState } from 'react';
import { Navbar } from "react-bootstrap";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { GeoAltFill, House, PersonCircle, ArrowLeftCircle, Search, Star, BoxArrowInRight } from 'react-bootstrap-icons';
import { UserContext } from "../../Utils/Contexts/UserContext";
import './Navigation.scss';

const Navigation = () => {
    const [search, setSearch] = useState(true)
    let location = useLocation();
    const searchLocationPath = location.pathname.includes('map') || location.pathname.includes('list') ? `${location.pathname.split('/searchtaco')[0]}/searchtaco` : '/list/searchtaco'
    return <Navbar bg="dark" className='nav ' expand="lg">
        <Link to="/">
            <label>
                <House color="white" size={25} />
                Home
            </label>
        </Link>
        <Link to={{
            pathname: search ? searchLocationPath : location.pathname.split('/searchtaco')[0]
        }} >
            <label>
                <Search color="white" size={25} onClick={() => setSearch(!search)} />
            Search
            </label>
        </Link>
        <Link to="/user/favorites">
            <label>
                <Star color="white" size={25} />
                Favorites
            </label>
        </Link>
        <Link to="/map">
            <label>
                <GeoAltFill color="white" size={25} />
                    Map
            </label>
        </Link>
        <Link to="/user/profile">
            <label>
                <PersonCircle color="white" size={25} />
                        Profile
            </label>
        </Link>
    </Navbar >
};

export default withRouter(Navigation);


export const PageControl = ({ children }) => {
    const { authService, user } = useContext(UserContext);
    let history = useHistory();
    const handleSignout = () => {
        user.dispatch({ type: 'SIGNOUT_USER', payload: { user: null } })
        authService.signout();
        history.push('/')
    }
    console.log(user)
    return <div className='page_control'>
        <ArrowLeftCircle className='page_control_goBack' color="white" size={25} onClick={() => history.goBack()} />
        <div className='children_wrapper'>
            {children}
        </div>
        {user && user.id ? <BoxArrowInRight className='page_control_signOut' color="white" size={25} onClick={handleSignout} /> : null}
    </div>
}