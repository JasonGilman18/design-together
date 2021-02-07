import React, { useEffect, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './app.css';


function App(props: any)
{
    const [shapes, setShapes] = useState<Array<JSX.Element>>([]);
    const [shape_key, setShapeKey] = useState<number>(0);
    
    const socket = new SockJS('http://localhost:8080/design-together');
    const stompClient = Stomp.over(socket);
    const headers = {};

    useEffect(() => {

        stompClient.connect(headers, () => {

            stompClient.subscribe('/add/rectangle', (message) => recieveRectangleFromServer(message.body), headers);
        });

    }, []);

    function addRectangleToClient(rectangle: JSX.Element)
    {
        setShapeKey(shape_key+1);
        setShapes([...shapes, rectangle]);
    }

    function sendRectangleToServer()
    {
        //construct new shape
        const new_shape =  <Draggable onDrag={(e) => drag(e)} bounds={"parent"} key={shape_key}><div style={{backgroundColor: "black", height: "50px", width: "100px"}}></div></Draggable>;
        
        //add shape to DOM
        addRectangleToClient(new_shape);

        //send shape to server
        stompClient.send("/app/add/rectangle", headers, JSON.stringify({shapeKey: new_shape.key, positionX: new_shape.props.defaultPosition.x, positionY: new_shape.props.defaultPosition.y}));
    }

    function recieveRectangleFromServer(newRectangle: string)
    {
        const newRectangleObject = JSON.parse(newRectangle);
        const sendToDOM = <Draggable onDrag={(e) => drag(e)} bounds={"parent"} key={shape_key}><div style={{backgroundColor: "black", height: "50px", width: "100px"}}></div></Draggable>;
        addRectangleToClient(sendToDOM);
    }

    function drag(e: DraggableEvent)
    {
        //console.log(e);
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

export default App