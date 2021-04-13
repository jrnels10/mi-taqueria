import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, withRouter, useRouteMatch, useLocation } from 'react-router-dom';
import { GeoAltFill, House, PersonCircle, PlusSquare, Search, Star } from 'react-bootstrap-icons';
import './Navigation.scss'
import { useContext } from 'react';
import { Context } from "../Utils/Context";

const Navigation = () => {
    const { user } = useContext(Context);
    let location = useLocation();
    const searchLocationPath = location.pathname.includes('map') || location.pathname.includes('list') ? `${location.pathname.split('/searchtaco')[0]}/searchtaco` : '/list/searchtaco'
    return <Navbar bg="dark" className='nav' expand="lg">
        <Link to="/"><House color="white" size={20} /></Link>
        {/* {user.userType === 'OWNER' ? <Link to="/map/addtaco">
            <PlusSquare color="white" size={20} />
        </Link> : null} */}
        <Link to={{
            pathname: searchLocationPath
        }} >
            <Search color="white" size={20} />
        </Link>
        <Link to="/user/favorites">
            <Star color="white" size={20} />
        </Link>
        <Link to="/map"><GeoAltFill color="white" size={20} /></Link>
        <Link to="/user/owner">
            <PersonCircle color="white" size={20} />
        </Link>
    </Navbar>
};

export default withRouter(Navigation);