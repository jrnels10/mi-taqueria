import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Utils/Context';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import placeHolder from './../../Style/Images/y9DpT.jpg';
import './Taco.scss';
import { Toggle } from '../../Components/Toggle';
import { PageControl } from '../../Components/Navigation/Navigation';
import { PencilSquare } from 'react-bootstrap-icons';

export const Taco = () => {
    const { user, tacoService, taqueria } = useContext(Context);
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
    const setStatus = async () => {
        const status = taco.status === 'CLOSED' ? 'OPEN' : 'CLOSED';
        settaco({ ...taco, status });
        taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: { ...taco, status } } });
        await tacoService.updateTaqueriaStatus(taco.id, status);
    }
    const setEdit = () => {
        taqueria.dispatch({ type: "EDIT_TACO", payload: { taco } });
        history.push(`${location.pathname}/update`)
    }
    return (
        <div className='taco_page text-white'>
            <PageControl>
                {user && user.id === taco.userId ? <PencilSquare color="white" size={24} onClick={setEdit} /> : null}
            </PageControl>
            {/* <div className='taco_page_img'>
                <img src={placeHolder} />
            </div> */}
            <h3>{taco.name}</h3>
            <p>{taco.description}</p>
            {user && user.id === taco.userId ? <div className='w-100'>
                <label className='w-100'>Status</label>
                <Toggle toggleAction={setStatus} toggleState={taco.status === 'OPEN'} />
            </div> : null
            }
            {/* <Button>View Menu</Button>
            <Button>Get Directions</Button> */}
        </div >
    )
}