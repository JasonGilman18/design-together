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
type AppStates = {authenticated: boolean, openDesignName: string};
export default class App extends React.Component<AppProps, AppStates> {

    constructor(props: any) {
        super(props);

        this.state = {authenticated: false, openDesignName: ""};

        this.setAuthenticatedStatus = this.setAuthenticatedStatus.bind(this);
        //this.logout = this.logout.bind(this);
        this.setOpenDesignName = this.setOpenDesignName.bind(this);
    }

    componentDidMount() {
        //const authorized_response: Object = await fetch("http://localhost:3000/api/authenticated").then(res => res.json());
        getAuthenticated(this.setAuthenticatedStatus);
    }

    /*
    logout() {
        //const backend_response = await fetch("http://localhost:3000/api/logout", {method: "GET"});
        //getLogout(this.setAuthenticatedStatus);
    }
    */

    setAuthenticatedStatus(authenticated: boolean) {
        this.setState({authenticated: authenticated});
    }

    setOpenDesignName(openDesignName: string) {
        this.setState({openDesignName: openDesignName});
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
                                    setOpenDesignName={this.setOpenDesignName}
                                  />
                        }
                    </Route>
                    <Route path="/design">
                        {
                            !this.state.authenticated
                                ? <Redirect to="/"/>
                                : <DesignPage
                                    setAuthenticatedStatus={this.setAuthenticatedStatus}
                                    openDesignName={this.state.openDesignName}
                                  />
                        }
                    </Route>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}