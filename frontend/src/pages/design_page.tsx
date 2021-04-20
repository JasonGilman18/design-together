import React, { useEffect, useState } from 'react';
import { DraggableEvent } from 'react-draggable';
import {Position, ResizableDelta, Rnd} from 'react-rnd';
import Shape from "../classes/shape";

export default function DesignPage(props: any) {

    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [shapes, setShapes] = useState<Array<Shape>>([]);

    useEffect(() => {
        if(props.authToken !== "") {
            setLoading(false);
            console.log(props.authToken);
        }
        else {
            setLoading(true);
        }
    }, [props.authToken]);

    function addRectangle() {
        const newShape = new Shape(1, 0, 0, 50, 100);
        setShapes([...shapes, newShape]);
    }

    if(loading) {
        return (
            <>
                <h1>Design Page Loading</h1>
            </>
        );
    }
    else {
        return (
            <>
                <h1>Design Page</h1>
                <h3>{props.openDesignName}</h3>
                <h3>{name}</h3>
                <button onClick={(e) => props.logout()}>logout</button>
                <button onClick={(e) => addRectangle()}>Add Rectangle</button>
    
                <div style={{height: "500px", width: "500px"}}>
                    {
                        shapes.map((shape) => (
                            <Rnd
                                dragGrid={[10,10]}
                                resizeGrid={[10,10]}
                                bounds="parent"
                                size={{height: shape.height, width: shape.width}}
                                //position={{x: shape.positionX, y: shape.positionY}}
                            >
                                <div style={{height: "100%", width: "100%", backgroundColor: "black"}}/>
                            </Rnd>
                        ))
                    }
                </div>
            </>
        );
    }
}