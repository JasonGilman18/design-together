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

export const DesignPage = (props: DesignPageProps) => {

    const LoadingMessage = styled.h1`
        color: red;
    `;

    return props.loading
        ?
            <>
                <LoadingMessage>Design Page Loading</LoadingMessage>
            </>
        :
            <>
                <ShapeToolbar channel={props.channel} docId={props.docId}/>
                <canvas 
                    ref={props.canvas}
                    style={{backgroundColor: "green"}}
                    onMouseDown={(e) => {
                        mouseDownOnCanvas(e, props.canvas, props.setShapes, props.setMouseDown);
                    }}
                    onMouseMove={(e) => {
                        mouseMoveOnCanvas(e, props.mouseDown, props.setMouseMoveX, 
                            props.setMouseMoveY, props.setShapes, updateShapeToChannel, 
                            props.channel
                        );
                    }}
                    onMouseUp={(e) => {
                        props.setMouseDown("");
                    }}
                >
                </canvas>
            </>
};

interface DesignPageProps {
    channel: Channel | undefined,
    loading: boolean,
    shapes: Array<Shape>,
    mouseMoveX: number,
    mouseMoveY: number,
    docId: number,
    mouseDown: string,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    setMouseMoveX: React.Dispatch<React.SetStateAction<number>>,
    setMouseMoveY: React.Dispatch<React.SetStateAction<number>>,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>
}