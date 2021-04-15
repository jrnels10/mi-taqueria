import { useState, useEffect, useRef, useContext } from 'react';
import { EmojiWinkFill } from 'react-bootstrap-icons';
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { PopupQuestion, TaqueriaPopup } from './Popups';
import L from 'leaflet';
import TacoIcon from './../../Style/Images/taco.png';
import { useHistory } from 'react-router-dom';
import { Context } from "../../Utils/Context";

let DefaultIcon = L.icon({
    iconUrl: TacoIcon,
    iconSize: '30',
    className: 'test'
});
L.Marker.prototype.options.icon = DefaultIcon;
console.log(L.Marker.prototype)
export function TestMarker(props) {
    const { taco } = props;
    console.log(props)
    // const newLat = taco.latitude + .2
    return <Marker position={[taco.latitude, taco.longitude]}></Marker>
}

export function TaqueriaMarker(props) {
    const { taco, selectTaco } = props;
    const { taqueria } = useContext(Context);

    const markerRef = useRef();
    const history = useHistory();
    return <Marker
        opacity={taco.status === 'OPEN' ? 1 : .5}
        position={[taco.latitude, taco.longitude]}
        ref={markerRef}
        eventHandlers={{
            click: () => {
                selectTaco(taco);
                taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: taco } })
                history.push(`/map/${taco.id}`)
                // markerRef.current._icon.className = `${markerRef.current._icon.className} markerSelected`
                console.log(markerRef)
            }
        }} >
        {/* <TaqueriaPopup data={taco} /> */}
    </ Marker>
}


export function SuggestedMarker(props) {
    const { suggested } = props;
    const map = useMap();
    const [position, setPosition] = useState(suggested);

    const initMarker = (ref) => {
        if (ref) {
            setTimeout(() => {
                ref.openPopup();
            }, 2000);
        }
    };
    useEffect(() => {
        console.log(suggested);
        if (suggested) {
            setPosition(suggested);
            map.flyTo([suggested[0], suggested[1]], 17);
        }
    }, [suggested]);
    return position === null ? null : (
        <Marker position={[position[0], position[1]]} ref={initMarker}>
            <PopupQuestion latlng={[position[0], position[1]]} />
        </Marker>
    );
}
export function LocationMarker() {
    const [position, setPosition] = useState(null);
    useMapEvent("click", (e) => {
        console.log(e);
        setPosition([e.latlng.lat, e.latlng.lng]);
    });
    const initMarker = (ref) => {
        if (ref) {
            setTimeout(() => {
                ref.openPopup();
            }, 500);
        }
    };
    return position === null ? null : (
        <Marker ref={initMarker} position={position}>
            <PopupQuestion latlng={position} />
        </Marker>
    )
};