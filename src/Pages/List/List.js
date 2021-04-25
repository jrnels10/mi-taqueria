import { useContext } from 'react';
import {
    Link,
    Route
} from "react-router-dom";
import { TaqueriaSearch } from '../../Components/Search/Search';
import tacoImg from './../../Style/Images/taco.png'
import { GeoAltFill } from 'react-bootstrap-icons';
import './List.scss';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';


export const List = () => {
    return (
        <Route path="/list/searchtaco">
            <TaqueriaSearch>
                <div className='list'>
                    <ListContainer />
                </div>
            </TaqueriaSearch>
        </Route>
    )
}

export const ListContainer = () => {
    const { taqueria } = useContext(TaqueriaContext);
    return <div className='list_container'>
        <div className='list_container_options'>
            <label>{taqueria.searchList.length} place{taqueria.searchList.length > 1 ? 's' : ''} nearby</label>
        </div>
        {
            taqueria.searchList.map(taco => <ListCard key={taco.id} taco={taco} />)
        }
    </div>
}
export const ListCard = ({ taco }) => {
    const { status, name } = taco;
    const { taqueria } = useContext(TaqueriaContext);

    const setSelected = () => {
        taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: taco } });
    }
    return <Link to={{
        pathname: `/taco/${taco.id}`,
        query: { taco }
    }} >
        <div className='listcard' onClick={setSelected}>
            <div className='taco_img'>
                <img src={tacoImg} />
            </div>
            <div className='taco_data'>
                <label className='taco_data_label'>
                    <p>{name}</p>
                </label>
                <label className='taco_data_status'>
                    <span className={`status status--${status}`}>{status.toLowerCase()}</span>
                    <span className='miles'><GeoAltFill className='miles_geoIcon' color='#858e35' size={12} />miles</span>
                </label>
            </div>
        </div>
    </Link>
}