import React, { Component } from "react";
import { withRouter } from 'react-router';
import AuthService from "../../services/auth.service";

export const UserContext = React.createContext();

const userReducer = (state, action) => {
  state.errorHandler.message = null
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user
        }
      }
    case "SIGNOUT_USER":
      return {
        ...state,
        user: {
          ...state.user,
          email: "",
          firstName: "",
          id: null,
          lastName: "",
          taquerias: [],
          location: null,
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
class UserProvider extends Component {
  state = {
    errorHandler: {
      message: null,
      dispatch: action => this.setState(state => errorReducer(state, action))
    },
    user: {
      email: "",
      firstName: "",
      id: null,
      lastName: "",
      taquerias: [],
      location: null,
      dispatch: action => this.setState(state => userReducer(state, action))
    }
  };
  authService = new AuthService({ history: this.props.history, errorHandler: this.state.errorHandler });
  render() {
    console.log(this.state)
    return (
      <UserContext.Provider
        value={{
          ...this,
          ...this.state
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default withRouter(UserProvider);
export const UserConsumer = UserContext.Consumer;
