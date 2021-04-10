import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Utils/Context";
import { Popup } from "react-leaflet";
export const PopupQuestion = (latlng) => {
    const { mapboxService, taqueria } = useContext(Context);
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