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
        Rectangle newRectangle = new Rectangle(rectangle.getPositionX(), rectangle.getPositionY());
        return newRectangle;
    }

    @MessageMapping("/add/drag")
    @SendTo("/add/drag")
    public Movement movement(Movement movement) throws Exception
    {
        Movement newMovement = new Movement(movement.getShapeKey(), movement.getMovementX(), movement.getMovementY());
        return newMovement;
    }
}