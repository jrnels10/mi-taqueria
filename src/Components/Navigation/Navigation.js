import { useContext, useEffect, useState } from 'react';
import { Navbar } from "react-bootstrap";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { GeoAltFill, House, PersonCircle, ArrowLeftCircle, Search, Star, BoxArrowInRight } from 'react-bootstrap-icons';
import { UserContext } from "../../Utils/Contexts/UserContext";
import './Navigation.scss';

const Navigation = () => {
    const [search, setSearch] = useState(true);
    const [activePage, setactivePage] = useState('home')
    let location = useLocation();
    const searchLocationPath = location.pathname.includes('map') || location.pathname.includes('list') ? `${location.pathname.split('/searchtaco')[0]}/searchtaco` : '/map/searchtaco'
    const clearBackground = location.pathname === '/';
    const onClickAction = (searching, pageSelected) => {
        setactivePage(pageSelected)
        setSearch(searching)
    }

    useEffect(() => {
        return location.pathname.includes('taco') && !location.pathname.includes('searchtaco') ? setactivePage('home') : null;
    }, [location.pathname]);
    return <Navbar className={`nav nav${clearBackground ? '' : '--colored'}`} expand="lg">
        <Link to="/">
            <label className={`nav_icon `} >
                <House size={25} onClick={() => onClickAction(true, 'home')} />
                Home
            </label>
        </Link>
        <Link to={{
            pathname: search ? searchLocationPath : '/map'
        }} >
            <label className={`nav_icon nav_icon${activePage === 'search' ? '--active' : ''}`}>
                <Search size={25} onClick={() => onClickAction(true, 'search')} />
            Search
            </label>
        </Link>
        <Link to="/user/favorites">
            <label className={`nav_icon nav_icon${activePage === 'favorites' ? '--active' : ''}`}>
                <Star size={25} onClick={() => onClickAction(true, 'favorites')} />
                Favorites
            </label>
        </Link>
        <Link to="/map">
            <label className={`nav_icon nav_icon${activePage === 'map' ? '--active' : ''}`}>
                <GeoAltFill size={25} onClick={() => onClickAction(true, 'map')} />
                    Map
            </label>
        </Link>
        <Link to="/user/profile">
            <label className={`nav_icon nav_icon${activePage === 'user' ? '--active' : ''}`}>
                <PersonCircle size={25} onClick={() => onClickAction(true, 'user')} />
                        Profile
            </label>
        </Link>
    </Navbar >
};

export default withRouter(Navigation);


export const PageControl = ({ children = null }) => {
    const { authService, user } = useContext(UserContext);
    let history = useHistory();
    const handleSignout = () => {
        user.dispatch({ type: 'SIGNOUT_USER', payload: { user: null } })
        authService.signout();
        history.push('/')
    }
    return <div className='page_control'>
        <ArrowLeftCircle className='page_control_goBack' color="white" size={28} onClick={() => history.goBack()} />
        <div className='children_wrapper'>
            {children}
        </div>
        {user && user.id ? <BoxArrowInRight className='page_control_signOut' color="white" size={28} onClick={handleSignout} /> : null}
    </div>
}