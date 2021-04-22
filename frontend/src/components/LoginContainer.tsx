import React from "react";
import {LoginPage} from "../pages/LoginPage";

export default function LoginContainer(props: LoginContainerProps) {

    return (
        <LoginPage
            setAuthenticated={props.setAuthenticated}
        />
    );
}

interface LoginContainerProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}