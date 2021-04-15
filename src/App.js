import { Home } from "./Pages/Home";
import { Signin, Signup } from "./Pages/Home/Signin";
import { Container } from "react-bootstrap";
import Navigation, { PageControl } from "./Components/Navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Provider, { Consumer } from "./Utils/Context";
import { useHistory } from 'react-router-dom';
import BaseHttpService from "./services/base-http.service";
import { Map } from "./Pages/Map/Map";
import Favorites from "./Pages/Favorites";
import { Authenticated, AuthenticatedOwner } from "./Components/HOC";
import { List } from "./Pages/List/List";
import { TaqueriaSearch } from "./Components/Search/Search";
import { User } from "./Pages/User/User";
import { Taco } from "./Pages/Taco/Taco";
import CreateTaco from "./Pages/Taqueria/CreateTaco";
export const App = () => {
  return (
    <Container bg="dark" className="bg-dark container_app p-0 m-0 w-100">
      <Router>
        <Provider>
          <Consumer>
            {value => {
              console.log(value)
              return <Container className="container_page p-0">
                <div style={{ height: 'calc(100vh - 57px', position: 'relative' }}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signin/" component={Signin} />
                    <Route path="/signup/" component={Signup} />
                    <Route path="/map" component={Map} />
                    <Route path="/list" component={List} />
                    <Route exact path="/taco/:id" component={Taco} />
                    <Authenticated exact path="/taco/:id/update" component={CreateTaco} />
                    <Authenticated exact path={`/user/owner`} component={User} />
                    <Authenticated path={`/user/favorites`} component={Favorites} />
                  </Switch>
                </div>
                <Navigation />
              </Container>
            }}
          </Consumer>
        </Provider>
      </Router>
    </Container>
  );
};