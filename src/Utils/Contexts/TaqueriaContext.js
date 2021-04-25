import React, { Component } from "react";
import { withRouter } from 'react-router';
import TaqueriaService from "../../services/taqueria.service";

export const TaqueriaContext = React.createContext();
const taqueriaReducer = (state, action) => {
    state.errorHandler.message = null
    switch (action.type) {
        case "CREATE":
            return {
                ...state,
                taqueria: action.payload ? action.payload.taqueria : {
                    ...state.taqueria,
                    id: 0,
                    name: "",
                    description: "",
                    latitude: 0,
                    longitude: 0,
                    photos: [],
                    update: false,
                    schedule: ''
                }
            };

        case "EDIT_TACO":
            return {
                ...state,
                taqueria: {
                    ...state.taqueria,
                    ...action.payload.taco,
                    ...{ update: true }
                }
            }
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
        case "DELETE_IMAGES":
            return {
                ...state,
                taqueria: {
                    ...state.taqueria,
                    deleteImages: [...action.payload.photos]
                }
            }
        default:
            return state;
    }
};
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
class TaqueriaProvider extends Component {

    state = {
        errorHandler: {
            message: null,
            dispatch: action => this.setState(state => errorReducer(state, action))
        },
        taqueria: {
            id: 0,
            name: "",
            description: "",
            latitude: 0,
            longitude: 0,
            schedule: null,
            selectTaco: null,
            status: "CLOSED",
            photos: [],
            suggestedLocation: null,
            searchList: [],
            searchValue: '',
            setLocate: false,
            update: false,
            deleteImages: [],
            dispatch: action => this.setState(state => taqueriaReducer(state, action))
        }
    };
    tacoService = new TaqueriaService({ history: this.props.history, errorHandler: this.state.errorHandler });
    render() {
        console.log(this.state)
        return (
            <TaqueriaContext.Provider
                value={{
                    ...this,
                    ...this.state
                }}
            >
                {this.props.children}
            </TaqueriaContext.Provider>
        );
    }
}

export default withRouter(TaqueriaProvider);
export const TaqueriaConsumer = TaqueriaContext.Consumer;
