import {Socket, Channel} from "phoenix";
import {useEffect, useRef, useState} from "react";
import Shape from "../classes/shape";
import {DesignPage} from "../presentation_components/DesignPage";
import {displayShapesOnCanvas,
    drawGridlinesOnCanvas} from '../services/design_service';
import {reqAuthToken} from "../services/http_api_service";
import {connectToDocumentChannel,
    disconnectFromDocumentChannel,
    newShapeFromChannel, 
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
    const shapeToolbarWidth = 200;
    const filebarHeight = 50;
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth - shapeToolbarWidth);
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight - filebarHeight);

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
            canvas.current?.getContext('2d')?.clearRect(0,0, canvas.current.width, canvas.current.height);
            canvas.current.width = canvasWidth;
            canvas.current.height = canvasHeight;
            drawGridlinesOnCanvas(canvas, canvasWidth, canvasHeight);
            shapes.forEach((shape) => {
                displayShapesOnCanvas(canvas, shape);
            });
        }
    }, [loading, shapes, canvasHeight, canvasWidth]);

    useEffect(() => {
        if(channel !== undefined) {
            newShapeFromChannel(channel, setShapes);
            updateShapeFromChannel(channel, setShapes);
        }
    }, [channel]);

    return (
        <DesignPage
            loading={loading}
            shapes={shapes}
            mouseMoveX={mouseMoveX}
            mouseMoveY={mouseMoveY}
            channel={channel}
            canvas={canvas}
            mouseDown={mouseDown}
            shapeToolbarWidth={shapeToolbarWidth}
            filebarHeight={filebarHeight}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            docId={props.location.state.doc_id}
            setShapes={setShapes}
            setAuthenticated={props.setAuthenticated}
            setMouseMoveX={setMouseMoveX}
            setMouseMoveY={setMouseMoveY}
            setMouseDown={setMouseDown}
            setCanvasWidth={setCanvasWidth}
            setCanvasHeight={setCanvasHeight}
        />
    );
}

interface DesignContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}