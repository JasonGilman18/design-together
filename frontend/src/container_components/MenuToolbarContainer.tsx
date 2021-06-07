import { Channel } from "phoenix";
import ComponentTree from "../classes/ComponentTree";
import { MenuToolbar } from "../presentation_components/MenuToolbar";
import { updateComponentToChannel } from "../services/ws_api_service";

export const MenuToolbarContainer = (props: MenuToolbarContainerProps) => {

    function updateComponentWidth(width: number) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.style.width = width;
                //updateComponentToChannel(props.channel, component);
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
                //updateComponentToChannel(props.channel, component);
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