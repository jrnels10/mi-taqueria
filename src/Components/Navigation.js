import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import { GeoAltFill, House, PlusSquare, Search, Star } from 'react-bootstrap-icons';
import './Navigation.scss'
import { useContext } from 'react';
import { Context } from "../Utils/Context";

const Navigation = () => {
    const { user } = useContext(Context);
    return <Navbar bg="dark" className='nav' expand="lg">
        <Link to="/"><House color="white" size={20} /></Link>
        {user.userType === 'OWNER' ? <Link to="/map/addtaco">
            <PlusSquare color="white" size={20} />
        </Link> : null}
        <Link to="/map/searchtaco">
            <Search color="white" size={20} />
        </Link>
        <Star color="white" size={20} />
        <Link to="/map"><GeoAltFill color="white" size={20} /></Link>
        {/* <ArrowRight color="royalblue" size={6} /> */}
    </Navbar>
};

export default withRouter(Navigation);