import React, { Component } from "react";
import { withRouter } from 'react-router';
import MapboxService from "../../services/mapbox.services";

export const MapContext = React.createContext();

const mapReducer = (state, action) => {
    state.errorHandler.message = null
    switch (action.type) {
        case "SET_MAP_LOCATION":
            return {
                ...state,
                tacoMap: {
                    ...state.tacoMap,
                    mapLocation: action.payload.mapLocation,
                    mapZoom: action.payload.mapZoom
                }
            }
        case "SET_MAP_DIRECTIONS":
            return {
                ...state,
                tacoMap: {
                    ...state.tacoMap,
                    directions: action.payload.directions
                }
            }

        default:
            return state;
    }
}
const errorReducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return {
                ...state,
                errorHandler: {
                    ...state.errorHandler,
                    message: Array.isArray(action.payload.message) ? action.payload.message : [action.payload.message]
                }
            }
        default:
            return state;
    }
};
class MapProvider extends Component {
    state = {
        errorHandler: {
            message: null,
            dispatch: action => this.setState(state => errorReducer(state, action))
        },
        tacoMap: {
            mapLocation: [33.3, -112.2],
            mapZoom: 11,
            directions: null,
            dispatch: action => this.setState(state => mapReducer(state, action))
        },
    };
    mapboxService = new MapboxService({ history: this.props.history, errorHandler: this.state.errorHandler });
    render() {
        console.log(this.state)
        return (
            <MapContext.Provider
                value={{
                    ...this,
                    ...this.state
                }}
            >
                {this.props.children}
            </MapContext.Provider>
        );
    }
}
export default withRouter(MapProvider);
export const MapConsumer = MapContext.Consumer;
