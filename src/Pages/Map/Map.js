import React, { useRef, useEffect, useContext, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
    LayerGroup,
} from "react-leaflet";
import {
    Link,
    Route,
    useRouteMatch,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Mapindex.scss";
import CreateTaco from "../Taqueria/CreateTaco";
import { Context } from "../../Utils/Context";
import './Mapindex.scss';
import { LocationMarker, SuggestedMarker, TaqueriaMarker, UserMarker } from "./Markers";
import { AuthenticatedOwner } from "../../Components/HOC";
import { TaqueriaSearch } from './../../Components/Search/Search';
import { PlusSquareFill, XSquareFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
export const Map = () => {
    const {
        tacoMap,
        tacoService,
        taqueria: { suggestedLocation, setLocate, selectTaco, searchList },
    } = useContext(Context);
    const [taquerias, setTaquerias] = useState([]);
    const [selectedTaco, setSelectTaco] = useState(selectTaco);
    let { path } = useRouteMatch();
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
        if (!taquerias.length) {
            fetchTaquerias();
        }
        return () => { };
    }, [suggestedLocation]);
    const tacoList = searchList.length ? searchList : taquerias;
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
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianJuZWxzMTAiLCJhIjoiY2ticjNwdXR4MXlpcTJ5dG1rdjF4MDdxeSJ9.tiUpLiArSzx6thNUgPOL-w"
                />
                <MapEvents />
                <UserMarker />
                {tacoList.map((taco) => <TaqueriaMarker key={taco.id} taco={taco} selectTaco={setSelectTaco} />)}
                {!suggestedLocation && setLocate ? <LocationMarker /> : null}
                {suggestedLocation ? (
                    <SuggestedMarker suggested={suggestedLocation} setSelectTaco={setSelectTaco} />
                ) : null}
            </MapContainer>
            <TacoCard selectTaco={selectedTaco} />
        </React.Fragment>
    )
};
function MapEvents(props) {
    const map = useMap();
    const { tacoMap } = useContext(Context);
    // map.locate().on("locationfound", e => {
    //     map.flyTo(e.latlng, 12);
    // });
    // console.log(map.getZoom())
    // const mapEvents = useMapEvents({
    //     click: () => {
    //         mapEvents.locate()
    //     },
    //     locationfound: (location) => {
    //         console.log('location found:', location)
    //         map.flyTo(location.latlng, map.getZoom())
    //         setUserLocation([location.latitude, location.longitude])
    //     },
    // })
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
const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
};
const TacoCard = () => {
    const {
        taqueria,
        taqueria: { selectTaco },
    } = useContext(Context);
    return selectTaco ? <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: 0 }}
        className='select_taco'>
        {selectTaco.name}
        <Link to={{
            pathname: `/taco/${selectTaco.id}`,
            query: { taco: selectTaco }
        }} >View More</Link>

        < label onClick={() => taqueria.dispatch({ type: 'SET_SELECTED_TACO', payload: { selectTaco: null } })}>
            <XSquareFill />
        </label>
    </motion.div> : null
}

const MiniMapContainer = (props) => {
    const {
        taqueria,
        taqueria: { setLocate },
    } = useContext(Context);
    console.log(taqueria);
    return (
        <React.Fragment>
            {/* {setLocate ? <GeoAddress /> : null} */}
            <motion.div
                className={`map_add_taco bg-dark text-white hide--${setLocate}`}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ ease: "easeIn", duration: 0.3 }}
            >
                <CreateTaco />
            </motion.div>
        </React.Fragment>
    );
};

