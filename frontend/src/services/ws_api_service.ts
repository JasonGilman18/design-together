import {Channel, Socket} from 'phoenix';
import React from 'react';
import Shape from '../classes/shape';

export function connectToDocument(authToken: string, doc_id: number, ok_fn: React.Dispatch<React.SetStateAction<Channel | undefined>>) {
    var socket = new Socket('ws://localhost:4000/socket', {params: {authToken: authToken}});
    socket.connect();
    var new_channel = socket.channel('document:'+doc_id, {authToken: authToken});
    new_channel.join();
    ok_fn(new_channel);
}

export function subscribeToShape(channel: Channel | undefined, ok_fn: React.Dispatch<React.SetStateAction<Shape[]>>) {
    channel?.on("new_shape", (newShape: Shape) => {
        ok_fn(prevShapes => [...prevShapes, newShape]);
    });

    channel?.on("shape_resize", () => {

    });

    channel?.on("shape_movement", () => {
        
    });
}

export function sendShape(channel: Channel | undefined, documentId: number, height: number, width: number, xPosition: number, yPosition: number) {
    channel?.push("new_shape", {document_id: documentId, height: height, width: width, x_position: xPosition, y_position: yPosition}, 10000);
}