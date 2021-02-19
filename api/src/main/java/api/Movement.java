package api;

public class Movement {

    private int shapeKey;
    private int movementX;
    private int movementY;

    public Movement(){}

    public Movement(int shapeKey, int movementX, int movementY)
    {
        this.shapeKey = shapeKey;
        this.movementX = movementX;
        this.movementY = movementY;
    }

    public int getShapeKey(){ return shapeKey; }

    public int getMovementX(){ return movementX; }

    public int getMovementY(){ return movementY; }
}
