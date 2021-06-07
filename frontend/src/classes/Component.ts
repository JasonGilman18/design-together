export default class Component {
    id: number;
    document_id: number;
    updateRequired: boolean;
    style: ComponentStyle;
    node: {
        parent: Component | null,
        children: Component[]
    };

    public constructor(componentId: number, documentId: number, parent: Component | null, positionX: number, 
        positionY: number, height: number, width: number, filled: boolean, rounded: number
    ) {
        this.id = componentId;
        this.document_id = documentId;
        this.updateRequired = true;
        this.node = {
            parent: parent,
            children: []
        };
        this.style = {
            position_x: positionX,
            position_y: positionY,
            height: height,
            width: width,
            filled: filled,
            rounded: rounded,
            selected: false,
            align_horizontal: "start",
            align_vertical: "start"
        };
    }

    public updatePositionX(position_x: number) {
        if(this.style.position_x !== position_x) {
            this.style.position_x = position_x;
            this.updateRequired = true;
        }
    }

    public updatePositionY(position_y: number) {
        if(this.style.position_y !== position_y) {
            this.style.position_y = position_y;
            this.updateRequired = true;
        }
    }

    public updateHeight(height: number) {
        if(this.style.height !== height) {
            this.style.height = height;
            this.updateRequired = true;
        }
    }

    public updateWidth(width: number) {
        if(this.style.width !== width) {
            this.style.width = width;
            this.updateRequired = true;
        }
    }

    public updateFilled(filled: boolean) {
        if(this.style.filled !== filled) {
            this.style.filled = filled;
            this.updateRequired = true;
        }
    }

    public updateRounded(rounded: number) {
        if(this.style.rounded !== rounded) {
            this.style.rounded = rounded;
            this.updateRequired = true;
        }
    }

    public updateAlignHorizontal(align_horizontal: string) {
        if(this.style.align_horizontal !== align_horizontal) {
            this.style.align_horizontal = align_horizontal;
            this.updateRequired = true;
        }
    }

    public updateAlignVertical(align_vertical: string) {
        if(this.style.align_vertical !== align_vertical) {
            this.style.align_vertical = align_vertical;
            this.updateRequired = true;
        }
    }

    public addChild(component: Component) {
        component.node.parent = this;
        this.node.children.push(component);
    }

    public removeChild(component: Component) {
        this.node.children.forEach((c, index) => {
            if(component.id == c.id) {
                this.node.children.splice(index);
            }
        });
    }

    public getComponentBounds(): Bounds {
        return {
            topLeft: {x: this.style.position_x, y: this.style.position_y},
            topRight: {x: this.style.position_x + this.style.width, y: this.style.position_y},
            bottomLeft: {x: this.style.position_x, y: this.style.position_y + this.style.height},
            bottomRight: {x: this.style.position_x + this.style.width, y: this.style.position_y + this.style.height}
        }
    }

    public getResizeBounds(): ResizeBounds {
        const shapeBounds = this.getComponentBounds();
        const radius = 5;
        return {
            topLeftResize: {
                topLeft: {x: shapeBounds.topLeft.x-radius, y: shapeBounds.topLeft.y-radius},
                topRight: {x: shapeBounds.topLeft.x+radius, y: shapeBounds.topLeft.y-radius},
                bottomLeft: {x: shapeBounds.topLeft.x-radius, y: shapeBounds.topLeft.y+radius},
                bottomRight: {x: shapeBounds.topLeft.x+radius, y: shapeBounds.topLeft.y+radius}
            },
            topRightResize: {
                topLeft: {x: shapeBounds.topRight.x-radius, y: shapeBounds.topRight.y-radius},
                topRight: {x: shapeBounds.topRight.x+radius, y: shapeBounds.topRight.y-radius},
                bottomLeft: {x: shapeBounds.topRight.x-radius, y: shapeBounds.topRight.y+radius},
                bottomRight: {x: shapeBounds.topRight.x+radius, y: shapeBounds.topRight.y+radius}
            },
            bottomLeftResize: {
                topLeft: {x: shapeBounds.bottomLeft.x-radius, y: shapeBounds.bottomLeft.y-radius},
                topRight: {x: shapeBounds.bottomLeft.x+radius, y: shapeBounds.bottomLeft.y-radius},
                bottomLeft: {x: shapeBounds.bottomLeft.x-radius, y: shapeBounds.bottomLeft.y+radius},
                bottomRight: {x: shapeBounds.bottomLeft.x+radius, y: shapeBounds.bottomLeft.y+radius}
            },
            bottomRightResize: {
                topLeft: {x: shapeBounds.bottomRight.x-radius, y: shapeBounds.bottomRight.y-radius},
                topRight: {x: shapeBounds.bottomRight.x+radius, y: shapeBounds.bottomRight.y-radius},
                bottomLeft: {x: shapeBounds.bottomRight.x-radius, y: shapeBounds.bottomRight.y+radius},
                bottomRight: {x: shapeBounds.bottomRight.x+radius, y: shapeBounds.bottomRight.y+radius}
            }
        };
    }

    public withinComponentBounds(mouseX: number, mouseY: number): boolean {
        const bounds = this.getComponentBounds();
        return this.withinBounds(bounds, mouseX, mouseY);
    }

    public withinResizeBounds(mouseX: number, mouseY: number): string {
        const resizeBounds = this.getResizeBounds();
        return this.withinBounds(resizeBounds.topLeftResize, mouseX, mouseY)
            ? "topLeft"
            : this.withinBounds(resizeBounds.topRightResize, mouseX, mouseY)
            ? "topRight"
            : this.withinBounds(resizeBounds.bottomLeftResize, mouseX, mouseY)
            ? "bottomLeft"
            : this.withinBounds(resizeBounds.bottomRightResize, mouseX, mouseY)
            ? "bottomRight"
            : "";
    }

    public overlapping(component: Component): boolean {
        const thisBounds = this.getComponentBounds();
        const bounds = component.getComponentBounds();
        const colOverlap = !(thisBounds.topLeft.x > bounds.bottomRight.x || thisBounds.bottomRight.x < bounds.topLeft.x);
        const rowOverlap = !(thisBounds.topLeft.y > bounds.bottomRight.y || thisBounds.bottomRight.y < bounds.topLeft.y);
        return colOverlap || rowOverlap;
    }

    private withinBounds(bounds: Bounds, mouseX: number, mouseY: number): boolean {
        return (bounds.topLeft.x <= mouseX && bounds.topLeft.y <= mouseY)
            ? (bounds.bottomRight.x >= mouseX && bounds.bottomRight.y >= mouseY)
            : false;
    }
}

type Bounds = {
    topLeft: {x: number, y: number}, 
    topRight: {x: number, y: number}, 
    bottomLeft: {x: number, y: number}, 
    bottomRight: {x: number, y: number}
};
type ResizeBounds = {
    topLeftResize: Bounds, 
    topRightResize: Bounds, 
    bottomLeftResize: Bounds, 
    bottomRightResize: Bounds
};
type ComponentStyle = {
    position_x: number,
    position_y: number,
    height: number,
    width: number,
    filled: boolean,
    rounded: number,
    selected: boolean,
    align_horizontal: string,
    align_vertical: string
}