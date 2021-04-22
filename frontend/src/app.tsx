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

//components ================================================
import DashboardContainer from './components/DashboardContainer';
import DesignContainer from './components/DesignContainer';


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
                    <Route exact path="/" children={() => (
                        this.state.authenticated
                            ? <Redirect to="/dashboard"/>
                            : <LoginPage
                                setAuthenticatedStatus={this.setAuthenticatedStatus}
                            />
                    )}/>
                    <Route path="/dashboard" children={({location}) => (
                        !this.state.authenticated
                            ? <Redirect to="/"/>
                            : <DashboardContainer
                                setAuthenticatedStatus={this.setAuthenticatedStatus}
                                setAuthToken={this.setAuthToken}
                            />
                    )}/>
                    <Route path="/design" children={({location}) => (
                        !this.state.authenticated
                            ? <Redirect to="/"/>
                            : <DesignContainer 
                                location={location}
                                setAuthenticatedStatus={this.setAuthenticatedStatus}
                                authToken={this.state.authToken}
                            />
                    )}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}