package api;

public class Rectangle {
    
    private int shapeKey;
    private double positionX;
    private double positionY;

    public Rectangle(){}

    public Rectangle(int shapeKey, double positionX, double positionY)
    {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    public int getShapeKey(){return shapeKey;}

    public double getPositionX(){return positionX;}

    public double getPositionY(){return positionY;}
}