package api;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class AddController {
    
    //requests sent to '/drag', and response is sent to all listeners of "movement/drag"
    @MessageMapping("/add/rectangle")
    @SendTo("/add/rectangle")
    public Rectangle rectangle(Rectangle rectangle) throws Exception
    {
        Rectangle newRectangle = new Rectangle(rectangle.getPositionX(), rectangle.getPositionY(), rectangle.getHeight(), rectangle.getWidth());
        return newRectangle;
    }

    @MessageMapping("/movement")
    @SendTo("/movement")
    public Movement movement(Movement movement) throws Exception
    {
        Movement newMovement = new Movement(movement.getShapeKey(), movement.getMovementX(), movement.getMovementY());
        
        System.out.println(newMovement.getShapeKey() + " " + newMovement.getMovementX() + " " + newMovement.getMovementY());

        return newMovement;
    }

    @MessageMapping("/resize")
    @SendTo("/resize")
    public Resize resize(Resize resize) throws Exception
    {
        Resize newResize = new Resize(resize.getShapeKey(), resize.getHeight(), resize.getWidth(), resize.getPositionX(), resize.getPositionY());
        return newResize;
    }
}