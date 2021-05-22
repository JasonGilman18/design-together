import {Channel, Socket} from 'phoenix';
import React from 'react';
import Component from '../classes/Component';

export function connectToDocumentChannel(authToken: string, doc_id: number, 
    setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>, 
    setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
) {
    var socket = new Socket('ws://localhost:4000/socket', {params: {authToken: authToken}});
    socket.connect();
    var new_channel = socket.channel('document:'+doc_id, {authToken: authToken});
    new_channel.join();
    setChannel(new_channel);
    setSocket(socket);
}

export function disconnectFromDocumentChannel(channel: Channel | undefined, socket: Socket | undefined) {
    channel?.leave();
    socket?.disconnect();
}

export function newComponentFromChannel(channel: Channel | undefined, 
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>
) {
    channel?.on("new_shape", (responseComponent: Component) => {
        const newComponent = new Component(responseComponent.id, responseComponent.document_id, responseComponent.position_x, 
            responseComponent.position_y, responseComponent.height, responseComponent.width, responseComponent.filled, 
            responseComponent.rounded);
        setComponents(prevComponents => [...prevComponents, newComponent]);
    });
}

export function newComponentToChannel(channel: Channel | undefined, documentId: number, height: number, width: number, 
    position_x: number, position_y: number, filled: boolean, rounded: number
) {
    
    channel?.push("new_shape", {document_id: documentId, height: height, width: width, position_x: position_x, 
        position_y: position_y, filled: filled, rounded: rounded}, 10000);
}

export function updateComponentFromChannel(channel: Channel | undefined, 
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>
) {
    channel?.on("update_shape", (responseComponent: Component) => {
        setComponents(prevComponents => {
            const componentsCopyVal = [...prevComponents];
            componentsCopyVal.forEach((component) => {
                if(component.id === responseComponent.id) {
                    component.height = responseComponent.height;
                    component.width = responseComponent.width;
                    component.position_x = responseComponent.position_x;
                    component.position_y = responseComponent.position_y;
                }
            });
            return componentsCopyVal;
        });
    });
}

export function updateComponentToChannel(channel: Channel | undefined, component: Component) {
    channel?.push("update_shape", {id: component.id, document_id: component.document_id, height: component.height, 
        width: component.width, position_x: component.position_x, position_y: component.position_y});
}