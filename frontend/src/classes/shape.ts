type Bounds = {topLeft: {x: number, y: number}, topRight: {x: number, y: number}, bottomLeft: {x: number, y: number}, bottomRight: {x: number, y: number}};
type ResizeBounds = {topLeftResize: Bounds, topRightResize: Bounds, bottomLeftResize: Bounds, bottomRightResize: Bounds};

export default class Shape {
    id: number;
    document_id: number;
    position_x: number;
    position_y: number;
    height: number;
    width: number;
    selected: boolean;

    public constructor(shapeId: number, documentId: number, positionX: number, positionY: number, height: number, width: number) {
        this.id = shapeId;
        this.document_id = documentId;
        this.position_x = positionX;
        this.position_y = positionY;
        this.height = height;
        this.width = width;
        this.selected = false;
    }

    public getShapeBounds(): Bounds {
        return {
            topLeft: {x: this.position_x, y: this.position_y},
            topRight: {x: this.position_x + this.width, y: this.position_y},
            bottomLeft: {x: this.position_x, y: this.position_y + this.height},
            bottomRight: {x: this.position_x + this.width, y: this.position_y + this.height}
        }
    }

    public getResizeBounds(): ResizeBounds {
        const shapeBounds = this.getShapeBounds();
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

    public withinShapeBounds(mouseX: number, mouseY: number): boolean {
        const bounds = this.getShapeBounds();
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

    private withinBounds(bounds: Bounds, mouseX: number, mouseY: number): boolean {
        return (bounds.topLeft.x <= mouseX && bounds.topLeft.y <= mouseY)
            ? (bounds.bottomRight.x >= mouseX && bounds.bottomRight.y >= mouseY)
            : false;
    }
}