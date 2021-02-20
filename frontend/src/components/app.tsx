import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import {Client} from '@stomp/stompjs';
import Shape from '../classes/shape';
import './app.css';


function App(props: any)
{
    /*
    * shapeElements - elements to be rendered to DOM
    * shapeData - the object that controls position of the elements in DOM
    * stompClient - the reference to the WebSocket connection
    */
    const [shapes, setShapes] = useState<Map<number, Shape>>(new Map());
    const stompClient = useRef(new Client());


    /*
    * setup connection to server through websocket
    * subscribe to events that are sent from server
    */
    useEffect(() => {

        stompClient.current = new Client();
        stompClient.current.configure({
            brokerURL: 'ws://localhost:8080/design-together',
            onConnect: () => {
                console.log("connected");
                stompClient.current.subscribe("/add/rectangle", (message) => recieveRectangleFromServer(message.body));
                stompClient.current.subscribe("/movement/drag", (message) => recieveMovementFromServer(message.body));
            }
        });
        stompClient.current.activate();
    }, []);


    /*
    * after user requests to add a rectangle, send to server to confirm
    */
    function sendRectangleToServer()
    {
        stompClient.current.publish({destination: '/app/add/rectangle', body: JSON.stringify({positionX: 0, positionY: 0})});
    }


    /*
    * after server confirms, actually add the rectangle to the client
    * only the rectangles attributes are tracked in state, the actual DOM is created in render
    */
    function recieveRectangleFromServer(newRectangle: string)
    {
        const newRectangleObject = JSON.parse(newRectangle);
        var shapeKey = newRectangleObject.shapeKey;
        var positionX = newRectangleObject.positionX;
        var positionY = newRectangleObject.positionY;

        const rectangle = new Shape(shapeKey, positionX, positionY);
        setShapes(prevShapes => new Map(prevShapes.set(shapeKey, rectangle)));
    }

    
    /*
    * send the drag to the server
    * based on the number of pixels moved in the x and y directions
    */
    function sendMovementToServer(e: DraggableEvent, data: DraggableData, shapeKey: number)
    {
        stompClient.current.publish({destination: "/app/movement/drag", body: JSON.stringify({shapeKey: shapeKey, movementX: data.deltaX, movementY: data.deltaY})});
    }


    /*
    * display the movement after the server confirms it
    * all clients shapes are only moved after the server confirms
    */
    function recieveMovementFromServer(newMovement: string)
    {
        const newMovementObject = JSON.parse(newMovement);
        var shapeKey = newMovementObject.shapeKey;
        var movementX = newMovementObject.movementX;
        var movementY = newMovementObject.movementY;

        setShapes(prevShapes => {

            var shapeMoved = prevShapes.get(shapeKey);
            if(shapeMoved != undefined)
            {
                shapeMoved.positionX += movementX;
                shapeMoved.positionY += movementY;
                return new Map(prevShapes.set(shapeKey, shapeMoved));
            }
            else
                return prevShapes;
        });
    }


    return (

        <div className="grid-container">
            
            <div className="controlbar-container">
                <h2>Control Bar</h2>
            </div>

            <div className="toolbar-container">
                <h2>Tool Bar</h2>
                <button onClick={() => sendRectangleToServer()}>Rectangle</button>
            </div>

            <div className="design-container" onDragOver={(e) => e.preventDefault()}>
                {
                    [...shapes.values()].map((shape) => (
                        <Draggable 
                            key={shape.shapeKey} 
                            onDrag={(e: DraggableEvent, data: DraggableData) => sendMovementToServer(e, data, shape.shapeKey)} 
                            bounds="parent"
                            position={{x: shape.positionX, y: shape.positionY}}
                        >
                            <div style={{height: "50px", width: "100px", backgroundColor: "black"}}></div>
                        </Draggable>
                    ))
                }
            </div>

        </div>
    );
}

export default App;