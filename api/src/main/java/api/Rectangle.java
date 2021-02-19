package api;

public class Rectangle {
    
    private static int key = 0;
    private int shapeKey;
    private double positionX;
    private double positionY;

    public Rectangle(){}

    public Rectangle(double positionX, double positionY)
    {
        this.shapeKey = key;
        this.positionX = positionX;
        this.positionY = positionY;

        key++;
    }

    public int getShapeKey(){return shapeKey;}

    public double getPositionX(){return positionX;}

    public double getPositionY(){return positionY;}
}