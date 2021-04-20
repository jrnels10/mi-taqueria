import React, { useState, useCallback, useContext } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { FilterRight, XSquareFill } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';
import { Context } from '../../Utils/Contexts/UserContext';
import { DaySelector } from '../Selectors';
import { Toggle, ToggleDrag } from '../Toggle';
import './Search.scss';

export const TaqueriaSearch = ({ children }) => {
    const { tacoService, taqueria } = useContext(TaqueriaContext);
    const [searchValue, setsearchValue] = useState(taqueria.searchValue);
    const [tacoStatus, setTacoStatus] = useState('');
    const [tacoDays, setTacoDays] = useState(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
    const [toggle, setToggle] = useState(false);
    const searchBy = async e => {
        setsearchValue(e.target.value)
        const res = await tacoService.getTaqueria({ status: tacoStatus, search: e.target.value.toLowerCase(), days: tacoDays });
        taqueria.dispatch({
            type: "SEARCHLIST",
            payload: { searchValue: e.target.value, searchList: [...res.data] },
        });
    };

    const clearSearch = async () => {
        setsearchValue('')
        const res = await tacoService.getTaqueria({ status: tacoStatus, search: '', days: tacoDays });
        taqueria.dispatch({
            type: "SEARCHLIST",
            payload: { searchValue: '', searchList: [...res.data] },
        });
    }
    const applyStatusFilter = async (filter) => {
        setTacoStatus(filter);
        const res = await tacoService.getTaqueria({ status: filter, search: searchValue.toLowerCase(), days: tacoDays });
        taqueria.dispatch({
            type: "SEARCHLIST",
            payload: { searchValue: searchValue, searchList: [...res.data] },
        });
    }
    const applyDayFilter = async (days) => {
        setTacoDays(days)
        const res = await tacoService.getTaqueria({ status: tacoStatus, search: searchValue.toLowerCase(), days });
        taqueria.dispatch({
            type: "SEARCHLIST",
            payload: { searchValue: searchValue.toLowerCase(), searchList: [...res.data] },
        });
    }
    return <div className='taco_search'>
        <div className='taco_search_filter--icon' onClick={() => setToggle(!toggle)}>
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
        <div className={`taco_search_by taco_search_by${toggle ? '--filters' : ''}`}>
            {toggle ? <div className='filter_container'>
                <TacoFilters label={tacoStatus} toggleCallBack={applyStatusFilter} />
                <DaySelector customClassName='filter_days' propsDays={tacoDays} callBack={applyDayFilter} />
            </div> : null}
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

const TacoFilters = ({ label, toggleCallBack }) => {
    const [openChecked, setOpenChecked] = useState(true);
    const [closedChecked, setClosedChecked] = useState(true);
    const changeStatus = e => {
        const { value, name } = e.target;
        let open = openChecked;
        let closed = closedChecked;
        if (name === 'OPEN') {
            if (closedChecked) {
                open = !openChecked
                setOpenChecked(open)
            }
        } else if (name === 'CLOSED') {
            if (openChecked) {
                closed = !closedChecked
                setClosedChecked(closed)
            }
        }
        return open && closed ? toggleCallBack(null) : toggleCallBack(open ? 'OPEN' : 'CLOSED');
    }
    return <React.Fragment>
        <div key={`default-checkbox`} className="ml-2 text-white w-25 float-left">
            <Form.Check
                type='checkbox'
                name='OPEN'
                checked={openChecked}
                id={`default-checkbox`}
                onChange={changeStatus}
                label={`Open`}
            />
            <Form.Check
                type='checkbox'
                name='CLOSED'
                checked={closedChecked}
                id={`default-checkbox-closed`}
                onChange={changeStatus}
                label={`Closed`}
            />
        </div>
    </React.Fragment>
}