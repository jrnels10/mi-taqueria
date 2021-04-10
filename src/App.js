import { Home } from "./Pages/Home";
import { Signin, Signup } from "./Pages/Home/Signin";
import { Container } from "react-bootstrap";
import Navigation from "./Components/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Provider, { Consumer } from "./Utils/Context";
import { useHistory } from 'react-router-dom';
import BaseHttpService from "./services/base-http.service";
import { Map } from "./Pages/Map/Map";
import Test from "./Pages/Test";
export const App = () => {
  return (
    <Container bg="dark" className="bg-dark container_app p-0 m-0 w-100">
      <Router>
        <Provider>
          <Consumer>
            {value => {
              console.log(value)
              return <Container className="container_page p-0">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/signin/" component={Signin} />
                  <Route path="/signup/" component={Signup} />
                  <Route path="/map" component={Map} />
                  {/* <Route path="/test" >
                    <Test value={value} />
                  </Route> */}

                  {/*   <Route exact path="/tasks/create" component={CreateTaskPage} /> */}
                </Switch>
                {value.props.location.pathname !== '/' ? <Navigation /> : null}
              </Container>
            }}
          </Consumer>
        </Provider>
      </Router>
    </Container>
  );
};

