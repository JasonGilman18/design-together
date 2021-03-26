import {Client, Message} from '@stomp/stompjs';
import Shape from './shape';


export class ServerService
{
    private clientObject: Client;
    private setShapes: React.Dispatch<React.SetStateAction<Map<number, Shape>>>;

    constructor(url: string, subscriptions: Array<string>, setShapes: React.Dispatch<React.SetStateAction<Map<number, Shape>>>)
    {
        this.clientObject = new Client({
            brokerURL: url,
            onConnect: () => {
                subscriptions.forEach((subscription) => {
                    this.clientObject.subscribe(subscription, (message) => this.recieveFromServer(message, subscription));
                });
            }
        });
        this.clientObject.activate();

        this.setShapes = setShapes;
    }

    send(endpoint: string, body: any): void
    {
        console.log(body);

        if(this.clientObject.connected)
            this.clientObject.publish({destination: endpoint, body: JSON.stringify(body)});
    }

    private recieveFromServer(message: Message, endpoint: string)
    {
        switch(endpoint)
        {
            case("/add/rectangle"):
                this.recieveRectangle(message);
                break;
            case("/movement"):
                this.recieveMovement(message);
                break;
            case("/resize"):
                this.recieveResize(message);
                break;
        }
    }

    private recieveRectangle(message: Message)
    {
        const newRectangleObject = JSON.parse(message.body);
        var shapeKey = newRectangleObject.shapeKey;
        var positionX = newRectangleObject.positionX;
        var positionY = newRectangleObject.positionY;
        var height = newRectangleObject.height;
        var width = newRectangleObject.width;
    
        const rectangle = new Shape(shapeKey, positionX, positionY, height, width);
        this.setShapes(prevShapes => new Map(prevShapes.set(shapeKey, rectangle)));
    }

    private recieveMovement(message: Message)
    {
        const newMovementObject = JSON.parse(message.body);
        var shapeKey = newMovementObject.shapeKey;
        var movementX = newMovementObject.movementX;
        var movementY = newMovementObject.movementY;
    
        this.setShapes(prevShapes => {
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

    private recieveResize(message: Message)
    {
        const newResizeObject = JSON.parse(message.body);
        var shapeKey = newResizeObject.shapeKey;
        var height = newResizeObject.height;
        var width = newResizeObject.width;
        var positionX = newResizeObject.positionX;
        var positionY = newResizeObject.positionY;
    
        this.setShapes(prevShapes => {
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
}