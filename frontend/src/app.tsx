import React, { useEffect, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './app.css';


function App(props: any)
{
    const [shapes, setShapes] = useState<Array<JSX.Element>>([]);
    
    const socket = new SockJS('http://localhost:8080/design-together');
    const stompClient = Stomp.over(socket);
    const headers = {};

    useEffect(() => {

        stompClient.connect(headers, () => {

            stompClient.subscribe('/add/drag', (message) => {recieveMovementFromServer(message.body);}, headers);
            stompClient.subscribe('/add/rectangle', (message) => {recieveRectangleFromServer(message.body);}, headers);
            
        });

    }, []);

    function sendRectangleToServer()
    {
        stompClient.send("/app/add/rectangle", headers, JSON.stringify({positionX: 0, positionY: 0}));
    }

    function recieveRectangleFromServer(newRectangle: string)
    {
        const newRectangleObject = JSON.parse(newRectangle);
        const rectangle = <Draggable onDrag={(e) => sendMovementToServer(e, newRectangleObject.shapeKey)} bounds={"parent"} key={newRectangleObject.shapeKey}><div style={{backgroundColor: "black", height: "50px", width: "100px"}}></div></Draggable>;
        //const rectangle = <Rectangle shapeKey={newRectangleObject.shapeKey} func_sendMovementToServer={sendMovementToServer}></Rectangle>;
        setShapes(shapes => [...shapes, rectangle]);
    }

    function sendMovementToServer(e: DraggableEvent, shapeKey: number)
    {
        const event = e as React.MouseEvent;
        stompClient.send("/app/add/drag", headers, JSON.stringify({shapeKey: shapeKey, movementX: event.movementX, movementY: event.movementY}));
    }

    function recieveMovementFromServer(newMovement: string)
    {

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

            <div className="design-container">
                {shapes}
            </div>

        </div>
    );
}

export default App;