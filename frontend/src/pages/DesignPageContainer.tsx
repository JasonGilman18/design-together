import {Socket, Channel} from "phoenix";
import {useEffect, useRef, useState} from "react";
import ComponentTree from "../classes/ComponentTree";
import {DesignPage} from "./DesignPage";
import {
    displayComponentsOnCanvas,
    drawGridlinesOnCanvas,
    updateComponents
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
    const componentToolbarWidth = 250;
    const menuToolbarHeight = 75;
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth - componentToolbarWidth-100);
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight - menuToolbarHeight-100);
    const [showGridlines, setShowGridlines] = useState<boolean>(false);

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
            var ctx = canvas.current.getContext("2d");
            if(ctx) {
                ctx.clearRect(0,0, canvas.current.width, canvas.current.height);
                canvas.current.width = window.devicePixelRatio * canvasWidth;
                canvas.current.height = window.devicePixelRatio * canvasHeight;
                canvas.current.style.width = canvasWidth + "px";
                canvas.current.style.height = canvasHeight + "px";
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                if(showGridlines) drawGridlinesOnCanvas(ctx, canvasWidth, canvasHeight);
                updateComponents(channel, componentTree.root, canvasWidth, canvasHeight, ctx);
                displayComponentsOnCanvas(ctx, componentTree.root);
            }
        }
    }, [loading, componentTree.components, componentTree.root, canvasHeight, canvasWidth, showGridlines]);

    useEffect(() => {
        if(componentTree.components.length === 1)
            selectDocument();
    }, [componentTree.root]);

    useEffect(() => {
        if(channel !== undefined) {
            newComponentFromChannel(channel, setComponentTree);
            updateComponentFromChannel(channel, setComponentTree);
            newComponentToChannel(channel, props.location.state.doc_id, null, "document");
        }
    }, [channel]);

    function selectDocument() {
        if(componentTree.root) {
            setSelectedComponentId(componentTree.root.id);
            setComponentTree(prevTree => {
                componentTree.root!.style.selected = true;
                setMouseDown(componentTree.root!.type);
                return prevTree.copy();
            });
        }
    }

    function newComponent(type: string) {
        const docId = props.location.state.doc_id;
        newComponentToChannel(channel, docId, selectedComponentId, type);
    }

    function keyDownOnCanvas(e: React.KeyboardEvent<HTMLCanvasElement>) {
        if(mouseDown.substring(0, mouseDown.indexOf("_")) === "text") {
            const selectedComponent = componentTree.find(selectedComponentId);
            if(selectedComponent) {
                if(e.key === "Backspace")
                    selectedComponent.updateText(selectedComponent.style.text.slice(0, -1));
                else if(e.key === "Enter") {

                }
                else if(e.key === "Control") {

                }
                else if(e.key === "Shift") {

                }
                else if(e.key === "Alt") {

                }
                else if(e.key === "Tab") {

                }
                else if(e.key === "Meta") {

                }
                else
                    selectedComponent.updateText(selectedComponent.style.text + e.key);
                setComponentTree(prev => prev.copy());
            }
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
            showGridlines={showGridlines}
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
            setShowGridlines={setShowGridlines}
            keyDownOnCanvas={keyDownOnCanvas}
        />
    );
}

interface DesignPageContainerProps {
    location: any,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}