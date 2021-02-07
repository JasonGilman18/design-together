package api;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class AddController {
    
    //requests sent to '/drag', and response is sent to all listeners of "movement/drag"
    @MessageMapping("/add/rectangle")
    @SendTo("/add/rectangle")
    public Rectangle rectangle(Rectangle newRectangle) throws Exception
    {
        return newRectangle;
    }
}