import { Channel } from "phoenix";
import React from "react";
import Shape from "../classes/shape";

export function newShape(canvas: React.MutableRefObject<HTMLCanvasElement>, shape: Shape) {
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
                shape.selected = true;
                updated = true;
            }
        });
        return updated ? shapeValCopy : prevShapes;
    });
}

export function deselectShape(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, setShapes: React.Dispatch<React.SetStateAction<Shape[]>>) {
    setShapes(prevShapes => {
        const shapeValCopy = [...prevShapes];
        shapeValCopy.forEach((shape) => {
            if(shape.selected)
                shape.selected = false;
        });
        return shapeValCopy;
    });
}

export function moveShape(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, updateShape: (channel: Channel | undefined, shape: Shape) => void, channel: Channel | undefined) {
    const canvasPos = e.currentTarget.getBoundingClientRect();
    const mouseXRelativeToCanvas = e.clientX - canvasPos.left;
    const mouseYRelativeToCanvas = e.clientY - canvasPos.top;

    setShapes(prevShapes => {
        const shapeValCopy = [...prevShapes];
        var updated = false;
        shapeValCopy.forEach((shape) => {
            if(shape.withinBounds(mouseXRelativeToCanvas, mouseYRelativeToCanvas)) {
                shape.position_x += e.movementX;
                shape.position_y += e.movementY;
                updated = true;
                updateShape(channel, shape);
            }
        });
        return updated ? shapeValCopy : prevShapes;
    });
}