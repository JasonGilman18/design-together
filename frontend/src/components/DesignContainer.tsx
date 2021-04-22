import { useEffect } from "react";
import DesignPage from "../pages/design_page";

export default function DesignContainer(props: any) {

    useEffect(() => {
        console.log(props.location);
    }, []);

    return (
        <DesignPage 
            setAuthenticatedStatus={props.setAuthenticatedStatus}
            authToken={props.authToken}
        />
    )
}