import { ListCard, ListContainer } from '../List/List'
import { useContext, useEffect, useState } from 'react';
import { Context, UserContext } from '../../Utils/Contexts/UserContext';
import { Button } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { PageControl } from '../../Components/Navigation/Navigation';
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';
import './User.scss';
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
    }, []);
    const create = () => {
        taqueria.dispatch({ type: 'CREATE' })
    }
    return (
        <div className='user_page h-100 w-100 position-relative' >
            <PageControl>

            </PageControl>
            <div className='w-100 m-auto text-center'>
                <Link to={`/user/createtaco`}>
                    <Button className='w-75 position-relative create_taco_buttons' onClick={create}>Create Taqueria</Button>
                </Link>
            </div>
            <div className='user_list_container'>
                <ListContainer myTacos={myTacos} />
            </div>

            {/* {
                myTacos.map(taco => <ListCard key={taco.id} taco={taco} />)
            } */}
        </div>
    )
}

