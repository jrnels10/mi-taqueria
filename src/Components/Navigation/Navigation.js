import { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { GeoAltFill, House, PersonCircle, Pencil, ArrowLeftCircle, Search, Star } from 'react-bootstrap-icons';
import './Navigation.scss'
import { Context } from "../../Utils/Context";

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


export const PageControl = () => {
    const { user } = useContext(Context);
    let history = useHistory();
    return <div className='page_control p-1'>
        <ArrowLeftCircle color="white" size={24} onClick={() => history.goBack()} />
        {/* {user && user.id === taco.userId ? <Link to={{
            pathname: `/taco/${taco.id}/update`,
            query: { taco }
        }}><Pencil color="white" size={20} /></Link> : null} */}
    </div>
}