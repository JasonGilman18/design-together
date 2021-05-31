import React from "react";
import Component from "../classes/Component";
import ComponentTree from "../classes/ComponentTree";
import Stack from "../classes/Stack";

export function displayComponentsOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    component: Component | null
) {
    if(component) {
        var updatedComponents: Component[] = [];
        if(component.node.parent === null)
            drawComponentOnCanvas(canvas, component);
        component.node.children.forEach((child) => {
            const updatedPos = getNextAvailiblePosition(component, child, child.style.width, child.style.height, 
                canvas.current?.width, canvas.current?.height);
            child.style.position_x = updatedPos.x;
            child.style.position_y = updatedPos.y;
            drawComponentOnCanvas(canvas, child);
            updatedComponents.push(child);
            if(component.node.children.length > 0)
                displayComponentsOnCanvas(canvas, child);
        });
    }
}

export function mouseDownOnCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>,
    componentTree: ComponentTree,
    setMouseDown: React.Dispatch<React.SetStateAction<string>>,
    setSelectedComponentId: React.Dispatch<React.SetStateAction<number>>
) {
    const mousePos = getMouseCoordinates(e);
    const id = findSelectedComponentId(componentTree, mousePos);
    setSelectedComponentId(id);
    setComponentTree(prevTree => {
        prevTree.components.forEach((component) => {
            component.style.selected = false;
        });
        const selected = prevTree.find(id);
        if(selected) selected.style.selected = true;
        return prevTree.copy();
    });
}

function findSelectedComponentId(componentTree: ComponentTree, mousePos: {x: number, y: number}): number {
    if(componentTree.root === null)
        return -1;
    var stack = new Stack<Component>();
    stack.push(componentTree.root);
    var id = -1;
    while(stack.empty() === false) {
        const component = stack.peek();
        if(component.withinComponentBounds(mousePos.x, mousePos.y)) {
            id = component.id;
            stack.pop();
            component.node.children.forEach((child) => {
                stack.push(child);
            });
        }
        else
            stack.pop();
    }
    return id;
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

export function getNextAvailiblePosition(parent: Component | null, excludeComponent: Component | null, width: number, 
    height: number, canvasWidth: number | undefined, canvasHeight: number | undefined
): {x: number, y: number} {
    var x = 0;
    var y = 0;
    if(canvasWidth !== undefined && canvasHeight !== undefined) {
        if(parent) {
            const components = [...parent.node.children];
            if(excludeComponent) {
                components.forEach((component, index) => {
                    if(component.id === excludeComponent.id)
                        components.splice(index);
                });
            }
            if(components.length > 0) {
                const lastComponentBounds = components[components.length-1].getComponentBounds();
                if(lastComponentBounds.bottomRight.x + width > parent.getComponentBounds().bottomRight.x) {
                    x = parent.getComponentBounds().topLeft.x;
                    y = lastComponentBounds.bottomRight.y;
                    for(var i=components.length-1;i>=0;i--) {
                        const component = components[i];
                        const componentBounds = component.getComponentBounds();
                        if(componentBounds.bottomRight.y >= y)
                            y = component.getComponentBounds().bottomRight.y;       
                    }
                }
                else {
                    x = lastComponentBounds.bottomRight.x;
                    y = lastComponentBounds.topRight.y;
                }
            }
            else {
                x = parent.getComponentBounds().topLeft.x;
                y = parent.getComponentBounds().topLeft.y;   
            }
        }
    }
    return {x: x, y: y};
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
        draw(context, component);
        if(component.style.filled) {
            context.fillStyle = "black";
            context.fill();
            context.closePath();
            if(component.style.selected) {
                context.beginPath();
                context.strokeStyle = "green";
                context.lineWidth = 3;
                draw(context, component);
                context.stroke();
            }
        }
        else {
            context.strokeStyle = component.style.selected ? "green" : "black";
            context.lineWidth = component.style.selected ? 3 : 1;
            context.stroke();
        }
        context.closePath();
    }
}

function draw(context: CanvasRenderingContext2D, component: Component) {
    if(component.style.rounded == 0)
        context.rect(component.style.position_x, component.style.position_y, component.style.width, component.style.height);
    else {
        const bounds = component.getComponentBounds();
        context.moveTo(bounds.topLeft.x, bounds.topLeft.y+component.style.rounded);
        context.lineTo(bounds.bottomLeft.x, bounds.bottomLeft.y-component.style.rounded);
        context.arcTo(bounds.bottomLeft.x, bounds.bottomLeft.y,
            bounds.bottomRight.x, bounds.bottomRight.y, component.style.rounded);
        context.lineTo(bounds.bottomRight.x-component.style.rounded, bounds.bottomRight.y);
        context.arcTo(bounds.bottomRight.x, bounds.bottomRight.y, 
            bounds.topRight.x, bounds.topRight.y, component.style.rounded);
        context.lineTo(bounds.topRight.x, bounds.topRight.y+component.style.rounded);
        context.arcTo(bounds.topRight.x, bounds.topRight.y,
            bounds.topLeft.x, bounds.topLeft.y, component.style.rounded);
        context.lineTo(bounds.topLeft.x+component.style.rounded, bounds.topLeft.y);
        context.arcTo(bounds.topLeft.x, bounds.topLeft.y,
            bounds.bottomLeft.x, bounds.bottomLeft.y, component.style.rounded);
    }
}

/*
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
*/