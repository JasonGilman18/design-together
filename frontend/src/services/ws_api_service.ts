import {Channel, Socket} from 'phoenix';
import React from 'react';
import Shape from '../classes/shape';

export function connectToDocumentChannel(authToken: string, doc_id: number, 
    ok_fn_channel: React.Dispatch<React.SetStateAction<Channel | undefined>>, 
    ok_fn_socket: React.Dispatch<React.SetStateAction<Socket | undefined>>
) {
    var socket = new Socket('ws://localhost:4000/socket', {params: {authToken: authToken}});
    socket.connect();
    var new_channel = socket.channel('document:'+doc_id, {authToken: authToken});
    new_channel.join();
    ok_fn_channel(new_channel);
    ok_fn_socket(socket);
}

export function disconnectFromDocumentChannel(channel: Channel | undefined, socket: Socket | undefined) {
    channel?.leave();
    socket?.disconnect();
}

export function newShapeFromChannel(channel: Channel | undefined, 
    ok_fn: React.Dispatch<React.SetStateAction<Shape[]>>
) {
    channel?.on("new_shape", (responseShape: Shape) => {
        const newShape = new Shape(responseShape.id, responseShape.document_id, responseShape.position_x, 
            responseShape.position_y, responseShape.height, responseShape.width, responseShape.filled, 
            responseShape.rounded);
        ok_fn(prevShapes => [...prevShapes, newShape]);
    });
}

export function newShapeToChannel(channel: Channel | undefined, documentId: number, height: number, width: number, 
    position_x: number, position_y: number, filled: boolean, rounded: number
) {
    channel?.push("new_shape", {document_id: documentId, height: height, width: width, position_x: position_x, 
        position_y: position_y, filled: filled, rounded: rounded}, 10000);
}

export function updateShapeFromChannel(channel: Channel | undefined, 
    ok_fn: React.Dispatch<React.SetStateAction<Shape[]>>
) {
    channel?.on("update_shape", (responseShape: Shape) => {
        ok_fn(prevShapes => {
            const shapesCopyVal = [...prevShapes];
            shapesCopyVal.forEach((shape) => {
                if(shape.id === responseShape.id) {
                    shape.height = responseShape.height;
                    shape.width = responseShape.width;
                    shape.position_x = responseShape.position_x;
                    shape.position_y = responseShape.position_y;
                }
            });
            return shapesCopyVal;
        });
    });
}

export function updateShapeToChannel(channel: Channel | undefined, shape: Shape) {
    channel?.push("update_shape", {id: shape.id, document_id: shape.document_id, height: shape.height, 
        width: shape.width, position_x: shape.position_x, position_y: shape.position_y});
}