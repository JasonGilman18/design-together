import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import {Position, ResizableDelta, Rnd} from 'react-rnd';
import { Direction } from '../classes/direction'
import Shape from '../classes/shape';
import {ServerService} from '../classes/serverService';
import './app.css';


/*
* when saving rectangles on the server, need to have movements and resizes
* occur on a rectangle object. need to fetch the rectanlge by shapeId
* from the database
*/


function App(props: any)
{
    /*
    * shapeElements - elements to be rendered to DOM
    * shapeData - the object that controls position of the elements in DOM
    * stompClient - the reference to the WebSocket connection
    */
    
    const designContainer = useRef<HTMLDivElement>(document.createElement("div"));
    const designGrid = useRef<HTMLDivElement>(document.createElement("div"));
    const [grid, setGrid] = useState<Array<JSX.Element>>([]);
    const [showGrid, setShowGrid] = useState<boolean>(false);


    const [shapes, setShapes] = useState<Map<number, Shape>>(new Map());
    const server = useRef<ServerService>(new ServerService());


    useEffect(() => {
        const subscriptions = ["/add/rectangle", "/movement", "/resize"];
        server.current = new ServerService("ws://localhost:8080/design-together", subscriptions, setShapes);
    }, []);

    
    useEffect(() => {

        const GRID_SIZE = 10;
        const num_cols = Math.floor(designContainer.current.offsetWidth / GRID_SIZE);
        const num_rows = Math.floor(designContainer.current.offsetHeight / GRID_SIZE);

        designContainer.current.style.width = (num_cols * GRID_SIZE) + "px";
        designContainer.current.style.height = (num_rows * GRID_SIZE) + "px";
        designGrid.current.style.gridTemplateColumns = "repeat("+ num_cols +", 10px)";
        designGrid.current.style.gridTemplateRows = "repeat("+ num_rows +", 10px)";

        var tempGrid = [];
        for(let r=0;r<num_rows;r++)
        {
            for(let c=0;c<num_cols;c++)
            {
                var style: React.CSSProperties = {};
                if(c == num_cols-1 && r != num_rows-1)
                    style.borderBottom = "1px solid black";
                else if(r == num_rows-1 && c != num_cols-1)
                    style.borderRight = "1px solid black";
                else if(r != num_rows-1 && c != num_cols-1)
                {
                    style.borderBottom = "1px solid black";
                    style.borderRight = "1px solid black";
                }

                const cell = <div key={r + ":" + c} className="cell" style={style}></div>;
                tempGrid.push(cell);
            }
        }

        setGrid(tempGrid);

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
                <div ref={designGrid} className="design-grid">
                    {showGrid?grid:null}
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
                </div>
            </div>

        </div>
    );
}

export default App;