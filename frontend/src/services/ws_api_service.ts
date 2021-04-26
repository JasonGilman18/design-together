import {Channel, Socket} from 'phoenix';
import React from 'react';
import Shape from '../classes/shape';

export function connectToDocument(authToken: string, doc_id: number, ok_fn: React.Dispatch<React.SetStateAction<Channel | undefined>>) {
    var socket = new Socket('ws://localhost:4000/socket', {params: {authToken: authToken}})
    socket.connect();
    var new_channel = socket.channel('document:'+doc_id, {authToken: authToken});
    new_channel.join()
    ok_fn(new_channel);
}

export function subscribeToRectanlge(channel: Channel | undefined, ok_fn: React.Dispatch<React.SetStateAction<Shape[]>>) {
    channel?.on("new_rectangle", () => {
        ok_fn(prevShapes => [...prevShapes, new Shape(1, 0, 0, 50, 100)]);
    });
}

export function sendRectangle(channel: Channel | undefined) {
    channel?.push("new_rectangle", {}, 10000)
}