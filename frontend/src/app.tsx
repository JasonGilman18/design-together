import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    //Link,
    Redirect
} from 'react-router-dom';

import PrivateRoute from './components/private_route';

import LoginPage from './pages/login_page';
import DashboardPage from './pages/dashboard_page';

type AppProps = {};
type AppStates = {authenticated: boolean};
export default class App extends React.Component<AppProps, AppStates> {

    constructor(props: any) {
        super(props);

        this.state = {authenticated: false};

        this.setAuthenticatedStatus = this.setAuthenticatedStatus.bind(this);
    }

    async componentDidMount() {
        const authorized_response = await fetch("http://localhost:3000/api/authenticated").then(res => res.json());
        this.setAuthenticatedStatus(authorized_response.authenticated);
    }

    setAuthenticatedStatus(authenticated: boolean) {
        this.setState({authenticated: authenticated});
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {
                            this.state.authenticated 
                                ? <Redirect to="/dashboard"/> 
                                : <LoginPage setAuthenticatedStatus={this.setAuthenticatedStatus}/>
                        }
                    </Route>
                    <PrivateRoute path="/dashboard" authorized={this.state.authenticated}>
                        <DashboardPage setAuthenticatedStatus={this.setAuthenticatedStatus}/>
                    </PrivateRoute>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}