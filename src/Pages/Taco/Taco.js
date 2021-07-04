import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Utils/Contexts/UserContext';
import { Link, useHistory, useLocation } from 'react-router-dom';
import placeHolder from './../../Style/Images/y9DpT.jpg';
import './Taco.scss';
import { Toggle } from '../../Components/Toggle';
import { PageControl } from '../../Components/Navigation/Navigation';
import { PencilSquare } from 'react-bootstrap-icons';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';
import { Directions } from '../../Components/DIrections/Route';
import { DaySelector } from '../../Components/Selectors';
import { generateQR } from '../../Utils/tools';
import { EditButton } from '../../Components/Buttons/Buttons';
import { ImagesContainer } from '../../Components/Containers/ImageContainer';

export const Taco = () => {
    const { user } = useContext(UserContext);
    const { tacoService, taqueria, taqueria: { selectTaco } } = useContext(TaqueriaContext);
    let location = useLocation();
    const [taco, settaco] = useState(null);
    let history = useHistory();
    useEffect(() => {
        const fetchTaco = async () => {
            try {
                const id = location.pathname.split('/taco/')[1];
                const res = await tacoService.getTaquieriaById({ id });
                if (res && res.data) {
                    taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: res.data } });
                    settaco(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (!taco) {
            fetchTaco();
        }
        return () => null;
    }, [])
    const setStatus = async () => {
        const status = taco.status === 'CLOSED' ? 'OPEN' : 'CLOSED';
        settaco({ ...taco, status });
        taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: { ...taco, status } } });
        await tacoService.updateTaqueriaStatus(taco.id, status);
    }
    // const setEdit = () => {
    //     taqueria.dispatch({ type: "EDIT_TACO", payload: { taco } });
    //     history.push(`${location.pathname}/update`)
    // }

    return taco ? (
        <div className='container-fluid m-0 p-0 '>
            <PageControl>
                <label className='taco_title'>
                    {taco.name}
                </label>
            </PageControl>
            <div className='w-100 taco_page'>
                <div className='w-100 text-center mt-1'>
                    <Directions />
                </div>
                <ImagesContainer taco={taco} user={user} />
                <div className='taco_details container-fluid '>
                    <div className='row w-100 m-0'>
                        {user && user.id === taco.userId ? <span className='edit_label col-2 float-left mt-2'><EditButton /></span> : null}
                        <DaySelector customClassName='col-10 w-100' readOnly propsDays={taco.schedule ? taco.schedule : {}} />
                    </div>
                    <p>{taco.description}</p>
                    {user && user.id === taco.userId ? <div className='w-50 pr-1 float-left'>
                        <label className='w-100'>{taco.status}</label>
                        <Toggle toggleAction={setStatus} toggleState={taco.status === 'OPEN'} />
                    </div> : null
                    }
                </div>
            </div>
        </div >
    ) : null
}