import { useState, useEffect, useRef, useContext } from 'react';
import { EmojiWinkFill } from 'react-bootstrap-icons';
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { PopupQuestion, TaqueriaPopup } from './Popups';
import L from 'leaflet';
import TacoIcon from './../../Style/Images/taco.png';
import { useHistory } from 'react-router-dom';
import { Context } from "../../Utils/Context";
import PersonFill from './../../Style/Images/PersonFill.svg'
let DefaultIcon = L.icon({
    iconUrl: TacoIcon,
    iconSize: '30',
    className: 'test'
});
L.Marker.prototype.options.icon = DefaultIcon;
const iconPerson = new L.Icon({
    iconUrl: PersonFill,
    iconRetinaUrl: PersonFill,
    iconAnchor: null,
    iconSize: '30',
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    // iconSize: new L.Point(60, 75),
    // className: 'leaflet-div-icon'
});
export function TestMarker(props) {
    const { taco } = props;
    console.log(props)
    // const newLat = taco.latitude + .2
    return <Marker position={[taco.latitude, taco.longitude]}></Marker>
}
export function UserMarker() {
    const { user } = useContext(Context);
    const [position, setPosition] = useState(user.location);
    const [bbox, setBbox] = useState([]);
    const map = useMap();


    map.locate().on("locationfound", function (e) {
        if (!position) {
            // debugger
            setPosition(e.latlng);
            map.flyTo(e.latlng, 12);
        }
        // const radius = e.accuracy;
        // const circle = L.circle(e.latlng, radius);
        // circle.addTo(map);
        // setBbox(e.bounds.toBBoxString().split(","));
    });

    useEffect(() => {

        if (position && user.location === null) {
            user.dispatch({ type: "SET_USER_LOCATION", payload: { location: position } })
        }
        return () => null
    }, [position])
    return position === null ? null : (
        <Marker position={position} icon={iconPerson} >
            <Popup>
                You are here. <br />
          Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}
export function TaqueriaMarker(props) {
    const { taco, selectTaco } = props;
    const { taqueria } = useContext(Context);

    const markerRef = useRef();
    const history = useHistory();
    return <Marker
        // opacity={taco.status === 'OPEN' ? 1 : .5}
        position={[taco.latitude, taco.longitude]}
        ref={markerRef}
        eventHandlers={{
            click: () => {
                selectTaco(taco);
                taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: taco } });
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