import Component from "../classes/Component";
import { MenuToolbar } from "../presentation_components/MenuToolbar";

export const MenuToolbarContainer = (props: MenuToolbarContainerProps) => {

    function updateComponentWidth(width: number) {
        props.setComponents(prevComponents => {
            const componentsCopy = [...prevComponents];
            componentsCopy[props.selectedComponentIndex].width = width;
            return componentsCopy;
        });
    }

    return (
        <MenuToolbar
            components={props.components}
            selectedComponentIndex={props.selectedComponentIndex}
            componentToolbarWidth={props.componentToolbarWidth}
            menuToolbarHeight={props.menuToolbarHeight}
            canvasHeight={props.canvasHeight}
            canvasWidth={props.canvasWidth}
            setComponents={props.setComponents}
            setAuthenticated={props.setAuthenticated}
            setCanvasWidth={props.setCanvasWidth}
            setCanvasHeight={props.setCanvasHeight}
            updateComponentWidth={updateComponentWidth}
        />
    );
};

interface MenuToolbarContainerProps {
    components: Array<Component>,
    selectedComponentIndex: number,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    canvasHeight: number,
    canvasWidth: number,
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>
}