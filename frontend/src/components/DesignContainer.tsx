import { Channel } from "phoenix";
import { useEffect, useRef, useState } from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../pages/DesignPage";
import {deselectShape, drawRectangle, moveShape, selectShape} from '../services/design_service';
import { logout, reqAuthToken } from "../services/http_api_service";
import { connectToDocument, subscribeToShape, sendShape } from "../services/ws_api_service";

export default function DesignContainer(props: DesignContainerProps) {

    const [authToken, setAuthToken] = useState<string>("");
    const [channel, setChannel] = useState<Channel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [shapes, setShapes] = useState<Array<Shape>>([]);
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));

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
            canvas.current.width = 500;
            canvas.current.height = 500;
    }, [loading]);

    useEffect(() => {
        if(channel !== undefined) {
            subscribeToShape(channel, setShapes);
        }
    }, [channel]);

    useEffect(() => {
        canvas.current.getContext('2d')?.clearRect(0,0, canvas.current.width, canvas.current.height);
        shapes.forEach((shape) => {
            drawRectangle(canvas, shape);
        });
    }, [shapes]);

    return (
        <DesignPage
            loading={loading}
            shapes={shapes}
            channel={channel}
            canvas={canvas}
            mouseDown={mouseDown}
            docId={props.location.state.doc_id}
            setShapes={setShapes}
            sendShape={sendShape}
            logout={logout}
            setAuthenticated={props.setAuthenticated}
            selectShape={selectShape}
            moveShape={moveShape}
            setMouseDown={setMouseDown}
            deselectShape={deselectShape}
        />
    );
}

interface DesignContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}