import { useState } from "react";
import {ComponentToolbar} from '../presentation_components/ComponentToolbar';

export const ComponentToolbarContainer = (props: ComponentToolbarContainerProps) => {

    const [containerOpen, setContainerOpen] = useState<Array<boolean>>([true]);
    
    function closeTypeContainer(index: number) {
        setContainerOpen(arr => {
            const copyArr = [...arr];
            copyArr[index] = !copyArr[index];
            return copyArr;
        });
    }

    return (
        <ComponentToolbar
            containerOpen={containerOpen}
            closeTypeContainer={closeTypeContainer}
            newComponent={props.newComponent}
        />
    );
};

interface ComponentToolbarContainerProps {
    newComponent: (type: string) => void
}