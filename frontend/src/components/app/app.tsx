import React, { useEffect, useRef, useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import {Position, ResizableDelta, Rnd} from 'react-rnd';
import { Direction } from '../../classes/direction'
import Shape from '../../classes/shape';
import {ServerService} from '../../classes/serverService';
import Grid from '../grid/grid';
import './app.css';


/*
* when saving rectangles on the server, need to have movements and resizes
* occur on a rectangle object. need to fetch the rectanlge by shapeId
* from the database
*/


function App(props: any)
{
    const [shapes, setShapes] = useState<Map<number, Shape>>(new Map());
    const server = useRef<ServerService>();
    const designContainer = useRef<HTMLDivElement>(document.createElement("div"));
    const [showGrid, setShowGrid] = useState<boolean>(false);


    useEffect(() => {
        const subscriptions = ["/add/rectangle", "/movement", "/resize"];
        server.current = new ServerService("ws://localhost:8080/design-together", subscriptions, setShapes);
    }, []);

    
    return (

        <div className="grid-container">
            
            <div className="toolbar-container">
                <h2>Control Bar</h2>
            </div>

            <div className="edit-container">
                <h2>Tool Bar</h2>
                <button onClick={() => server.current?.send('/app/add/rectangle', {positionX: 0, positionY: 0, height: 50, width: 100})}>
                    Add Rectangle
                </button>
                <button onClick={() => setShowGrid(prevShowGrid => !prevShowGrid)}>Toggle Grid</button>
            </div>

            <div ref={designContainer} className="design-container">
                <Grid showGrid={showGrid} designContainer={designContainer}>
                    {
                        [...shapes.values()].map((shape) => (
                            <Rnd
                                onDrag={(e: DraggableEvent, data:DraggableData) => 
                                    server.current?.send('/app/movement', {shapeKey: shape.shapeKey, movementX: data.deltaX, 
                                        movementY: data.deltaY})
                                }
                                position={{x: shape.positionX, y: shape.positionY}}
                                dragGrid={[10, 10]}
                                onResize={(e: MouseEvent | TouchEvent, dir: Direction, elementRef: HTMLElement, delta: ResizableDelta, 
                                    position: Position) => server.current?.send('/app/resize', {shapeKey: shape.shapeKey, 
                                        height: elementRef.offsetHeight, width: elementRef.offsetWidth, positionX: position.x, 
                                        positionY: position.y})
                                }
                                size={{height: shape.height, width: shape.width}}
                                resizeGrid={[10, 10]}
                                bounds="parent"
                            >
                                <div style={{height: "100%", width: "100%", backgroundColor: "black"}}></div>
                            </Rnd>
                        ))
                    }
                </Grid>
            </div>

        </div>
    );
}

export default App;