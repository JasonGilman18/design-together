import React from "react";
import {LoginPage} from "./LoginPage";

export default function LoginPageContainer(props: LoginPageContainerProps) {

    return (
        <LoginPage
            setAuthenticated={props.setAuthenticated}
        />
    );
}

interface LoginPageContainerProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}