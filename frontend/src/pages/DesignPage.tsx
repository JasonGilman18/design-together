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
                <button onClick={(e) => props.sendShape(props.channel, props.docId, 50, 100, 0, 0)}>Add Rectangle</button>
                <button onClick={(e) => props.sendShape(props.channel, props.docId, 50, 100, 200, 0)}>Add Rectangle2</button>
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
                    onMouseDown={(e) => props.selectShape(e, props.shapes)}
                >
                    {
                        props.shapes.map((shape) => {
                            props.drawRectangle(props.canvas, shape);
                        })
                    }
                </canvas>
            </>
);

interface DesignPageProps {
    channel: Channel | undefined,
    loading: boolean,
    shapes: Array<Shape>,
    docId: number,
    canvas: React.MutableRefObject<HTMLCanvasElement>,
    drawRectangle: (canvas: React.MutableRefObject<HTMLCanvasElement>, shape: Shape) => void,
    logout: (ok_fn: React.Dispatch<React.SetStateAction<boolean>>) => void,
    sendShape: (channel: Channel | undefined, documentId: number, height: number, width: number, xPosition: number, yPosition: number) => void,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    selectShape: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, shapes: Shape[]) => void
}