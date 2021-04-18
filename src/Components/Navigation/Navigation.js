import { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { GeoAltFill, House, PersonCheckFill, PersonCircle, Pencil, ArrowLeftCircle, Search, Star, BoxArrowInRight } from 'react-bootstrap-icons';
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
        <Link to="/user/profile">
            <PersonCircle color="white" size={20} />
        </Link>
    </Navbar>
};

export default withRouter(Navigation);


export const PageControl = ({ children }) => {
    const { authService } = useContext(Context);
    let history = useHistory();
    const handleSignout = () => {
        authService.signout();
        history.push('/')
    }
    return <div className='page_control p-1'>
        <ArrowLeftCircle className='page_control_goBack' color="white" size={24} onClick={() => history.goBack()} />
        {/* {user && user.id === taco.userId ? <Link to={{
            pathname: `/taco/${taco.id}/update`,
            query: { taco }
        }}><Pencil color="white" size={20} /></Link> : null} */}
        <div className='children_wrapper'>
            {children}
        </div>
        <BoxArrowInRight className='page_control_signOut' color="white" size={24} onClick={handleSignout} />
    </div>
}