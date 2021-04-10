import React, { useForm, useCallback, useContext } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { FilterRight, FilterSquareFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Context } from '../../Utils/Context';
import './Search.scss';
import { useState } from 'react';
export const TaqueriaSearch = () => {
    const [searchTerm, setsearchTerm] = useState('')
    // const { register, handleSubmit } = useForm();
    const { tacoService, taqueria } = useContext(Context);

    // const onSubmit = useCallback(
    //     async (formValues) => {
    //         debugger
    //         const res = await tacoService.getTaqueria({ search: formValues });
    //         debugger
    //     },
    //     [taqueria]
    // );
    const searchBy = async e => {
        console.log(e.target.value)
        if (e.target.value.length > 3) {
            const res = await tacoService.getTaqueria({ search: e.target.value });
            debugger
            console.log(res)
        }
    }
    return <div className='taco_search'>
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
        <Form.Control
            className='taco_search_input'
            name="search"
            type="text"
            placeholder="Search by name or description"
            onChange={searchBy}
        // ref={register} 
        />
        {/* </Form> */}
        <div className='taco_search_filter--icon'>
            <FilterRight color="white" size={25} />
        </div>
        <ButtonGroup aria-label="Basic example" className='taco_search_by'>
            <Link to="/map/searchtaco">
                <Button variant="light" id='searchByMap'>Map</Button>
            </Link>
            <Link to="/list/searchtaco">
                <Button variant="outline-light" id='searchByList'>
                    List</Button>
            </Link>
        </ButtonGroup>
    </div>
}