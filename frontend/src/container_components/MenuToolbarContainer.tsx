import { useEffect } from "react";
import Component from "../classes/Component";
import ComponentTree from "../classes/ComponentTree";
import { MenuToolbar } from "../presentation_components/MenuToolbar";

export const MenuToolbarContainer = (props: MenuToolbarContainerProps) => {

    function updateComponentWidth(width: number) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.style.width = width;
                return prevTree.copy();
            }
            return prevTree;
        }); 
    }

    function updateComponentHeight(height: number) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.style.height = height;
                return prevTree.copy();
            }
            return prevTree;
        });
    }

    return (
        <MenuToolbar
            componentTree={props.componentTree}
            selectedComponentId={props.selectedComponentId}
            componentToolbarWidth={props.componentToolbarWidth}
            menuToolbarHeight={props.menuToolbarHeight}
            canvasHeight={props.canvasHeight}
            canvasWidth={props.canvasWidth}
            setAuthenticated={props.setAuthenticated}
            setCanvasWidth={props.setCanvasWidth}
            setCanvasHeight={props.setCanvasHeight}
            updateComponentWidth={updateComponentWidth}
            updateComponentHeight={updateComponentHeight}
        />
    );
};

interface MenuToolbarContainerProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    canvasHeight: number,
    canvasWidth: number,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
}