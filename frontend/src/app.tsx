//packages ==================================================
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
//services ==================================================
import {getAuthenticated} from './services/http_api_service';
//components ================================================
import LoginContainer from './container_components/LoginContainer';
import DashboardContainer from './container_components/DashboardContainer';
import DesignContainer from './container_components/DesignContainer';

export default function App() {

    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        getAuthenticated(setAuthenticated);
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/" children={() => (
                    authenticated
                        ? <Redirect to="/dashboard"/>
                        : <LoginContainer
                            setAuthenticated={setAuthenticated}
                        />
                )}/>
                <Route path="/dashboard" children={({location}) => (
                    !authenticated
                        ? <Redirect to="/"/>
                        : <DashboardContainer
                            setAuthenticated={setAuthenticated}
                        />
                )}/>
                <Route path="/design" children={({location}) => (
                    !authenticated
                        ? <Redirect to="/"/>
                        : <DesignContainer 
                            location={location}
                            setAuthenticated={setAuthenticated}
                        />
                )}/>
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    );
}