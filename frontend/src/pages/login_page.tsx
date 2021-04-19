import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {login} from './../services/http_api_service';

export default function LoginPage(props: any) {

    /*
    function sendGoogleOAUTHRequest(response: any) {
        const google_token_id = response.tokenId;
        //const backend_response = await fetch("http://localhost:3000/api/login", {method: "POST", body: JSON.stringify({token_id: google_token_id}), headers: {"Content-Type": "application/json"}});
        //const response_object = await backend_response.json();
        props.setAuthenticatedStatus(await getLogin(response.tokenId));
    }
    */

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={(res: any) => login(res.tokenId, props.setAuthenticatedStatus)}
        />
    );
}