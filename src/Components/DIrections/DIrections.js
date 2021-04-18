import React, { useRef, useEffect, useContext, useState } from "react";
import { Polyline } from "react-leaflet";
import { Context } from "../../Utils/Context";
import './Directions.scss';
export const Directions = () => {
    const {
        user,
        mapboxService,
        tacoMap,
        taqueria: { selectTaco },
    } = useContext(Context);
    const getDirections = async () => {
        const res = await mapboxService.getDirections({
            start: user.location,
            end: { lat: selectTaco.latitude, lng: selectTaco.longitude }
        });
        if (res.status === 200) {
            console.log(res)
            tacoMap.dispatch({ type: 'SET_MAP_DIRECTIONS', payload: { directions: res.data.routes } });
        }
    }
    return <label className='directions' onClick={getDirections}>Directions</label>
}

export const DirectionsLine = () => {
    const { tacoMap, taqueria: { selectTaco }, } = useContext(Context);
    useEffect(() => {
        if (!selectTaco) {
            tacoMap.dispatch({ type: 'SET_MAP_DIRECTIONS', payload: { directions: null } });
        }
        return () => null
    }, [selectTaco])
    const paths = tacoMap.directions ? tacoMap.directions[0].geometry.coordinates.map(c => [c[1], c[0]]) : null;
    return paths ? <Polyline positions={paths} /> : null
}