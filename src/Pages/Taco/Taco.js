import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Utils/Contexts/UserContext';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import placeHolder from './../../Style/Images/y9DpT.jpg';
import './Taco.scss';
import { Toggle } from '../../Components/Toggle';
import { PageControl } from '../../Components/Navigation/Navigation';
import { PencilSquare } from 'react-bootstrap-icons';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';
import { Directions } from '../../Components/DIrections/Route';
import { DaySelector } from '../../Components/Selectors';
import { generateQR } from '../../Utils/tools';

export const Taco = () => {
    const { user } = useContext(UserContext);
    const { tacoService, taqueria, taqueria: { selectTaco } } = useContext(TaqueriaContext);
    let location = useLocation();
    const [taco, settaco] = useState(null);
    const [qrUrlCode, setQrUrlCode] = useState();
    const [imageExpand, setImageExpand] = useState(null);
    let history = useHistory();
    useEffect(() => {
        const fetchTaco = async () => {
            try {
                const id = location.pathname.split('/taco/')[1];
                const res = await tacoService.getTaquieriaById({ id });
                if (res && res.data) {
                    taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: res.data } });
                    settaco(res.data);
                    qrGenerator()
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
    const setEdit = () => {
        taqueria.dispatch({ type: "EDIT_TACO", payload: { taco } });
        history.push(`${location.pathname}/update`)
    }

    const qrGenerator = async () => {
        const qrUrl = await generateQR(window.location.href)
        setQrUrlCode(qrUrl)
    }
    console.log(imageExpand)
    return taco ? (
        <div className='taco_page text-white'>
            <PageControl>
                <label className='taco_title'>
                    {taco.name}
                </label>
            </PageControl>
            <div className={`taco_page_img${imageExpand ? '--expand' : ''}`}>
                {imageExpand ? <img className={`image--expand`} src={imageExpand} onClick={() => setImageExpand(null)} /> : <div className='h-100 w-100 position-relative'>
                    {taco.photos.length ? taco.photos.map((image, idx) => {
                        return <img className={`image`} key={image.fileName} src={image.fileUrl} onClick={() => setImageExpand(image.fileUrl)} />
                    }) : <img src={placeHolder} />}
                </div>}
            </div>
            {/* <Button onClick={qrGenerator}>QR</Button> */}
            <div className='p-2'>
                {user && user.id === taco.userId ? <span className='edit_label float-left mt-2'> <PencilSquare size={24} onClick={setEdit} /></span> : null}

                <DaySelector readOnly propsDays={taco.schedule ? taco.schedule : {}} />
                <p>{taco.description}</p>
                {user && user.id === taco.userId ? <div className='w-50 pr-1 float-left'>
                    <label className='w-100'>{taco.status}</label>
                    <Toggle toggleAction={setStatus} toggleState={taco.status === 'OPEN'} />
                </div> : null
                }
                <div className='h-100 w-50 pt-4 float-left '>
                    <Directions />
                </div>
                {qrUrlCode ? <img src={qrUrlCode} /> : null}

            </div>
        </div >
    ) : null
}