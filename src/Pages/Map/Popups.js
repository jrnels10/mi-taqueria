import React, { useEffect, useContext, useState } from "react";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { Context } from "../../Utils/Contexts/UserContext";
import { Popup } from "react-leaflet";
import { TaqueriaContext } from "../../Utils/Contexts/TaqueriaContext";

export const PopupQuestion = (latlng) => {
    const { taqueria } = useContext(TaqueriaContext);
    let history = useHistory();
    const confirmMarker = async (confirm) => {
        if (confirm) {
            taqueria.dispatch({
                type: "CREATE",
                payload: {
                    taqueria: {
                        ...taqueria,
                        latitude: latlng.latlng[0],
                        longitude: latlng.latlng[1],
                        suggestedLocation: null,
                        setLocate: false,
                    },
                },
            });
            history.push('/user/createtaco');
        }
    };
    return (
        <Popup>
            <div>
                Is this the correct location?{" "}
                <label onClick={() => confirmMarker(true)}>yes</label>
            </div>
        </Popup>
    );
};


export const TaqueriaPopup = (props) => {
    const { data } = props;
    return <Popup>
        <div>{data.description}   </div></Popup>
}