import { Route, Switch, Redirect } from 'react-router-dom';
import Landing from "../pages/Landing";
import Admin from "../pages/Admin";
import Signup from "../pages/Signup";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/admin">
                <Admin />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}
export default Routes;