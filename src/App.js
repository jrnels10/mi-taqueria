import { Home } from "./Pages/Home";
import { Signin, Signup } from "./Pages/Home/Signin";
import { Container } from "react-bootstrap";
import Navigation from "./Components/Navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import UserProvider, { UserConsumer } from "./Utils/Contexts/UserContext";
import TaqueriaProvider, { TaqueriaConsumer } from './Utils/Contexts/TaqueriaContext'
import MapProvider, { MapConsumer } from './Utils/Contexts/MapContext'
import { Map } from "./Pages/Map/Map";
import Favorites from "./Pages/Favorites";
import { Authenticated } from "./Components/HOC";
import { List } from "./Pages/List/List";
import { User } from "./Pages/User/User";
import { Taco } from "./Pages/Taco/Taco";
import CreateTaco from "./Pages/Taco/CreateTaco";


export const App = () => {
  return (
    <Container bg="dark" className="bg-dark container_app p-0 m-0 w-100">
      <Router>
        <UserProvider>
          <UserConsumer>
            {value => {
              return <TaqueriaProvider>
                <TaqueriaConsumer>
                  {taqueriaValue => {
                    return <MapProvider>
                      <MapConsumer>
                        {mapValue => {
                          return <Container className="container_page p-0">
                            <div style={{ height: 'calc(100vh - 75px', position: 'relative' }}>
                              <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/signin/" component={Signin} />
                                <Route path="/signup/" component={Signup} />
                                <Route path="/map" component={Map} />
                                <Authenticated path="/map/createtaco" component={Map} />
                                <Route path="/list" component={List} />
                                <Route exact path="/taco/:id" component={Taco} />
                                <Authenticated exact path="/taco/:id/update" component={CreateTaco} />
                                <Authenticated exact path={`/user/profile`} component={User} />
                                <Authenticated path={`/user/favorites`} component={Favorites} />
                                <Authenticated path={`/user/createtaco`} component={CreateTaco} />
                              </Switch>
                            </div>
                            <Navigation />
                          </Container>
                        }}
                      </MapConsumer>
                    </MapProvider>
                  }}
                </TaqueriaConsumer>
              </TaqueriaProvider>
            }}
          </UserConsumer>
        </UserProvider>
      </Router>
    </Container>
  );
};