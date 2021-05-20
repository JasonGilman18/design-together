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
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>
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
                setMouseDown("resize");
            }
            else if(shape.withinShapeBounds(mousePos.x, mousePos.y)) {
                shape.selected = true;
                setMouseDown("shape");
            }
            else
                setMouseDown("canvas");
        });
        return shapeValCopy;
    });
}

export function mouseMoveOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouseDown: string,
    setMouseMoveX: React.Dispatch<React.SetStateAction<number>>,
    setMouseMoveY: React.Dispatch<React.SetStateAction<number>>, 
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, 
    updateShape: (channel: Channel | undefined, shape: Shape) => void, 
    channel: Channel | undefined
) {
    const mousePos = getMouseCoordinates(e);
    const mouseSensitivity = 10;
    const gridSnap = 10;
    if(mouseDown === "shape") {
        setShapes(prevShapes => {
            const shapeValCopy = [...prevShapes];
            shapeValCopy.forEach((shape) => {
                if(shape.withinShapeBounds(mousePos.x, mousePos.y)) {
                    setMouseMoveX(mouseMoveX => {
                        if(Math.abs(mouseMoveX) >= mouseSensitivity) {
                            shape.position_x += (mouseMoveX/mouseSensitivity)*gridSnap;
                            updateShape(channel, shape);
                            return 0;
                        }
                        else
                            return mouseMoveX + e.movementX;
                    });
                    setMouseMoveY(mouseMoveY => {
                        if(Math.abs(mouseMoveY) >= mouseSensitivity) {
                            shape.position_y += (mouseMoveY/mouseSensitivity)*gridSnap;
                            updateShape(channel, shape);
                            return 0;
                        }
                        else
                            return mouseMoveY + e.movementY;
                    });
                }
            });
            return shapeValCopy;
        });
    }
    else if(mouseDown === "resize") {
        setShapes(prevShapes => {
            const shapeValCopy = [...prevShapes];
            var updated = false;
            shapeValCopy.forEach((shape) => {
                const withinResize = shape.withinResizeBounds(mousePos.x, mousePos.y);
                if(withinResize === "topLeft") {
                    shape.position_x += e.movementX;
                    shape.position_y += e.movementY;
                    shape.height -= e.movementY;
                    shape.width -= e.movementX;
                    updated = true;
                }
                else if(withinResize === "topRight") {
                    shape.position_y += e.movementY;
                    shape.height -= e.movementY;
                    shape.width += e.movementX;
                    updated = true;
                }
                else if(withinResize === "bottomLeft") {
                    shape.position_x += e.movementX;
                    shape.height += e.movementY;
                    shape.width -= e.movementX;
                    updated = true;
                }
                else if(withinResize === "bottomRight") {
                    shape.height += e.movementY;
                    shape.width += e.movementX;
                    updated = true;
                }
                if(updated) updateShape(channel, shape);
            });
            return updated ? shapeValCopy : prevShapes;
        });
    }
}

export function drawGridlinesOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>) {
    const ctx = canvas.current?.getContext('2d');
    const height = 500;
    const width = 500;
    const cellSize = 10;

    for(var x=0;x<=width;x+=cellSize) {
        ctx?.moveTo(x, 0);
        ctx?.lineTo(x, height);
    }

    for(var y=0;y<=height;y+=cellSize) {
        ctx?.moveTo(0, y);
        ctx?.lineTo(width, y);
    }

    if(ctx !== undefined && ctx !== null) ctx.strokeStyle = "grey";
    ctx?.stroke();
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
        context.strokeStyle = "black";
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