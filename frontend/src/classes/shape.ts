export default class Shape
{
    id: number;
    document_id: number;
    position_x: number;
    position_y: number;
    height: number;
    width: number;

    constructor(shapeId: number, documentId: number, positionX: number, positionY: number, height: number, width: number)
    {
        this.id = shapeId;
        this.document_id = documentId;
        this.position_x = positionX;
        this.position_y = positionY;
        this.height = height;
        this.width = width;
    }
}