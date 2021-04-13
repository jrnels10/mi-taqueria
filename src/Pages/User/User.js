import React, { Component } from 'react'
import { ListCard } from '../List/List'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Utils/Context';

export const User = () => {
    const { user, tacoService } = useContext(Context);
    console.log(user, tacoService)
    const [myTacos, setmyTacos] = useState([])
    useEffect(() => {
        const fetchTaco = async () => {
            try {
                const { id } = user;
                const res = await tacoService.getMyTaquerias({ id });
                if (res && res.data) {
                    setmyTacos(res.data)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTaco();
        return () => null
    }, [])
    return (
        <div>
            user
            {
                myTacos.map(taco => <ListCard taco={taco} />)
            }
        </div>
    )
}

