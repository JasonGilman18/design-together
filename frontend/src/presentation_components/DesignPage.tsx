import React from 'react';
import Shape from '../classes/shape';
import {Channel} from 'phoenix';
import styled from 'styled-components';
import {ComponentToolbarContainer} from '../container_components/ComponentToolbarContainer';
import {mouseDownOnCanvas} from '../services/design_service';
import {MenuToolbar} from './MenuToolbar';
import {updateShapeToChannel} from "../services/ws_api_service";

export const DesignPage = (props: DesignPageProps) => (

    props.loading
        ?
            <>
                <LoadingMessage>Design Page Loading</LoadingMessage>
            </>
        :
            <DesignPageContainer>
                <MenuToolbar
                    shapes={props.shapes}
                    selectedShapeIndex={props.selectedShapeIndex}
                    componentToolbarWidth={props.componentToolbarWidth}
                    menuToolbarHeight={props.menuToolbarHeight}
                    canvasHeight={props.canvasHeight}
                    canvasWidth={props.canvasWidth}
                    setShapes={props.setShapes}
                    setAuthenticated={props.setAuthenticated}
                    setCanvasWidth={props.setCanvasWidth}
                    setCanvasHeight={props.setCanvasHeight}
                />
                <ComponentToolbarContainer 
                    channel={props.channel} 
                    docId={props.docId}
                />
                <CanvasContainer>
                    <canvas 
                        ref={props.canvas}
                        style={{backgroundColor: "#ffffff", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                        onMouseDown={(e) => {
                            mouseDownOnCanvas(e, props.canvas, props.setShapes, props.setMouseDown, props.setSelectedShapeIndex);
                        }}
                        onMouseUp={(e) => {
                            props.setMouseDown("");
                        }}
                    />
                </CanvasContainer>
            </DesignPageContainer>
);

const LoadingMessage = styled.h1`
    color: red;
`;

const DesignPageContainer = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-columns: 200px auto;
    grid-template-rows: 50px auto;
    background-color: #f8f9fa;
`;

const CanvasContainer = styled.div`
    grid-column: 2/3;
    grid-row: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface DesignPageProps {
    channel: Channel | undefined,
    loading: boolean,
    shapes: Array<Shape>,
    mouseMoveX: number,
    mouseMoveY: number,
    docId: number,
    mouseDown: string,
    selectedShapeIndex: number,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    canvasHeight: number,
    canvasWidth: number,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    setMouseMoveX: React.Dispatch<React.SetStateAction<number>>,
    setMouseMoveY: React.Dispatch<React.SetStateAction<number>>,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    setSelectedShapeIndex: React.Dispatch<React.SetStateAction<number>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>
}