import { Home } from "./Pages/Home";
import { Signin, Signup } from "./Pages/Home/Signin";
import { Container } from "react-bootstrap";
import { Navigation } from "./Components/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TaqueriaMap from "./Pages/Map/MapIndex";
import "./App.scss";

export const App = () => {

  return (
    <Container bg="dark" className="bg-dark container_app p-0">
      <Router>
        <Navigation />
        <Container className="container_page p-0">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin/" component={Signin} />
            <Route path="/signup/" component={Signup} />
            <Route exact path="/map" component={TaqueriaMap} />
            {/*   <Route exact path="/tasks/create" component={CreateTaskPage} /> */}
          </Switch>
        </Container>
      </Router>
    </Container>
  );
};

