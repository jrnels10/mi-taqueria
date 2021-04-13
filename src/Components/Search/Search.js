import React, { useState, useCallback, useContext } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { FilterRight, FilterSquareFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Context } from '../../Utils/Context';
import './Search.scss';

export const TaqueriaSearch = ({ children }) => {
    const { tacoService, taqueria } = useContext(Context);
    console.log(children)
    const [searchValue, setsearchValue] = useState(taqueria.searchValue)
    const searchBy = async e => {
        console.log(e.target.value)
        setsearchValue(e.target.value)
        if (e.target.value.length > 1) {
            const res = await tacoService.getTaqueria({ search: e.target.value });
            taqueria.dispatch({
                type: "SEARCHLIST",
                payload: { searchValue: e.target.value, searchList: [...res.data] },
            });
        }
    }
    return <div className='taco_search'>
        <Form.Control
            className='taco_search_input'
            name="search"
            type="text"
            placeholder="Search by name or description"
            value={searchValue}
            onChange={searchBy}
        />
        <div className='taco_search_filter--icon'>
            <FilterRight color="white" size={25} />
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
    </div>
}