import { Channel } from "phoenix";
import { useState } from "react";
import {ComponentToolbar} from '../presentation_components/ComponentToolbar';
import { newShapeToChannel } from "../services/ws_api_service";

export const ComponentToolbarContainer = (props: ComponentToolbarContainerProps) => {

    const [containerOpen, setContainerOpen] = useState<Array<boolean>>([true]);
    
    function closeTypeContainer(index: number) {
        setContainerOpen(arr => {
            const copyArr = [...arr];
            copyArr[index] = !copyArr[index];
            return copyArr;
        });
    }

    function addType(type: string) {
        if(type === "square")
            newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, false, 0);
        else if(type === "square-filled")
            newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, true, 0);
        else if(type === "square-rounded")
            newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, false, 15);
        else if(type === "square-filled-rounded")
            newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, true, 15);
        else if(type === "rectangle")
            newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, false, 0);
        else if(type === "rectangle-filled")
            newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, true, 0);
        else if(type === "rectangle-rounded")
            newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, false, 15);
        else if(type === "rectangle-filled-rounded")
            newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, true, 15);
    }

    return (
        <ComponentToolbar
            channel={props.channel}
            docId={props.docId}
            containerOpen={containerOpen}
            closeTypeContainer={closeTypeContainer}
            addType={addType}
        />
    );
};

interface ComponentToolbarContainerProps {
    channel: Channel | undefined,
    docId: number
}