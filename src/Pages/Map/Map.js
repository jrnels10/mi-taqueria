import React, { useRef } from "react";
import { useEffect, useContext, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvent,
    useMap,
    LayerGroup,
} from "react-leaflet";
import { User, Taqueria } from "../../Utils/Interfaces";
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Mapindex.scss";
import CreateTaco from "../Taqueria/CreateTaco";
import { Context } from "../../Utils/Context";
import './Mapindex.scss';
import { LocationMarker, SuggestedMarker, TaqueriaMarker } from "./Markers";
import { AuthenticatedOwner } from "../../Components/HOC";
import { TaqueriaSearch } from './../../Components/Search/Search';
export const Map = () => {
    const {
        tacoService,
        taqueria: { suggestedLocation, setLocate },
    } = useContext(Context);
    const [taquerias, setTaquerias] = useState([]);
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
    return (
        <React.Fragment>
            <MapContainer
                center={[33.3, -112.2]} zoom={11}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {taquerias.map((taco) => <TaqueriaMarker key={taco.id} taco={taco} />)}
                {!suggestedLocation && setLocate ? <LocationMarker /> : null}
                {suggestedLocation ? (
                    <SuggestedMarker suggested={suggestedLocation} />
                ) : null}
            </MapContainer>
            <AnimatePresence>
                <Switch>
                    <AuthenticatedOwner path={`${path}/addtaco`} component={MiniMapContainer} />
                    <Route path={`${path}/searchtaco`}>
                        <TaqueriaSearch />
                    </Route>
                </Switch>
            </AnimatePresence>
        </React.Fragment>
    )
}


const pageVariants = {
    initial: {
        y: "500px",
        opacity: 0,
    },
    in: {
        y: "0px",
        opacity: 1,
    },
    out: {
        y: "500px",
        opacity: 0,
    },
};
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

