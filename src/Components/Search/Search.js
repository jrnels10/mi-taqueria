import React, { useState, useCallback, useContext } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { FilterRight, XSquareFill } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';
import { Context } from '../../Utils/Contexts/UserContext';
import './Search.scss';

export const TaqueriaSearch = ({ children }) => {
    const { tacoService, taqueria } = useContext(TaqueriaContext);
    const [searchValue, setsearchValue] = useState(taqueria.searchValue);
    let history = useHistory();
    const searchBy = async e => {
        setsearchValue(e.target.value)
        const res = await tacoService.getTaqueria({ search: e.target.value.toLowerCase() });
        taqueria.dispatch({
            type: "SEARCHLIST",
            payload: { searchValue: e.target.value, searchList: [...res.data] },
        });
    }
    const clearSearch = () => {
        setsearchValue('')
        taqueria.dispatch({
            type: "SEARCHLIST",
            payload: { searchValue: '', searchList: [] },
        });
    }
    return <div className='taco_search'>
        <div className='taco_search_filter--icon'>
            <FilterRight color="white" size={25} />
        </div>
        <Form.Control
            autoFocus
            className='taco_search_input'
            name="search"
            type="text"
            placeholder="Search by name or description"
            value={searchValue}
            onChange={searchBy}
        />
        <div className='taco_search_filter--icon-close' onClick={clearSearch}>
            <XSquareFill color="#515156" size={30} />
        </div>
        <div className='taco_search_by'>
            <ButtonGroup>
                <Link to="/map/searchtaco">
                    <Button variant="light" id='searchByMap'>Map</Button>
                </Link>
                <Link to="/list/searchtaco">
                    <Button variant="dark" id='searchByList'>
                        List</Button>
                </Link>
            </ButtonGroup>
        </div>
        {children}
    </div >
}