import { BrowserRouter as Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({...props}) {

    return (
        props.authorized
            ? <Route {...props}/>
            : <Redirect to="/"/>
    );
}