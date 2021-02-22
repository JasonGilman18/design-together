package api;

public class Movement {

    private int shapeKey;
    private double movementX;
    private double movementY;

    public Movement(){}

    public Movement(int shapeKey, double movementX, double movementY)
    {
        this.shapeKey = shapeKey;
        this.movementX = movementX;
        this.movementY = movementY;
    }

    public int getShapeKey(){ return shapeKey; }

    public double getMovementX(){ return movementX; }

    public double getMovementY(){ return movementY; }
}
