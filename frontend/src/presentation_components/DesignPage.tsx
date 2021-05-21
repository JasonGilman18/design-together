import React from 'react';
import {Link} from 'react-router-dom';
import Shape from '../classes/shape';
import {Channel} from 'phoenix';
import styled from 'styled-components';
import {ShapeToolbar} from './ShapeToolbar';
import {mouseDownOnCanvas, 
    mouseMoveOnCanvas} from '../services/design_service';
import {logout} from "../services/http_api_service";
import {updateShapeToChannel} from "../services/ws_api_service";

export const DesignPage = (props: DesignPageProps) => (

    props.loading
        ?
            <>
                <LoadingMessage>Design Page Loading</LoadingMessage>
            </>
       :
            <DesignPageContainer>
                <Filebar>
                    <Link
                        to={{
                            pathname: "/dashboard"
                        }}
                    >
                        Dashboard
                    </Link>
                    <button onClick={(e) => logout(props.setAuthenticated)}>Logout</button>
                    <button onClick={(e) => {
                        props.setCanvasWidth(window.innerWidth-props.shapeToolbarWidth);
                        props.setCanvasHeight(window.innerHeight-props.filebarHeight);
                    }}>
                        Resize to Window
                    </button>
                    <input type="number" value={props.canvasWidth} 
                        onChange={(e) => props.setCanvasWidth(parseInt(e.target.value))}
                    />
                    <input type="number" value={props.canvasHeight} 
                        onChange={(e) => props.setCanvasHeight(parseInt(e.target.value))}
                    />
                    {
                        props.selectedShapeIndex !== -1
                            ? (
                                <input type="number" 
                                    value={props.shapes[props.selectedShapeIndex].width}
                                    onChange={(e) => {
                                        props.setShapes(prevShapes => {
                                            const shapesCopy = [...prevShapes];
                                            shapesCopy[props.selectedShapeIndex].width = parseInt(e.target.value);
                                            return shapesCopy;
                                        });
                                    }}
                                    min={10}
                                />
                            )
                            : null
                    }
                </Filebar>
                <ShapeToolbar channel={props.channel} docId={props.docId}/>
                <CanvasContainer>
                    <canvas 
                        ref={props.canvas}
                        style={{backgroundColor: "#ffffff", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                        onMouseDown={(e) => {
                            mouseDownOnCanvas(e, props.canvas, props.setShapes, props.setMouseDown, props.setSelectedShapeIndex);
                        }}
                        /*onMouseMove={(e) => {
                            mouseMoveOnCanvas(e, props.mouseDown, props.mouseMoveX, props.mouseMoveY, 
                                props.setMouseMoveX, props.setMouseMoveY, props.setShapes, 
                                updateShapeToChannel, props.channel
                            );
                        }}*/
                        onMouseUp={(e) => {
                            props.setMouseDown("");
                        }}
                    ></canvas>
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

const Filebar = styled.div`
    grid-column: 1/3;
    grid-row: 1/2;
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
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
    shapeToolbarWidth: number,
    filebarHeight: number,
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