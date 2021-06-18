import React from 'react';
import Component from '../classes/Component';
import {Channel} from 'phoenix';
import styled from 'styled-components';
import {ComponentToolbarContainer} from '../container_components/ComponentToolbarContainer';
import {mouseDownOnCanvas} from '../services/design_service';
import {MenuToolbarContainer} from '../container_components/MenuToolbarContainer';
import ComponentTree from '../classes/ComponentTree';

export const DesignPage = (props: DesignPageProps) => (

    props.loading
        ?
            <>
                <LoadingMessage>Design Page Loading</LoadingMessage>
            </>
        :
            <DesignPageContainer componentToolbarWidth={props.componentToolbarWidth} menuToolbarHeight={props.menuToolbarHeight}>
                <MenuToolbarContainer
                    componentTree={props.componentTree}
                    selectedComponentId={props.selectedComponentId}
                    componentToolbarWidth={props.componentToolbarWidth}
                    menuToolbarHeight={props.menuToolbarHeight}
                    docName={props.docName}
                    canvasHeight={props.canvasHeight}
                    canvasWidth={props.canvasWidth}
                    showGridlines={props.showGridlines}
                    channel={props.channel}
                    setAuthenticated={props.setAuthenticated}
                    setCanvasWidth={props.setCanvasWidth}
                    setCanvasHeight={props.setCanvasHeight}
                    setComponentTree={props.setComponentTree}
                    setShowGridlines={props.setShowGridlines}
                    newComponent={props.newComponent}
                />
                <ComponentToolbarContainer 
                    newComponent={props.newComponent}
                />
                <CanvasContainer>
                    <canvas 
                        ref={props.canvas}
                        style={{backgroundColor: "#ffffff", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                        onMouseDown={(e) => {
                            mouseDownOnCanvas(e, props.canvas, props.setComponentTree, props.componentTree, props.setMouseDown, props.setSelectedComponentId);
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

const DesignPageContainer = styled.div<{componentToolbarWidth: number, menuToolbarHeight: number}>`
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-columns: ${props => props.componentToolbarWidth + "px"} auto;
    grid-template-rows: ${props => props.menuToolbarHeight + "px"} auto;
    background-color: whitesmoke;
`;

const CanvasContainer = styled.div`
    grid-column: 2/3;
    grid-row: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
`;

interface DesignPageProps {
    channel: Channel | undefined,
    loading: boolean,
    componentTree: ComponentTree,
    mouseMoveX: number,
    mouseMoveY: number,
    docId: number,
    docName: string,
    mouseDown: string,
    selectedComponentId: number,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    showGridlines: boolean,
    canvasHeight: number,
    canvasWidth: number,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setMouseMoveX: React.Dispatch<React.SetStateAction<number>>,
    setMouseMoveY: React.Dispatch<React.SetStateAction<number>>,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    setSelectedComponentId: React.Dispatch<React.SetStateAction<number>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>,
    newComponent: (type: string) => void,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
}