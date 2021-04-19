export default class Shape
{
    shapeKey: number;
    positionX: number;
    positionY: number;
    height: number;
    width: number;

    constructor(shapeKey: number, positionX: number, positionY: number, height: number, width: number)
    {
        this.shapeKey = shapeKey;
        this.positionX = positionX;
        this.positionY = positionY;
        this.height = height;
        this.width = width;
    }
}