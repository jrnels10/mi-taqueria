import React, { Component } from "react";
import { Taqueria } from "./Interfaces";
import { withRouter } from 'react-router';
import TaqueriaService from "../services/taqueria.service";
import MapboxService from "../services/mapbox.services";
import AuthService from "../services/auth.service";

export const Context = React.createContext();
const taqueriaReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        taqueria: action.payload.taqueria
      };
    case "SUGGESTED_LOCATION":
      return {
        ...state,
        taqueria: {
          ...state.taqueria,
          suggestedLocation: {
            ...action.payload.latLng
          }
        }
      }
    case "SET_LOCATE":
      return {
        ...state,
        taqueria: {
          ...state.taqueria,
          setLocate: action.payload.setLocate
        }
      }
    case "SET_SELECTED_TACO":
      return {
        ...state,
        taqueria: {
          ...state.taqueria,
          selectTaco: action.payload.selectTaco
        }
      }
    case "SEARCHLIST":
      return {
        ...state,
        taqueria: {
          ...state.taqueria,
          searchList: [...action.payload.searchList],
          searchValue: action.payload.searchValue
        }
      }
    default:
      return state;
  }
};
const mapReducer = (state, action) => {
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

    default:
      return state;
  }
}
const userReducer = (state, action) => {
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user
        }
      }
    case "SET_USER_LOCATION":
      return {
        ...state,
        user: {
          ...state.user,
          location: action.payload.location
        }
      }
    default:
      return state;
  }
};
class Provider extends Component {
  authService = new AuthService({ history: this.props.history });
  tacoService = new TaqueriaService({ history: this.props.history });
  mapboxService = new MapboxService({ history: this.props.history });
  state = {
    user: {
      location: null,
      dispatch: action => this.setState(state => userReducer(state, action))
    },
    tacoMap: {
      mapLocation: [33.3, -112.2],
      mapZoom: 11,
      dispatch: action => this.setState(state => mapReducer(state, action))
    },
    taqueria: {
      id: 0,
      name: "",
      description: "",
      latitude: 0,
      longitude: 0,
      selectTaco: null,
      timeOpen: new Date(),
      timeClose: new Date(),
      status: "CLOSED",
      suggestedLocation: null,
      searchList: [],
      searchValue: '',
      setLocate: false,
      dispatch: action => this.setState(state => taqueriaReducer(state, action))
    },
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this,
          ...this.state
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default withRouter(Provider);
export const Consumer = Context.Consumer;
