import { useContext } from 'react';
import { Navbar } from "react-bootstrap";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { GeoAltFill, House, PersonCircle, ArrowLeftCircle, Search, Star, BoxArrowInRight } from 'react-bootstrap-icons';
import { UserContext } from "../../Utils/Contexts/UserContext";
import './Navigation.scss';

const Navigation = () => {
    // const { user } = useContext(Context);
    let location = useLocation();
    const searchLocationPath = location.pathname.includes('map') || location.pathname.includes('list') ? `${location.pathname.split('/searchtaco')[0]}/searchtaco` : '/list/searchtaco'
    return <Navbar bg="dark" className='nav' expand="lg">
        <Link to="/"><House color="white" size={20} /></Link>
        <Link to={{
            pathname: searchLocationPath
        }} >
            <Search color="white" size={20} />
        </Link>
        <Link to="/user/favorites">
            <Star color="white" size={20} />
        </Link>
        <Link to="/map"><GeoAltFill color="white" size={20} /></Link>
        <Link to="/user/profile">
            <PersonCircle color="white" size={20} />
        </Link>
    </Navbar>
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
    return <div className='page_control p-1'>
        <ArrowLeftCircle className='page_control_goBack' color="white" size={24} onClick={() => history.goBack()} />
        <div className='children_wrapper'>
            {children}
        </div>
        {user && user.id ? <BoxArrowInRight className='page_control_signOut' color="white" size={24} onClick={handleSignout} /> : null}
    </div>
}