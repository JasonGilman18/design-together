import React from "react";
import Shape from "../classes/shape";

export function drawRectangle(canvas: React.MutableRefObject<HTMLCanvasElement>, shape: Shape) {
    const context = canvas.current.getContext("2d");
    if(context !== null) {
        context.beginPath();
        context.fillStyle = "black";
        context.rect(shape.position_x, shape.position_y, shape.width, shape.height);
        context.stroke();
    }
}

export function selectShape(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, setShapes: React.Dispatch<React.SetStateAction<Shape[]>>) {
    const canvasPos = e.currentTarget.getBoundingClientRect();
    const mouseXRelativeToCanvas = e.clientX - canvasPos.left;
    const mouseYRelativeToCanvas = e.clientY - canvasPos.top;

    setShapes(prevShapes => {
        const shapeValCopy = [...prevShapes];
        var updated = false;
        shapeValCopy.forEach((shape) => {
            if(shape.withinBounds(mouseXRelativeToCanvas, mouseYRelativeToCanvas)) {
                shape.width = 200;
                shape.height = 100;
                updated = true;
            }
        });
        return updated ? shapeValCopy : prevShapes;
    });
}