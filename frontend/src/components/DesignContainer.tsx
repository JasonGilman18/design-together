import { Channel, Socket } from "phoenix";
import { useEffect, useRef, useState } from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../pages/DesignPage";
import { logout } from "../services/http_api_service";
import { connectToDocument, subscribeToRectanlge, sendRectangle } from "../services/ws_api_service";

export default function DesignContainer(props: DesignContainerProps) {

    const [channel, setChannel] = useState<Channel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [shapes, setShapes] = useState<Array<Shape>>([]);

    useEffect(() => {
        if(props.authToken !== "") {
            setLoading(false);
            connectToDocument(props.authToken, props.location.state.doc_id, setChannel);
        }
        else {
            setLoading(true);
        }
    }, [props.authToken]);

    useEffect(() => {
        if(channel !== undefined) {
            subscribeToRectanlge(channel, setShapes);
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
            authToken={props.authToken}
        />
    )
}

interface DesignContainerProps {
    location: any,
    authToken: string,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}