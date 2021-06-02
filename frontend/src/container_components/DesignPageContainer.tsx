import {Socket, Channel} from "phoenix";
import {useEffect, useRef, useState} from "react";
import Component from "../classes/Component";
import ComponentTree from "../classes/ComponentTree";
import {DesignPage} from "../presentation_components/DesignPage";
import {
    displayComponentsOnCanvas,
    drawGridlinesOnCanvas,
    getNextAvailiblePosition
} from '../services/design_service';
import {reqAuthToken} from "../services/http_api_service";
import {
    connectToDocumentChannel,
    disconnectFromDocumentChannel,
    newComponentFromChannel,
    newComponentToChannel,
    updateComponentFromChannel
} from "../services/ws_api_service";

export default function DesignPageContainer(props: DesignPageContainerProps) {

    const [authToken, setAuthToken] = useState<string>("");
    const [channel, setChannel] = useState<Channel>();
    const [socket, setSocket] = useState<Socket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [componentTree, setComponentTree] = useState<ComponentTree>(new ComponentTree());
    const [selectedComponentId, setSelectedComponentId] = useState<number>(-1);
    const [mouseDown, setMouseDown] = useState<string>("");
    const [mouseMoveX, setMouseMoveX] = useState<number>(0);
    const [mouseMoveY, setMouseMoveY] = useState<number>(0);
    const canvas = useRef<HTMLCanvasElement>(null);
    const componentToolbarWidth = 200;
    const menuToolbarHeight = 125;
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
            displayComponentsOnCanvas(canvas, componentTree.root);
        }
    }, [loading, componentTree.components, componentTree.root, canvasHeight, canvasWidth]);

    useEffect(() => {
        if(channel !== undefined) {
            newComponentFromChannel(channel, setComponentTree);
            updateComponentFromChannel(channel, setComponentTree);
        }
    }, [channel]);

    function newComponent(type: string) {
        const docId = props.location.state.doc_id;
        var height: number;
        var width: number;
        var filled: boolean;
        var rounded: number;
        var addComponent = true;
        switch(type) {
            case "square":
                height = 50;
                width = 50;
                filled = false;
                rounded = 0;
                break;
            case "square-filled":
                height = 50;
                width = 50;
                filled = true;
                rounded = 0;
                break;
            case "square-rounded":
                height = 50;
                width = 50;
                filled = false;
                rounded = 15;
                break;
            case "square-filled-rounded":
                height = 50;
                width = 50;
                filled = true;
                rounded = 15;
                break;
            case "rectangle":
                height = 50;
                width = 100;
                filled = false;
                rounded = 0;
                break;
            case "rectangle-filled":
                height = 50;
                width = 100;
                filled = true;
                rounded = 0;
                break;
            case "rectangle-rounded":
                height = 50;
                width = 100;
                filled = false;
                rounded = 15;
                break;
            case "rectangle-filled-rounded":
                height = 50;
                width = 100;
                filled = true;
                rounded = 15;
                break;
            default:
                height = 0;
                width = 0;
                filled = false;
                rounded = 0;
                addComponent = false;
                break;
        }
        if(addComponent) {
            const availPos = getNextAvailiblePosition(componentTree.find(selectedComponentId), null, width, height, canvasWidth, 
                canvasHeight
            );
            newComponentToChannel(channel, docId, selectedComponentId, height, width, availPos.x, availPos.y, filled, rounded);
        }
    }

    return (
        <DesignPage
            loading={loading}
            componentTree={componentTree}
            mouseMoveX={mouseMoveX}
            mouseMoveY={mouseMoveY}
            channel={channel}
            canvas={canvas}
            mouseDown={mouseDown}
            selectedComponentId={selectedComponentId}
            componentToolbarWidth={componentToolbarWidth}
            menuToolbarHeight={menuToolbarHeight}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            docId={props.location.state.doc_id}
            docName={props.location.state.doc_name}
            setSelectedComponentId={setSelectedComponentId}
            setAuthenticated={props.setAuthenticated}
            setMouseMoveX={setMouseMoveX}
            setMouseMoveY={setMouseMoveY}
            setMouseDown={setMouseDown}
            setCanvasWidth={setCanvasWidth}
            setCanvasHeight={setCanvasHeight}
            setComponentTree={setComponentTree}
            newComponent={newComponent}
        />
    );
}

interface DesignPageContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}