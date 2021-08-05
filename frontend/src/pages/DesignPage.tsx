import React from 'react';
import {Channel} from 'phoenix';
import styled from 'styled-components';
import {ComponentToolbar} from '../components/component_toolbar/ComponentToolbar';
import {mouseDownOnCanvas} from '../services/design_service';
import {MenuToolbar} from '../components/menu_toolbar/MenuToolbar';
import ComponentTree from '../classes/ComponentTree';

export const DesignPage = (props: DesignPageProps) => (

    props.loading
        ?
            <>
                <LoadingMessage>Design Page Loading</LoadingMessage>
            </>
        :
            <DesignPageContainer componentToolbarWidth={props.componentToolbarWidth} menuToolbarHeight={props.menuToolbarHeight}>
                <MenuToolbar
                    componentTree={props.componentTree}
                    selectedComponentId={props.selectedComponentId}
                    componentToolbarWidth={props.componentToolbarWidth}
                    menuToolbarHeight={props.menuToolbarHeight}
                    docName={props.docName}
                    canvasHeight={props.canvasHeight}
                    canvasWidth={props.canvasWidth}
                    showGridlines={props.showGridlines}
                    setAuthenticated={props.setAuthenticated}
                    setCanvasWidth={props.setCanvasWidth}
                    setCanvasHeight={props.setCanvasHeight}
                    setShowGridlines={props.setShowGridlines}
                    setComponentTree={props.setComponentTree}
                    newComponent={props.newComponent}
                />
                <ComponentToolbar 
                    componentTree={props.componentTree}
                    selectedComponentId={props.selectedComponentId}
                    menuToolbarHeight={props.menuToolbarHeight}
                    setComponentTree={props.setComponentTree}
                />
                <CanvasContainer>
                    <CanvasElement
                        ref={props.canvas}
                        tabIndex={0}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            mouseDownOnCanvas(e, props.canvas, props.setComponentTree, 
                                props.componentTree, props.setMouseDown, 
                                props.setSelectedComponentId, props.setShowRightClickMenu,
                                props.setMouseDownPos
                            );
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            mouseDownOnCanvas(e, props.canvas, props.setComponentTree, 
                                props.componentTree, props.setMouseDown, 
                                props.setSelectedComponentId, props.setShowRightClickMenu,
                                props.setMouseDownPos
                            );
                        }}
                        onKeyDown={(e) => props.keyDownOnCanvas(e)}
                    />
                    {
                        props.showRightClickMenu
                        ? <RightClickMenu 
                            x={props.mouseDownPos.x} 
                            y={props.mouseDownPos.y}

                          >

                          </RightClickMenu>
                        : null
                    }
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
    overflow: hidden;
`;

const CanvasContainer = styled.div`
    grid-column: 2/3;
    grid-row: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
`;

const CanvasElement = styled.canvas`
    background-color: #ffffff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    &:focus {
        outline: none;
    }
`;

const RightClickMenu = styled.div<{x: number, y: number}>`
    position: absolute;
    top: ${props => props.x}px;
    left: ${props => props.y}px;
    z-index: 99;
    width: 20px;
    height: 20px;
    background-color: black;
    display: grid;
    grid-template-columns: 20px;
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
    showGridItems: boolean,
    canvasHeight: number,
    canvasWidth: number,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    showRightClickMenu: boolean,
    mouseDownPos: {x: number, y: number},
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setMouseMoveX: React.Dispatch<React.SetStateAction<number>>,
    setMouseMoveY: React.Dispatch<React.SetStateAction<number>>,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    setSelectedComponentId: React.Dispatch<React.SetStateAction<number>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>,
    newComponent: (type: string) => void,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>,
    keyDownOnCanvas: (e: React.KeyboardEvent<HTMLCanvasElement>) => void,
    setShowGridItems: React.Dispatch<React.SetStateAction<boolean>>,
    setShowRightClickMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setMouseDownPos: React.Dispatch<React.SetStateAction<{x: number, y: number}>>
}