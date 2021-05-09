import React from 'react';
import {Link} from 'react-router-dom';
import Shape from '../classes/shape';
import {Channel} from 'phoenix';

export const DesignPage = (props: DesignPageProps) => (

    props.loading
        ?
            <>
                <h1>Design Page Loading</h1>
            </>
        :
            <>
                <h1>Design Page</h1>
                <button onClick={(e) => props.logout(props.setAuthenticated)}>logout</button>
                <button onClick={(e) => props.newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0)}>
                    Add Rectangle
                </button>
                <Link 
                    to={{
                        pathname: "/dashboard"
                    }}
                >
                    Dashboard
                </Link>
                
                <canvas 
                    ref={props.canvas}
                    style={{backgroundColor: "green"}}
                    onMouseDown={(e) => {
                        props.mouseDownOnCanvas(e, props.canvas, props.setShapes, props.setMouseDown);
                    }}
                    onMouseMove={(e) => {
                        props.mouseMoveOnCanvas(e, props.mouseDown, props.setShapes, 
                            props.updateShapeToChannel, props.channel
                        );
                    }}
                    onMouseUp={(e) => {
                        props.setMouseDown("");
                    }}
                >
                </canvas>
            </>
);

interface DesignPageProps {
    channel: Channel | undefined,
    loading: boolean,
    shapes: Array<Shape>,
    docId: number,
    mouseDown: string,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    
    logout: (ok_fn: React.Dispatch<React.SetStateAction<boolean>>) => void,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,

    mouseMoveOnCanvas: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
        mouseDown: string,
        setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, 
        updateShape: (channel: Channel | undefined, shape: Shape) => void, 
        channel: Channel | undefined
    ) => void,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    mouseDownOnCanvas: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
        canvas: React.MutableRefObject<HTMLCanvasElement | null>,
        setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
        setMouseDown: React.Dispatch<React.SetStateAction<string>>
    ) => void,
    
    updateShapeToChannel: (channel: Channel | undefined, shape: Shape) => void,
    newShapeToChannel: (channel: Channel | undefined, documentId: number, height: number, 
        width: number, xPosition: number, yPosition: number
    ) => void
}