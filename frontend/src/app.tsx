//packages ==================================================
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
//services ==================================================
import {getAuthenticated} from './services/http_api_service';
//components ================================================
import LoginPageContainer from './pages/LoginPageContainer';
import DashboardPageContainer from './pages/DashboardPageContainer';
import DesignPageContainer from './pages/DesignPageContainer';

export default function App() {

    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const BodyStyle = createGlobalStyle`
        body {
            margin: 0px;
        }
    `;

    useEffect(() => {
        getAuthenticated(setAuthenticated);
    }, []);

    return (
        <>
        <BodyStyle/>
            <Router>
                <Switch>
                    <Route exact path="/" children={() => (
                        authenticated
                            ? <Redirect to="/dashboard"/>
                            : <LoginPageContainer
                                setAuthenticated={setAuthenticated}
                            />
                    )}/>
                    <Route path="/dashboard" children={({location}) => (
                        !authenticated
                            ? <Redirect to="/"/>
                            : <DashboardPageContainer
                                setAuthenticated={setAuthenticated}
                            />
                    )}/>
                    <Route path="/design" children={({location}) => (
                        !authenticated
                            ? <Redirect to="/"/>
                            : <DesignPageContainer 
                                location={location}
                                setAuthenticated={setAuthenticated}
                            />
                    )}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        </>
    );
}