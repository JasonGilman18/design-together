import {Channel, Socket} from 'phoenix';
import React from 'react';
import Component from '../classes/Component';
import ComponentTree from '../classes/ComponentTree';

export function connectToDocumentChannel(authToken: string, doc_id: number, 
    setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>, 
    setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
) {
    var socket = new Socket('ws://localhost:4000/socket', {params: {authToken: authToken}});
    socket.connect();
    var new_channel = socket.channel('document:'+doc_id, {authToken: authToken});
    new_channel.join().receive("ok", (msg: any) => {
        if(msg.root)
            newComponentToChannel(new_channel, doc_id, null, "document");
        else {
            const newTree = ComponentTree.loadDocument(msg.components);
            setComponentTree(newTree);
        }
    });
    setChannel(new_channel);
    setSocket(socket);
}

export function disconnectFromDocumentChannel(channel: Channel | undefined, socket: Socket | undefined, doc_id: any) {
    channel?.leave();
    socket?.disconnect();
}

export function newComponentFromChannel(channel: Channel | undefined, 
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
) {
    channel?.on("new_component", (responseComponent: any) => {
        setComponentTree(prevTree => {
            const newComponent = new Component(responseComponent.id, responseComponent.document_id, 
                prevTree.find(responseComponent.parent_id), responseComponent.type);
            prevTree.insert(newComponent);
            return prevTree.copy();
        });
    });
}

export function newComponentToChannel(channel: Channel | undefined, documentId: number, parentId: number | null, 
    type: string
) {
    channel?.push("new_component", {document_id: documentId, parent_id: parentId, type: type}, 10000);
}

export function updateComponentFromChannel(channel: Channel | undefined, 
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
) {
    channel?.on("update_component", (responseComponent: Component) => {
        setComponentTree(prevTree => {
            const componentToUpdate = prevTree.find(responseComponent.id);
            if(componentToUpdate) {
                componentToUpdate.style = responseComponent.style;
                return prevTree.copy();
            }
            return prevTree;
        });
    });
}

export function updateComponentToChannel(channel: Channel | undefined, component: Component) {
    component.updateRequired = false;
    channel?.push("update_component", {id: component.id, document_id: component.document_id,
        style: component.style});
}

export function deleteComponentFromChannel(channel: Channel | undefined,
    deleteComponent: (id: number) => void
) {
    channel?.on("delete_component", (id: number) => {
        deleteComponent(id);
    });
}

export function deleteComponentToChannel(channel: Channel | undefined, id: number) {
    channel?.push("delete_component", {id: id});
}