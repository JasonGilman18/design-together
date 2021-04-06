import React from 'react';
import {GoogleLogin} from 'react-google-login';

export default function LoginPage(props: any) {

    async function sendGoogleOAUTHRequest(response: any) {
        const google_token_id = response.tokenId;
        const backend_response = await fetch("http://localhost:3000/api/login", {method: "POST", body: JSON.stringify({token_id: google_token_id}), headers: {"Content-Type": "application/json"}});
        const response_object = await backend_response.json();
        
        props.setAuthenticatedStatus(response_object.authenticated);
    }

    return (
        <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={sendGoogleOAUTHRequest}
            onFailure={sendGoogleOAUTHRequest}
        />
    );
}