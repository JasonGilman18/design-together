package api;

public class Resize {
    
    private int shapeKey;
    private double height;
    private double width;
    private double positionX;
    private double positionY;

    public Resize(){}

    public Resize(int shapeKey, double height, double width, double positionX, double positionY)
    {
        this.shapeKey = shapeKey;
        this.height = height;
        this.width = width;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    public int getShapeKey(){return shapeKey;}

    public double getHeight(){return height;}

    public double getWidth(){return width;}

    public double getPositionX(){return positionX;}

    public double getPositionY(){return positionY;}
}
