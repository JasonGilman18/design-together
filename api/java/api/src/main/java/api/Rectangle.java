package api;

public class Rectangle {
    
    private static int key = 0;
    private int shapeKey;
    private double positionX;
    private double positionY;
    private double height;
    private double width;

    public Rectangle(){}

    public Rectangle(double positionX, double positionY, double height, double width)
    {
        this.shapeKey = key;
        this.positionX = positionX;
        this.positionY = positionY;
        this.height = height;
        this.width = width;

        key++;
    }

    public int getShapeKey(){return shapeKey;}

    public double getPositionX(){return positionX;}

    public double getPositionY(){return positionY;}

    public double getHeight(){return height;}

    public double getWidth(){return width;}
}