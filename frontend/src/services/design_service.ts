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
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    setSelectedShapeIndex: React.Dispatch<React.SetStateAction<number>>
) {
    const mousePos = getMouseCoordinates(e);
    setShapes(prevShapes => {
        const shapeValCopy = [...prevShapes];
        shapeValCopy.forEach((shape) => {
            shape.selected = false;
        });
        shapeValCopy.forEach((shape, index) => {
            const withinResize = shape.withinResizeBounds(mousePos.x, mousePos.y);
            if(withinResize != "") {
                shape.selected = true;
                setMouseDown("resize");
            }
            else if(shape.withinShapeBounds(mousePos.x, mousePos.y)) {
                shape.selected = true;
                setMouseDown("shape");
                setSelectedShapeIndex(index);
            }
            else
                setMouseDown("canvas");
        });
        return shapeValCopy;
    });
}

export function mouseMoveOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouseDown: string,
    mouseMoveX: number,
    mouseMoveY: number,
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
            var numShapesInBounds = 0;
            var shapeIndex = 0;
            shapeValCopy.forEach((shape, index) => {
                if(shape.withinShapeBounds(mousePos.x, mousePos.y) && shape.selected) {
                    numShapesInBounds++;
                    shapeIndex = index;
                }
            });
            if(numShapesInBounds == 1) {
                var potentialMouseMoveX = mouseMoveX + e.movementX;
                var potentialMouseMoveY = mouseMoveY + e.movementY;
                if(Math.abs(mouseMoveX) >= mouseSensitivity) {
                    shapeValCopy[shapeIndex].position_x += (mouseMoveX/mouseSensitivity)*gridSnap;
                    potentialMouseMoveX = 0;
                }
                if(Math.abs(mouseMoveY) >= mouseSensitivity) {
                    shapeValCopy[shapeIndex].position_y += (mouseMoveY/mouseSensitivity)*gridSnap;
                    potentialMouseMoveY = 0;
                }

                var overlapping = false;
                shapeValCopy.forEach((shape, index) => {
                    if(index !== shapeIndex) {
                        if(shape.overlapping(shapeValCopy[shapeIndex]))
                            overlapping = true;
                    }
                });

                if(!overlapping) {
                    setMouseMoveX(potentialMouseMoveX);
                    setMouseMoveY(potentialMouseMoveY);
                    updateShape(channel, shapeValCopy[shapeIndex]);
                }
            }
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

export function drawGridlinesOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    canvasWidth: number, canvasHeight: number) {
    const ctx = canvas.current?.getContext('2d');
    const height = canvasHeight;
    const width = canvasWidth;
    const cellSize = 10;

    for(var x=0;x<=width;x+=cellSize) {
        ctx?.moveTo(x, 0);
        ctx?.lineTo(x, height);
    }

    for(var y=0;y<=height;y+=cellSize) {
        ctx?.moveTo(0, y);
        ctx?.lineTo(width, y);
    }

    if(ctx !== undefined && ctx !== null) {
        ctx.strokeStyle = "#dcdcdc"; //#f6f6f6
        ctx.lineWidth = .5;
    }
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
        context.fillStyle = "black";
        if(shape.rounded == 0)
            context.rect(shape.position_x, shape.position_y, shape.width, shape.height);
        else {
            const bounds = shape.getShapeBounds();
            context.moveTo(bounds.topLeft.x, bounds.topLeft.y+shape.rounded);
            context.lineTo(bounds.bottomLeft.x, bounds.bottomLeft.y-shape.rounded);
            context.arcTo(bounds.bottomLeft.x, bounds.bottomLeft.y,
                bounds.bottomRight.x, bounds.bottomRight.y, shape.rounded);
            context.lineTo(bounds.bottomRight.x-shape.rounded, bounds.bottomRight.y);
            context.arcTo(bounds.bottomRight.x, bounds.bottomRight.y, 
                bounds.topRight.x, bounds.topRight.y, shape.rounded);
            context.lineTo(bounds.topRight.x, bounds.topRight.y+shape.rounded);
            context.arcTo(bounds.topRight.x, bounds.topRight.y,
                bounds.topLeft.x, bounds.topLeft.y, shape.rounded);
            context.lineTo(bounds.topLeft.x+shape.rounded, bounds.topLeft.y);
            context.arcTo(bounds.topLeft.x, bounds.topLeft.y,
                bounds.bottomLeft.x, bounds.bottomLeft.y, shape.rounded);
        }
        shape.filled ? context.fill() : context.stroke();
        context.closePath();
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