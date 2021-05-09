import { Channel } from "phoenix";
import React from "react";
import Shape from "../classes/shape";

export function displayShapesOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, shape: Shape) {
    if(shape.selected) {
        drawShapeOnCanvas(canvas, shape);
        drawSelectionOnCanvas(canvas, shape);
    }
    else
        drawShapeOnCanvas(canvas, shape);
}

export function mouseDownOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) {
    const mousePos = getMouseCoordinates(e);
    setShapes(prevShapes => {
        const shapeValCopy = [...prevShapes];
        shapeValCopy.forEach((shape) => {
            shape.selected = false;
        });
        shapeValCopy.forEach((shape) => {
            const withinResize = shape.withinResizeBounds(mousePos.x, mousePos.y);
            if(withinResize != "") {
                shape.selected = true;
                console.log(withinResize);
            }
            else if(shape.withinShapeBounds(mousePos.x, mousePos.y)) {
                shape.selected = true;
            }
        });
        return shapeValCopy;
    });
}

export function mouseMoveOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouseDown: boolean, 
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, 
    updateShape: (channel: Channel | undefined, shape: Shape) => void, 
    channel: Channel | undefined
) {
    if(mouseDown) {
        const mousePos = getMouseCoordinates(e);
        setShapes(prevShapes => {
            const shapeValCopy = [...prevShapes];
            var updated = false;
            shapeValCopy.forEach((shape) => {
                if(shape.withinShapeBounds(mousePos.x, mousePos.y)) {
                    shape.position_x += e.movementX;
                    shape.position_y += e.movementY;
                    updated = true;
                    updateShape(channel, shape);
                }
            });
            return updated ? shapeValCopy : prevShapes;
        });
    }
}

function getMouseCoordinates(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const canvasPos = e.currentTarget.getBoundingClientRect();
    const mouseXRelativeToCanvas = e.clientX - canvasPos.left;
    const mouseYRelativeToCanvas = e.clientY - canvasPos.top;
    return {
        x: mouseXRelativeToCanvas,
        y: mouseYRelativeToCanvas
    }
}

function drawShapeOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    shape: Shape
) {
    const context = canvas.current?.getContext("2d");
    if(context !== null && context !== undefined) {
        context.beginPath();
        context.fillStyle = "black";
        context.rect(shape.position_x, shape.position_y, shape.width, shape.height);
        context.stroke();
    }
}

function drawSelectionOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    shape: Shape
) {
    const bounds = shape.getShapeBounds();
    const context = canvas.current?.getContext('2d');
    const bubbleRadius = 5;

    context?.beginPath();
    context?.arc(bounds.topLeft.x, bounds.topLeft.y, bubbleRadius, 0, 2*Math.PI);
    context?.stroke();
    context?.beginPath();
    context?.arc(bounds.topRight.x, bounds.topRight.y, bubbleRadius, 0, 2*Math.PI);
    context?.stroke();
    context?.beginPath();
    context?.arc(bounds.bottomLeft.x, bounds.bottomLeft.y, bubbleRadius, 0, 2*Math.PI);
    context?.stroke();
    context?.beginPath();
    context?.arc(bounds.bottomRight.x, bounds.bottomRight.y, bubbleRadius, 0, 2*Math.PI);
    context?.stroke();
}