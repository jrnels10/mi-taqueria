import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Utils/Context';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ArrowLeftCircle, Pencil } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import placeHolder from './../../Style/Images/y9DpT.jpg';
import './Taco.scss';

export const Taco = () => {
    const { user, tacoService } = useContext(Context);
    let location = useLocation();
    const [taco, settaco] = useState({});
    let history = useHistory();
    useEffect(() => {
        const fetchTaco = async () => {
            try {
                const id = location.pathname.split('/taco/')[1];
                const res = await tacoService.getTaquieriaById({ id });
                if (res && res.data) {
                    settaco(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (!location.query) {
            fetchTaco();
        } else {
            settaco(location.query.taco);
        }
        return () => null;
    }, [])
    console.log(user, taco)
    return (
        <div className='taco_page'>
            <div className='taco_page_control'>
                <ArrowLeftCircle color="white" size={20} onClick={() => history.goBack()} />
                {user && user.id === taco.userId ? <Pencil color="white" size={20} /> : null}
            </div>
            <div className='taco_page_img'>
                <img src={placeHolder} />
            </div>
            <h3>{taco.name}</h3>
            <p>{taco.description}</p>

            <Button>View Menu</Button>
            <Button>Get Directions</Button>
        </div>
    )
}