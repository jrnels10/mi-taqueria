import React, { useRef, useEffect, useContext, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    useMap
} from "react-leaflet";
import {
    Link,
    Route,
    useRouteMatch,
    useLocation
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Mapindex.scss";
import './Mapindex.scss';
import { LocationMarker, SuggestedMarker, TaqueriaMarker, UserMarker } from "./Markers";
import { TaqueriaSearch } from './../../Components/Search/Search';
import { ArrowRightCircleFill, BroadcastPin, CircleFill, GeoAlt, GeoAltFill } from "react-bootstrap-icons";
import { MapContext } from "../../Utils/Contexts/MapContext";
import { TaqueriaContext } from "../../Utils/Contexts/TaqueriaContext";
import { DirectionsLine } from "../../Components/DIrections/Route";
import { UserContext } from "../../Utils/Contexts/UserContext";

export const Map = () => {
    const { tacoMap } = useContext(MapContext);
    const { tacoService, taqueria, taqueria: { suggestedLocation, setLocate, selectTaco, searchList }, } = useContext(TaqueriaContext);
    const [taquerias, setTaquerias] = useState([]);
    const [selectedTaco, setSelectTaco] = useState(selectTaco);
    let { path } = useRouteMatch();
    let location = useLocation();

    useEffect(() => {
        const fetchTaquerias = async () => {
            try {
                const res = await tacoService.getTaqueria({ status: "", search: "" });
                if (res && res.data) {
                    setTaquerias(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (location.pathname.includes('createtaco')) {
            setTaquerias([]);
        }
        else if (!taquerias.length) {
            fetchTaquerias();
        }
        return () => { };
    }, [suggestedLocation, location, tacoMap]);

    return (
        <React.Fragment>
            <Route path={`${path}/searchtaco`}>
                <TaqueriaSearch />
            </Route>
            <MapContainer
                center={tacoMap.mapLocation}
                zoom={tacoMap.mapZoom}
                zoomControl={false}
            >
                {/* <MapConsumer>
                    {(map) => {
                        return <React.Fragment> */}
                <LocateIcon />
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX}`}
                />
                <DirectionsLine />
                <MapEvents />
                <UserMarker />
                {taquerias.map((taco) => <TaqueriaMarker key={taco.id} taco={taco} selectTaco={setSelectTaco} />)}
                {!suggestedLocation && location.pathname.includes('createtaco') ? <LocationMarker /> : null}
                {
                    suggestedLocation && location.pathname.includes('createtaco') ? (
                        <SuggestedMarker suggested={suggestedLocation} setSelectTaco={setSelectTaco} />
                    ) : null
                }
                {/* </React.Fragment>
                    }}
                </MapConsumer> */}
            </MapContainer>
            <TacoCard selectTaco={selectedTaco} />
        </React.Fragment>
    )
};
function MapEvents(props) {
    const map = useMap();
    const { tacoMap } = useContext(MapContext);
    const { taqueria } = useContext(TaqueriaContext);
    // map.locate().on("locationfound", e => {
    //     map.flyTo(e.latlng, 12);
    // });
    // console.log(map.getZoom())
    useMapEvents({
        click: () => {
            taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: null } });
        },
    })
    const val = useRef();
    useEffect(
        () => {
            val.current = props;
        },
        [props]
    );
    useEffect(() => {
        return () => {
            tacoMap.dispatch({ type: 'SET_MAP_LOCATION', payload: { mapLocation: map.getCenter(), mapZoom: map.getZoom() } })
        };
    }, []);
    return null
}

const LocateIcon = () => {
    const map = useMap();
    const { user } = useContext(UserContext);
    return <React.Fragment>
        {/* <CircleFill style={{ position: 'absolute', zIndex: 1000 }} color='red' size={25} /> */}
        <GeoAltFill style={{ position: 'absolute', zIndex: 1000 }} color='black' size={20} onClick={() => {
            map.locate().on("locationfound", e => {
                map.flyTo(e.latlng, 12);
                user.dispatch({ type: "SET_USER_LOCATION", payload: { location: e.latlng } });
            })
        }} />
    </React.Fragment>
}
const TacoCard = () => {
    const {
        taqueria,
        taqueria: { selectTaco },
    } = useContext(TaqueriaContext);
    return <AnimatePresence>{selectTaco ? <motion.div
        initial={{ bottom: '-100px' }}
        animate={{ bottom: '10px' }}
        exit={{ bottom: '-100px' }}
        className='select_taco'>
        <Link to={{
            pathname: `/taco/${selectTaco.id}`,
            query: { taco: selectTaco }
        }} >
            <div className="select_taco_body">
                <label className='title'>
                    {selectTaco.name.length > 20 ? `${selectTaco.name.substring(0, 20)}...` : selectTaco.name}
                </label>
                <label className={`schedule text-${selectTaco.status === 'CLOSED' ? 'danger' : 'success'}`}>
                    {/* <span className='schedule_status'>
                        {selectTaco.status}
                    </span> */}
                </label>
            </div>
        </Link>
        <label className='get_directions'>
            <a href={`https://maps.google.com/maps?q=${selectTaco.latitude},${selectTaco.longitude}`}>
                <ArrowRightCircleFill />
            </a>
        </label>
    </motion.div> : null}</AnimatePresence>
}