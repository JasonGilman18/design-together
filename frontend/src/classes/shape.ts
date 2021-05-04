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

    public getBounds(): {topLeft: {x: number, y: number}, topRight: {x: number, y: number}, bottomLeft: {x: number, y: number}, bottomRight: {x: number, y: number}} {
        return {
            topLeft: {x: this.position_x, y: this.position_y},
            topRight: {x: this.position_x + this.width, y: this.position_y},
            bottomLeft: {x: this.position_x, y: this.position_y + this.height},
            bottomRight: {x: this.position_x + this.width, y: this.position_y + this.height}
        }
    }

    public withinBounds(mouseX: number, mouseY: number): boolean {
        const bounds = this.getBounds();
        return (bounds.topLeft.x <= mouseX && bounds.topLeft.y <= mouseY)
            ? (bounds.bottomRight.x >= mouseX && bounds.bottomRight.y >= mouseY)
            : false;
    }
}