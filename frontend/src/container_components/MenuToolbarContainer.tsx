import { Channel } from "phoenix";
import ComponentTree from "../classes/ComponentTree";
import { MenuToolbar } from "../presentation_components/MenuToolbar";

export const MenuToolbarContainer = (props: MenuToolbarContainerProps) => {

    function updateComponentWidth(width: number) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.updateWidth(width);
                return prevTree.copy();
            }
            return prevTree;
        }); 
    }

    function updateComponentHeight(height: number) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.updateHeight(height);
                return prevTree.copy();
            }
            return prevTree;
        });
    }

    function updateComponentAlignHorizontal(align: string) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.updateAlignHorizontal(align);
                return prevTree.copy();
            }
            return prevTree;
        });
    }

    function updateComponentAlignVertical(align: string) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.updateAlignVertical(align);
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
            docName={props.docName}
            canvasHeight={props.canvasHeight}
            canvasWidth={props.canvasWidth}
            setAuthenticated={props.setAuthenticated}
            setCanvasWidth={props.setCanvasWidth}
            setCanvasHeight={props.setCanvasHeight}
            updateComponentWidth={updateComponentWidth}
            updateComponentHeight={updateComponentHeight}
            updateComponentAlignHorizontal={updateComponentAlignHorizontal}
            updateComponentAlignVertical={updateComponentAlignVertical}
            setShowGridlines={props.setShowGridlines}
        />
    );
};

interface MenuToolbarContainerProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    docName: string,
    canvasHeight: number,
    canvasWidth: number,
    channel: Channel | undefined,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
}