import React, { useRef, useEffect, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Polyline } from "react-leaflet";
import { Redirect } from "react-router";
import { MapContext } from "../../Utils/Contexts/MapContext";
import { TaqueriaContext } from "../../Utils/Contexts/TaqueriaContext";
import { UserContext } from "../../Utils/Contexts/UserContext";
import './Directions.scss';
export const Directions = () => {
    const { user, } = useContext(UserContext);
    const { mapboxService, tacoMap, } = useContext(MapContext);
    const { taqueria: { selectTaco }, } = useContext(TaqueriaContext);
    // const getDirections = async () => {
    //     // const res = await mapboxService.getDirections({
    //     //     start: user.location,
    //     //     end: { lat: selectTaco.latitude, lng: selectTaco.longitude }
    //     // });
    //     // if (res.status === 200) {
    //     //     console.log(res)
    //     //     tacoMap.dispatch({ type: 'SET_MAP_DIRECTIONS', payload: { directions: res.data.routes } });
    //     // }
    //     return
    // }
    return <a href={`https://maps.google.com/maps?q=${selectTaco.latitude},${selectTaco.longitude}`}>
        <Button className='directions text-white'>Directions</Button>
    </a>
}

export const DirectionsLine = () => {
    const { mapboxService, tacoMap, } = useContext(MapContext);
    const { taqueria: { selectTaco }, } = useContext(TaqueriaContext);
    useEffect(() => {
        if (!selectTaco) {
            tacoMap.dispatch({ type: 'SET_MAP_DIRECTIONS', payload: { directions: null } });
        }
        return () => null
    }, [selectTaco])
    const paths = tacoMap.directions ? tacoMap.directions[0].geometry.coordinates.map(c => [c[1], c[0]]) : null;
    return paths ? <Polyline positions={paths} /> : null
}