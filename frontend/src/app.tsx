//packages ===================================================
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

//services ==================================================
import {getAuthenticated} from './services/http_api_service';

//pages =====================================================
import LoginPage from './pages/login_page';
import DashboardPage from './pages/dashboard_page';
import DesignPage from './pages/design_page';


type AppProps = {};
type AppStates = {authenticated: boolean, authToken: string};
export default class App extends React.Component<AppProps, AppStates> {

    constructor(props: any) {
        super(props);

        this.state = {authenticated: false, authToken: ""};

        this.setAuthenticatedStatus = this.setAuthenticatedStatus.bind(this);
        this.setAuthToken = this.setAuthToken.bind(this);
    }

    componentDidMount() {
        getAuthenticated(this.setAuthenticatedStatus);
    }

    setAuthenticatedStatus(authenticated: boolean) {
        this.setState({authenticated: authenticated});
    }

    setAuthToken(authToken: string) {
        this.setState({authToken: authToken});
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {
                            this.state.authenticated
                                ? <Redirect to="/dashboard"/>
                                : <LoginPage
                                    setAuthenticatedStatus={this.setAuthenticatedStatus}
                                  />
                        }
                    </Route>
                    <Route path="/dashboard">
                        {
                            !this.state.authenticated
                                ? <Redirect to="/"/>
                                : <DashboardPage
                                    setAuthenticatedStatus={this.setAuthenticatedStatus}
                                    setAuthToken={this.setAuthToken}
                                  />
                        }
                    </Route>
                    <Route path="/design">
                        {
                            !this.state.authenticated
                                ? <Redirect to="/"/>
                                : <DesignPage
                                    setAuthenticatedStatus={this.setAuthenticatedStatus}
                                    authToken={this.state.authToken}
                                  />
                        }
                    </Route>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}