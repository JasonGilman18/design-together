import { Channel } from "phoenix";
import React from "react";
import Component from "../classes/Component";

export function displayComponentsOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, component: Component) {
    if(component.selected) {
        drawComponentOnCanvas(canvas, component);
        drawSelectionOnCanvas(canvas, component);
    }
    else
        drawComponentOnCanvas(canvas, component);
}

export function mouseDownOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    setSelectedComponentIndex: React.Dispatch<React.SetStateAction<number>>
) {
    const mousePos = getMouseCoordinates(e);
    setComponents(prevComponents => {
        const componentValCopy = [...prevComponents];
        componentValCopy.forEach((component) => {
            component.selected = false;
        });
        componentValCopy.forEach((component, index) => {
            const withinResize = component.withinResizeBounds(mousePos.x, mousePos.y);
            if(withinResize != "") {
                component.selected = true;
                setMouseDown("resize");
            }
            else if(component.withinComponentBounds(mousePos.x, mousePos.y)) {
                component.selected = true;
                setMouseDown("component");
                setSelectedComponentIndex(index);
            }
            else
                setMouseDown("canvas");
        });
        return componentValCopy;
    });
}

export function mouseMoveOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouseDown: string,
    mouseMoveX: number,
    mouseMoveY: number,
    setMouseMoveX: React.Dispatch<React.SetStateAction<number>>,
    setMouseMoveY: React.Dispatch<React.SetStateAction<number>>, 
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>, 
    updateComponent: (channel: Channel | undefined, Component: Component) => void, 
    channel: Channel | undefined
) {
    const mousePos = getMouseCoordinates(e);
    const mouseSensitivity = 10;
    const gridSnap = 10;
    if(mouseDown === "component") {
        setComponents(prevComponents => {
            const componentValCopy = [...prevComponents];
            var numComponentsInBounds = 0;
            var componentIndex = 0;
            componentValCopy.forEach((component, index) => {
                if(component.withinComponentBounds(mousePos.x, mousePos.y) && component.selected) {
                    numComponentsInBounds++;
                    componentIndex = index;
                }
            });
            if(numComponentsInBounds == 1) {
                var potentialMouseMoveX = mouseMoveX + e.movementX;
                var potentialMouseMoveY = mouseMoveY + e.movementY;
                if(Math.abs(mouseMoveX) >= mouseSensitivity) {
                    componentValCopy[componentIndex].position_x += (mouseMoveX/mouseSensitivity)*gridSnap;
                    potentialMouseMoveX = 0;
                }
                if(Math.abs(mouseMoveY) >= mouseSensitivity) {
                    componentValCopy[componentIndex].position_y += (mouseMoveY/mouseSensitivity)*gridSnap;
                    potentialMouseMoveY = 0;
                }

                var overlapping = false;
                componentValCopy.forEach((component, index) => {
                    if(index !== componentIndex) {
                        if(component.overlapping(componentValCopy[componentIndex]))
                            overlapping = true;
                    }
                });

                if(!overlapping) {
                    setMouseMoveX(potentialMouseMoveX);
                    setMouseMoveY(potentialMouseMoveY);
                    updateComponent(channel, componentValCopy[componentIndex]);
                }
            }
            return componentValCopy;
        });
    }
    else if(mouseDown === "resize") {
        setComponents(prevComponents => {
            const componentValCopy = [...prevComponents];
            var updated = false;
            componentValCopy.forEach((component) => {
                const withinResize = component.withinResizeBounds(mousePos.x, mousePos.y);
                if(withinResize === "topLeft") {
                    component.position_x += e.movementX;
                    component.position_y += e.movementY;
                    component.height -= e.movementY;
                    component.width -= e.movementX;
                    updated = true;
                }
                else if(withinResize === "topRight") {
                    component.position_y += e.movementY;
                    component.height -= e.movementY;
                    component.width += e.movementX;
                    updated = true;
                }
                else if(withinResize === "bottomLeft") {
                    component.position_x += e.movementX;
                    component.height += e.movementY;
                    component.width -= e.movementX;
                    updated = true;
                }
                else if(withinResize === "bottomRight") {
                    component.height += e.movementY;
                    component.width += e.movementX;
                    updated = true;
                }
                if(updated) updateComponent(channel, component);
            });
            return updated ? componentValCopy : prevComponents;
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

function drawComponentOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    component: Component
) {
    const context = canvas.current?.getContext("2d");
    if(context !== null && context !== undefined) {
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        if(component.rounded == 0)
            context.rect(component.position_x, component.position_y, component.width, component.height);
        else {
            const bounds = component.getComponentBounds();
            context.moveTo(bounds.topLeft.x, bounds.topLeft.y+component.rounded);
            context.lineTo(bounds.bottomLeft.x, bounds.bottomLeft.y-component.rounded);
            context.arcTo(bounds.bottomLeft.x, bounds.bottomLeft.y,
                bounds.bottomRight.x, bounds.bottomRight.y, component.rounded);
            context.lineTo(bounds.bottomRight.x-component.rounded, bounds.bottomRight.y);
            context.arcTo(bounds.bottomRight.x, bounds.bottomRight.y, 
                bounds.topRight.x, bounds.topRight.y, component.rounded);
            context.lineTo(bounds.topRight.x, bounds.topRight.y+component.rounded);
            context.arcTo(bounds.topRight.x, bounds.topRight.y,
                bounds.topLeft.x, bounds.topLeft.y, component.rounded);
            context.lineTo(bounds.topLeft.x+component.rounded, bounds.topLeft.y);
            context.arcTo(bounds.topLeft.x, bounds.topLeft.y,
                bounds.bottomLeft.x, bounds.bottomLeft.y, component.rounded);
        }
        component.filled ? context.fill() : context.stroke();
        context.closePath();
    }
}

function drawSelectionOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    component: Component
) {
    const bounds = component.getComponentBounds();
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