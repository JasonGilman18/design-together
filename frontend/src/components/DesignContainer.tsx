import { Socket } from "phoenix";
import { useEffect, useRef, useState } from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../pages/DesignPage";
import { logout } from "../services/http_api_service";

export default function DesignContainer(props: DesignContainerProps) {

    const [loading, setLoading] = useState<boolean>(true);
    const socket = useRef<Socket>(new Socket(""));
    const [shapes, setShapes] = useState<Array<Shape>>([]);

    useEffect(() => {
        if(props.authToken !== "") {
            setLoading(false);
            //call  connect to socket, sending the token
            //connectToWebsocketAndChannels(props.authToken, socket)
        }
        else {
            setLoading(true);
        }
    }, [props.authToken]);

    function addRectangle() {
        const newShape = new Shape(1, 0, 0, 50, 100);
        setShapes([...shapes, newShape]);
    }

    return (
        <DesignPage
            loading={loading}
            shapes={shapes}
            addRectangle={addRectangle}
            logout={logout}
            setAuthenticatedStatus={props.setAuthenticatedStatus}
            authToken={props.authToken}
        />
    )
}

interface DesignContainerProps {
    location: any,
    authToken: string,
    setAuthenticatedStatus: (authenticated: boolean) => void
}