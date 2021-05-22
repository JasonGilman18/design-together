import Shape from "../classes/shape";
import { MenuToolbar } from "../presentation_components/MenuToolbar";

export const MenuToolbarContainer = (props: MenuToolbarContainerProps) => {

    function updateComponentWidth(width: number) {
        props.setShapes(prevShapes => {
            const shapesCopy = [...prevShapes];
            shapesCopy[props.selectedShapeIndex].width = width;
            return shapesCopy;
        });
    }

    return (
        <MenuToolbar
            shapes={props.shapes}
            selectedShapeIndex={props.selectedShapeIndex}
            componentToolbarWidth={props.componentToolbarWidth}
            menuToolbarHeight={props.menuToolbarHeight}
            canvasHeight={props.canvasHeight}
            canvasWidth={props.canvasWidth}
            setShapes={props.setShapes}
            setAuthenticated={props.setAuthenticated}
            setCanvasWidth={props.setCanvasWidth}
            setCanvasHeight={props.setCanvasHeight}
            updateComponentWidth={updateComponentWidth}
        />
    );
};

interface MenuToolbarContainerProps {
    shapes: Array<Shape>,
    selectedShapeIndex: number,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    canvasHeight: number,
    canvasWidth: number,
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>
}