import { useState, useEffect, useRef, useContext } from 'react';
import { EmojiWinkFill } from 'react-bootstrap-icons';
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { PopupQuestion, TaqueriaPopup } from './Popups';
import L from 'leaflet';
import openTaco from './../../Style/Images/taco_open.png';
import openClosed from './../../Style/Images/taco_closed.png';
import { useHistory } from 'react-router-dom';
import { Context, UserContext } from "../../Utils/Contexts/UserContext";
import PersonFill from './../../Style/Images/PersonFill.svg'
import { TaqueriaContext } from '../../Utils/Contexts/TaqueriaContext';

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

const tacoIcon = ({ status, className }) => new L.Icon({
    iconUrl: status === 'OPEN' ? openTaco : openClosed,
    iconRetinaUrl: status === 'OPEN' ? openTaco : openClosed,
    iconAnchor: null,
    iconSize: '35',
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className
    // iconSize: new L.Point(60, 75),
    // className: 'leaflet-div-icon'
});

export function UserMarker() {
    const { user } = useContext(UserContext);
    const [position, setPosition] = useState(user.location);
    const [bbox, setBbox] = useState([]);
    const map = useMap();


    useEffect(() => {
        if (position && user.location === null) {
            user.dispatch({ type: "SET_USER_LOCATION", payload: { location: position } })
        }
        else if (!position) {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.setView(e.latlng, 12);
                //     }
                //     // const radius = e.accuracy;
                //     // const circle = L.circle(e.latlng, radius);
                //     // circle.addTo(map);
                //     // setBbox(e.bounds.toBBoxString().split(","));
            });

        }
        return () => null
    }, [position])
    return position === null ? null : (
        <Marker position={position} icon={iconPerson} >
            {/* <Popup>
                You are here. <br />
          Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup> */}
        </Marker>
    );
}
export function TaqueriaMarker(props) {
    const { taco, selectTaco } = props;
    const { taqueria: { dispatch, searchList } } = useContext(TaqueriaContext);
    const markerRef = useRef();
    const foundTaco = searchList.length ? searchList.find(s => s.id === taco.id) ? 'searchTrue' : 'searchFalse' : '';
    return <Marker
        icon={tacoIcon({ status: taco.status, className: foundTaco })}
        position={[taco.latitude, taco.longitude]}
        ref={markerRef}
        eventHandlers={{
            click: () => {
                selectTaco(null);
                dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: null } });
                setTimeout(() => {
                    selectTaco(taco);
                    dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: taco } });
                }, 100)
            }
        }} >
        {/* <TaqueriaPopup data={taco} /> */}
    </ Marker>
}


export function SuggestedMarker(props) {
    const { suggested } = props;
    const map = useMap();
    const { taqueria } = useContext(TaqueriaContext);
    const [position, setPosition] = useState(suggested ? suggested : [taqueria.latitude, taqueria.longitude]);

    console.log('suggested')
    const initMarker = (ref) => {
        if (ref) {
            setTimeout(() => {
                ref.openPopup();
            }, 2000);
        }
    };
    useMapEvent("click", async (e) => {
        console.log(e);
        setPosition([e.latlng.lat, e.latlng.lng]);

    });
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
    const { taqueria } = useContext(TaqueriaContext);
    const [position, setPosition] = useState(taqueria.latitude ? [taqueria.latitude, taqueria.longitude] : null);


    useMapEvent("click", async (e) => {
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
    console.log('testiong')
    return position === null ? null : (
        <Marker ref={initMarker} position={position}>
            <PopupQuestion latlng={position} />
        </Marker>
    )
};