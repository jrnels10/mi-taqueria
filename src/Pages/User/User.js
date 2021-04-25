import { ListCard } from '../List/List'
import { useContext, useEffect, useState } from 'react';
import { Context, UserContext } from '../../Utils/Contexts/UserContext';
import { Button } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { PageControl } from '../../Components/Navigation/Navigation';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';

export const User = () => {
    const { user } = useContext(UserContext);
    const { tacoService, taqueria } = useContext(TaqueriaContext);
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
    // let { path } = useRouteMatch();
    const create = () => {
        taqueria.dispatch({ type: 'CREATE' })
    }
    return (
        <div className='h-100 w-100 position-relative' >
            <PageControl>

            </PageControl>
            <Link to={`/user/createtaco`}>
                <Button className='w-75 m-auto position-relative' variant="light" onClick={create}>Create Taqueria</Button>
            </Link>
            {
                myTacos.map(taco => <ListCard key={taco.id} taco={taco} />)
            }
        </div>
    )
}

