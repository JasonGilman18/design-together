import {SetStateAction} from 'react';
import {Client, Message} from '@stomp/stompjs';
import Shape from './shape';


export class ServerService
{
    clientObject: Client;

    constructor(url?: string, subscriptions?: Array<string>, setShapes?: React.Dispatch<React.SetStateAction<Map<number, Shape>>>)
    {
        if(url == undefined || subscriptions == undefined || setShapes == undefined)
        {
            this.clientObject = new Client();
        }
        else
        {
            this.clientObject = new Client({
                brokerURL: url,
                onConnect: () => {
                    subscriptions.forEach((subscription) => {
                        this.clientObject.subscribe(subscription, (message) => recieveFromServer(message, subscription, setShapes));
                    });
                }
            });
            this.clientObject.activate();
        }
    }

    send(endpoint: string, body: any): void
    {
        console.log(body);

        if(this.clientObject.connected)
            this.clientObject.publish({destination: endpoint, body: JSON.stringify(body)});
    }  
}

function recieveFromServer(message: Message, endpoint: string, setShapes: React.Dispatch<React.SetStateAction<Map<number, Shape>>>)
{
    switch(endpoint)
    {
        case("/add/rectangle"):
            recieveRectangle(message, setShapes);
            break;
        case("/movement"):
            recieveMovement(message, setShapes);
            break;
        case("/resize"):
            recieveResize(message, setShapes);
            break;
    }
}

function recieveRectangle(message: Message, setShapes: React.Dispatch<React.SetStateAction<Map<number, Shape>>>)
{
    const newRectangleObject = JSON.parse(message.body);
    var shapeKey = newRectangleObject.shapeKey;
    var positionX = newRectangleObject.positionX;
    var positionY = newRectangleObject.positionY;
    var height = newRectangleObject.height;
    var width = newRectangleObject.width;

    const rectangle = new Shape(shapeKey, positionX, positionY, height, width);
    setShapes(prevShapes => new Map(prevShapes.set(shapeKey, rectangle)));
}

function recieveMovement(message: Message, setShapes: React.Dispatch<React.SetStateAction<Map<number, Shape>>>)
{
    const newMovementObject = JSON.parse(message.body);
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

function recieveResize(message: Message, setShapes: React.Dispatch<React.SetStateAction<Map<number, Shape>>>)
{
    const newResizeObject = JSON.parse(message.body);
    var shapeKey = newResizeObject.shapeKey;
    var height = newResizeObject.height;
    var width = newResizeObject.width;
    var positionX = newResizeObject.positionX;
    var positionY = newResizeObject.positionY;

    setShapes(prevShapes => {
        var shapeMoved = prevShapes.get(shapeKey);
        if(shapeMoved != undefined)
        {
            shapeMoved.height = height;
            shapeMoved.width = width;
            shapeMoved.positionX = positionX;
            shapeMoved.positionY = positionY;
            return new Map(prevShapes.set(shapeKey, shapeMoved));
        }
        else
            return prevShapes;
    });
}