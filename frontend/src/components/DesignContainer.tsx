import {Socket, Channel} from "phoenix";
import {useEffect, useRef, useState} from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../pages/DesignPage";
import {displayShapesOnCanvas,
    mouseDownOnCanvas, 
    moveShape, 
    selectShape} from '../services/design_service';
import { logout, reqAuthToken } from "../services/http_api_service";
import {connectToDocumentChannel,
    disconnectFromDocumentChannel,
    newShapeToChannel, 
    newShapeFromChannel, 
    updateShapeToChannel, 
    updateShapeFromChannel} from "../services/ws_api_service";

export default function DesignContainer(props: DesignContainerProps) {

    const [authToken, setAuthToken] = useState<string>("");
    const [channel, setChannel] = useState<Channel>();
    const [socket, setSocket] = useState<Socket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [shapes, setShapes] = useState<Array<Shape>>([]);
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        reqAuthToken(props.location.state.doc_id, setAuthToken);
        return function cleanupAuthToken() {
            setAuthToken("");
        };
    }, []);

    useEffect(() => {
        if(authToken !== "" && channel === undefined) {
            setLoading(false);
            connectToDocumentChannel(authToken, props.location.state.doc_id, setChannel, setSocket);
        }
        else {
            setLoading(true);
        }
        return function cleanupDocumentConnection() {
            disconnectFromDocumentChannel(channel, socket);
        };
    }, [authToken]);

    useEffect(() => {
        if(canvas.current !== null && canvas.current !== undefined) {
            canvas.current.width = 500;
            canvas.current.height = 500;
        }
    }, [loading]);

    useEffect(() => {
        if(channel !== undefined) {
            newShapeFromChannel(channel, setShapes);
            updateShapeFromChannel(channel, setShapes);
        }
    }, [channel]);

    useEffect(() => {
        canvas.current?.getContext('2d')?.clearRect(0,0, canvas.current.width, canvas.current.height);
        shapes.forEach((shape) => {
            displayShapesOnCanvas(canvas, shape);
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
            logout={logout}
            setAuthenticated={props.setAuthenticated}

            selectShape={selectShape}
            moveShape={moveShape}
            setMouseDown={setMouseDown}
            mouseDownOnCanvas={mouseDownOnCanvas}

            updateShapeToChannel={updateShapeToChannel}
            newShapeToChannel={newShapeToChannel}
        />
    );
}

interface DesignContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}