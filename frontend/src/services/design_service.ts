import { Channel } from "phoenix";
import React from "react";
import Component from "../classes/Component";
import ComponentTree from "../classes/ComponentTree";
import Stack from "../classes/Stack";
import { updateComponentToChannel } from "./ws_api_service";

export function displayComponentsOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    component: Component | null
) {
    if(component) {
        if(component.node.parent === null)
            drawComponentOnCanvas(canvas, component);
        component.node.children.forEach((child) => {
            drawComponentOnCanvas(canvas, child);
            if(component.node.children.length > 0)
                displayComponentsOnCanvas(canvas, child);
        });
    }
}

export function updateComponents(channel: Channel | undefined, component: Component | null, canvasWidth: number,
    canvasHeight: number    
) {
    if(component) {
        if(component.node.parent === null) {
            if(component.style.width !== canvasWidth)
                component.updateWidth(canvasWidth);
            if(component.style.height !== canvasHeight)
                component.updateHeight(canvasHeight);
            if(component.updateRequired)
                updateComponentToChannel(channel, component);
        }
        setChildPositions(component, canvasWidth);
        component.node.children.forEach((child) => {
            if(child.updateRequired)
                updateComponentToChannel(channel, child);
            if(component.node.children.length > 0)
                updateComponents(channel, child, canvasWidth, canvasHeight);
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

export function setChildPositions(parent: Component | null, canvasWidth: number
) {
    if(parent) {
        switch(parent.style.align_horizontal) {
            case "start":
                alignHorizontalStart(parent);
                break;
            case "center":
                alignHorizontalCenter(parent);
                break;
            case "end":
                alignHorizontalEnd(parent);
                break;
        }
        switch(parent.style.align_vertical) {
            case "start":
                alignVerticalStart(parent);
                break;
            case "center":
                alignVerticalCenter(parent);
                break;
            case "end":
                alignVerticalEnd(parent);
                break;
        }
    }
}

function alignHorizontalStart(parent: Component) {
    var sumWidth = 0;
    parent.node.children.forEach((child) => {
        const checkOverflow = parent.getComponentBounds().topLeft.x + parent.style.padding_left + child.style.width 
            + child.style.margin_left + child.style.margin_right + sumWidth;
        if(checkOverflow <= parent.getComponentBounds().topRight.x - parent.style.padding_right) {
            child.updatePositionX(checkOverflow - child.style.width - child.style.margin_right);
            sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        }
        else {
            child.updatePositionX(parent.getComponentBounds().topLeft.x = parent.style.padding_left);
            sumWidth = child.style.width + child.style.margin_left + child.style.margin_right;
        }
    });
}

function alignHorizontalCenter(parent: Component) {
    var sumWidth = 0;
    var rows: {startOffset: number, components: Component[]}[] = [];
    var row: Component[] = [];
    parent.node.children.forEach((child) => {
        sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        if(parent.getComponentBounds().topLeft.x + parent.style.padding_left + sumWidth 
            > parent.getComponentBounds().topRight.x - parent.style.padding_right
        ) {
            var startOffset = (parent.style.width - sumWidth - parent.style.padding_left 
                - parent.style.padding_right + child.style.width) / 2;
            rows.push({startOffset: startOffset, components: row});
            sumWidth = child.style.width + child.style.margin_left + child.style.margin_right;
            row = [child];
        }
        else {
            row.push(child);
        }
    });
    var startOffset = (parent.style.width - sumWidth - parent.style.padding_left 
        - parent.style.padding_right) / 2;
    rows.push({startOffset: startOffset, components: row});
    rows.forEach((rowObject) => {
        sumWidth = 0;
        rowObject.components.forEach((child) => {
            child.updatePositionX(parent.getComponentBounds().topLeft.x + parent.style.padding_left 
                + rowObject.startOffset + sumWidth + child.style.margin_left);
            sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        });
    });
}

function alignHorizontalEnd(parent: Component) {
    var sumWidth = 0;
    var row: Component[] = [];
    parent.node.children.forEach((child) => {
        sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        if(parent.getComponentBounds().topRight.x - sumWidth - parent.style.padding_right 
            < parent.getComponentBounds().topLeft.x + parent.style.padding_left
        ) {
            sumWidth = 0;
            for(var i=row.length-1;i>=0;i--) {
               sumWidth += row[i].style.width + row[i].style.margin_left + row[i].style.margin_right;
               row[i].updatePositionX(parent.getComponentBounds().topRight.x - parent.style.padding_right 
                    - sumWidth + row[i].style.margin_left);
            }
            row = [child];
            sumWidth = child.style.width + child.style.margin_left + child.style.margin_right;
            child.updatePositionX(parent.getComponentBounds().topRight.x - parent.style.padding_right 
                - sumWidth + child.style.margin_left);
        }   
        else
            row.push(child);
    });
    sumWidth = 0;
    for(var i=row.length-1;i>=0;i--) {
        sumWidth += row[i].style.width + row[i].style.margin_left + row[i].style.margin_right;
        row[i].updatePositionX(parent.getComponentBounds().topRight.x - parent.style.padding_right
             - sumWidth + row[i].style.margin_left);
    }
}

function alignVerticalStart(parent: Component) {
    var sumWidth = 0;
    var currentHeight = parent.style.padding_top;
    var greatestHeight = 0;
    parent.node.children.forEach((child) => {
        sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        if(parent.getComponentBounds().topLeft.x + parent.style.padding_left + sumWidth 
            > parent.getComponentBounds().topRight.x - parent.style.padding_right
        ) {
            child.updatePositionY(parent.getComponentBounds().topLeft.y + currentHeight + greatestHeight + child.style.margin_top);
            sumWidth = child.style.width + child.style.margin_left + child.style.margin_right;
            currentHeight += greatestHeight;
            greatestHeight = child.style.height + child.style.margin_top + child.style.margin_bottom;
        }
        else {
            child.updatePositionY(parent.getComponentBounds().topLeft.y + currentHeight + child.style.margin_top);
            greatestHeight = child.style.height + child.style.margin_top + child.style.margin_bottom > greatestHeight 
                ? child.style.height + child.style.margin_top + child.style.margin_bottom 
                : greatestHeight;
        }
    });
}

function alignVerticalCenter(parent: Component) {
    var sumWidth = 0;
    var greatestHeight = 0;
    var rows: {greatestHeight: number, components: Component[]}[] = [];
    var row: Component[] = [];
    parent.node.children.forEach((child) => {
        sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        if(parent.getComponentBounds().topLeft.x + sumWidth + parent.style.padding_left 
            > parent.getComponentBounds().topRight.x - parent.style.padding_right
        ) {
            rows.push({greatestHeight: greatestHeight, components: row});
            sumWidth = child.style.width + child.style.margin_left + child.style.margin_right;
            greatestHeight = child.style.height + child.style.margin_top + child.style.margin_bottom;
            row = [child];
        }
        else {
            row.push(child);
            greatestHeight = child.style.height + child.style.margin_bottom + child.style.margin_top > greatestHeight 
                ? child.style.height + child.style.margin_top + child.style.margin_bottom
                : greatestHeight;
        }
    });
    rows.push({greatestHeight: greatestHeight, components: row});
    var sumHeight = 0;
    rows.forEach((rowObject) => {
        sumHeight += rowObject.greatestHeight;
    });
    const startOffset = (parent.style.height - sumHeight - parent.style.padding_top - parent.style.padding_bottom) / 2;
    sumHeight = 0;
    rows.forEach((rowObject) => {
        rowObject.components.forEach((c) => {
            c.updatePositionY(parent.getComponentBounds().topLeft.y + parent.style.padding_top + startOffset + sumHeight 
                + c.style.margin_top - c.style.margin_bottom
            );
        });
        sumHeight += rowObject.greatestHeight;
    });
}

function alignVerticalEnd(parent: Component) {
    var sumWidth = 0;
    var greatestHeight = 0;
    var currentHeight = 0;
    var row: Component[] = [];
    var stack = new Stack<{greatestHeight: number, components: Component[]}>();
    parent.node.children.forEach((child) => {
        sumWidth += child.style.width + child.style.margin_left + child.style.margin_right;
        if(parent.getComponentBounds().topRight.x - sumWidth - parent.style.padding_right 
            < parent.getComponentBounds().topLeft.x + parent.style.padding_left
        ) {
            stack.push({greatestHeight: greatestHeight, components: row});
            row = [child];
            sumWidth = child.style.width + child.style.margin_left + child.style.margin_right;
            greatestHeight = 0;
        }
        else
            row.push(child);
        greatestHeight = greatestHeight < child.style.height + child.style.margin_top + child.style.margin_bottom
            ? child.style.height + child.style.margin_top + child.style.margin_bottom
            : greatestHeight;
    });
    stack.push({greatestHeight: greatestHeight, components: row});
    var currentRow: {greatestHeight: number, components: Component[]};
    while(!stack.empty()) {
        currentRow = stack.pop();
        currentRow.components.forEach((component) => {
            component.updatePositionY(parent.getComponentBounds().bottomRight.y - parent.style.padding_bottom - currentHeight 
                - component.style.height - component.style.margin_bottom);
        });
        currentHeight += currentRow.greatestHeight;
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

function drawComponentOnCanvas(canvas: React.MutableRefObject<HTMLCanvasElement | null>, 
    component: Component
) {
    const context = canvas.current?.getContext("2d");
    if(context !== null && context !== undefined) {
        context.beginPath();
        if(component.type === "container") {
            drawContainer(context, component);
            if(component.style.background !== "transparent") {
                context.fillStyle = component.style.background;
                context.fill();
                context.closePath();
                if(component.style.selected) {
                    context.beginPath();
                    context.strokeStyle = "green";
                    context.lineWidth = 3;
                    drawContainer(context, component);
                    context.stroke();
                }
            }
            else {
                context.strokeStyle = component.style.selected ? "green" : "black";
                context.lineWidth = component.style.selected ? 3 : 1;
                context.stroke();
            }
        }
        else if(component.type === "text") {
            //create text for canvas
            
        }
        context.closePath();
    }
}

function drawContainer(context: CanvasRenderingContext2D, component: Component) {
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