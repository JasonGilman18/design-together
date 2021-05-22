import {Socket, Channel} from "phoenix";
import {useEffect, useRef, useState} from "react";
import Component from "../classes/Component";
import {DesignPage} from "../presentation_components/DesignPage";
import {displayComponentsOnCanvas,
    drawGridlinesOnCanvas} from '../services/design_service';
import {reqAuthToken} from "../services/http_api_service";
import {connectToDocumentChannel,
    disconnectFromDocumentChannel,
    newComponentFromChannel, 
    updateComponentFromChannel} from "../services/ws_api_service";

export default function DesignPageContainer(props: DesignPageContainerProps) {

    const [authToken, setAuthToken] = useState<string>("");
    const [channel, setChannel] = useState<Channel>();
    const [socket, setSocket] = useState<Socket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [components, setComponents] = useState<Array<Component>>([]);
    const [selectedComponentIndex, setSelectedComponentIndex] = useState<number>(-1);
    const [mouseDown, setMouseDown] = useState<string>("");
    const [mouseMoveX, setMouseMoveX] = useState<number>(0);
    const [mouseMoveY, setMouseMoveY] = useState<number>(0);
    const canvas = useRef<HTMLCanvasElement>(null);
    const componentToolbarWidth = 200;
    const menuToolbarHeight = 50;
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth - componentToolbarWidth-100);
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight - menuToolbarHeight-100);

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
            components.forEach((component) => {
                displayComponentsOnCanvas(canvas, component);
            });
        }
    }, [loading, components, canvasHeight, canvasWidth]);

    useEffect(() => {
        if(channel !== undefined) {
            newComponentFromChannel(channel, setComponents);
            updateComponentFromChannel(channel, setComponents);
        }
    }, [channel]);

    return (
        <DesignPage
            loading={loading}
            components={components}
            mouseMoveX={mouseMoveX}
            mouseMoveY={mouseMoveY}
            channel={channel}
            canvas={canvas}
            mouseDown={mouseDown}
            selectedComponentIndex={selectedComponentIndex}
            componentToolbarWidth={componentToolbarWidth}
            menuToolbarHeight={menuToolbarHeight}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            docId={props.location.state.doc_id}
            setSelectedComponentIndex={setSelectedComponentIndex}
            setComponents={setComponents}
            setAuthenticated={props.setAuthenticated}
            setMouseMoveX={setMouseMoveX}
            setMouseMoveY={setMouseMoveY}
            setMouseDown={setMouseDown}
            setCanvasWidth={setCanvasWidth}
            setCanvasHeight={setCanvasHeight}
        />
    );
}

interface DesignPageContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}