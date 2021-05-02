import { Channel, Socket } from "phoenix";
import { useEffect, useRef, useState } from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../pages/DesignPage";
import { logout, reqAuthToken } from "../services/http_api_service";
import { connectToDocument, subscribeToShape, sendRectangle } from "../services/ws_api_service";

export default function DesignContainer(props: DesignContainerProps) {

    const [authToken, setAuthToken] = useState<string>("");
    const [channel, setChannel] = useState<Channel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [shapes, setShapes] = useState<Array<Shape>>([]);

    useEffect(() => {
        reqAuthToken(props.location.state.doc_id, setAuthToken);
    }, []);

    useEffect(() => {
        if(authToken !== "" && channel === undefined) {
            setLoading(false);
            connectToDocument(authToken, props.location.state.doc_id, setChannel);
        }
        else {
            setLoading(true);
        }
    }, [authToken]);

    useEffect(() => {
        if(channel !== undefined) {
            subscribeToShape(channel, setShapes);
        }
    }, [channel]);

    return (
        <DesignPage
            loading={loading}
            shapes={shapes}
            channel={channel}
            sendRectangle={sendRectangle}
            logout={logout}
            setAuthenticated={props.setAuthenticated}
        />
    );
}

interface DesignContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}