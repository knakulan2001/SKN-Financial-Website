import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import ReactGA from "react-ga";
import Axios from "axios";
import Login from "./Forms/Login";
import Error from "./Error/Error";
import { initGA, logPageView } from "./Utilities/analytics";
// import ProtectedRoute from "./Helpers/ProtectedRoute";
import "./App.css";


ReactGA.initialize("G-JKVQRG8KYM");

const style = { width: "100vw", height: "100vh" };
function App() {
    if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
    }
    logPageView();
    Axios.defaults.withCredentials = true;
    return (
        <Router>
            <div className="app">
                <Scrollbars
                    style={style} // This will activate auto hide
                    autoHide
                    // Hide delay in ms
                    autoHideTimeout={2000}
                    // Duration for hide animation in ms.
                    autoHideDuration={200}
                >
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        {/* <ProtectedRoute path="/forms-page" exact component={FormsPage} /> */}
                        <Route path="*" component={Error} />
                    </Switch>
                </Scrollbars>
            </div>
        </Router>
    );
}

export default App;
