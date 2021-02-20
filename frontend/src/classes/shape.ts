class Shape
{
    shapeKey: number;
    positionX: number;
    positionY: number;

    constructor(shapeKey: number, positionX: number, positionY: number)
    {
        this.shapeKey = shapeKey;
        this.positionX = positionX;
        this.positionY = positionY;
    }
}

export default Shape;