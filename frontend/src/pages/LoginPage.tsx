import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {login} from './../services/http_api_service';

export const LoginPage = (props: LoginPageProps) => (

    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        buttonText="Login"
        onSuccess={(res: any) => login(res.tokenId, props.setAuthenticated)}
    />
);

interface LoginPageProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}