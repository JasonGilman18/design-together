import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {login} from './../services/http_api_service';

export default function LoginPage(props: any) {

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={(res: any) => login(res.tokenId, props.setAuthenticatedStatus)}
        />
    );
}