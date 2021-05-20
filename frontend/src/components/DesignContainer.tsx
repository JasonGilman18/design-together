import {Socket, Channel} from "phoenix";
import {useEffect, useRef, useState} from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../pages/DesignPage";
import {displayShapesOnCanvas,
    drawGridlinesOnCanvas,
    mouseDownOnCanvas, 
    mouseMoveOnCanvas} from '../services/design_service';
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
    const [mouseDown, setMouseDown] = useState<string>("");
    const [mouseMoveX, setMouseMoveX] = useState<number>(0);
    const [mouseMoveY, setMouseMoveY] = useState<number>(0);
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        window.addEventListener("resize", canvasResize);
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
        canvasResize();
    }, [loading]);

    useEffect(() => {
        if(channel !== undefined) {
            newShapeFromChannel(channel, setShapes);
            updateShapeFromChannel(channel, setShapes);
        }
    }, [channel]);

    useEffect(() => {
        canvasClear();
    }, [shapes]);

    function canvasResize() {
        if(canvas.current !== null && canvas.current !== undefined) {
            canvas.current.width = window.innerWidth;
            canvas.current.height = window.innerHeight;
            drawGridlinesOnCanvas(canvas, window.innerWidth, window.innerHeight);
        }
    }

    function canvasClear() {
        canvas.current?.getContext('2d')?.clearRect(0,0, canvas.current.width, canvas.current.height);
        drawGridlinesOnCanvas(canvas, window.innerWidth, window.innerHeight);
        shapes.forEach((shape) => {
            displayShapesOnCanvas(canvas, shape);
        });
    }

    return (
        <DesignPage
            loading={loading}
            shapes={shapes}
            mouseMoveX={mouseMoveX}
            mouseMoveY={mouseMoveY}
            channel={channel}
            canvas={canvas}
            mouseDown={mouseDown}
            docId={props.location.state.doc_id}

            setShapes={setShapes}
            logout={logout}
            setAuthenticated={props.setAuthenticated}
            setMouseMoveX={setMouseMoveX}
            setMouseMoveY={setMouseMoveY}

            mouseMoveOnCanvas={mouseMoveOnCanvas}
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