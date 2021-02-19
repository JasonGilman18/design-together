package api;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry)
    {
        //Register a STOMP over WebSocket endpoint at the given mapping path like http://localhost:8080/design-together
        stompEndpointRegistry.addEndpoint("/design-together").setAllowedOrigins("http://localhost:3000").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry)
    {
        //responses sent back to destinations prefixed with "/movement"
        //a prefix for the responses. client subscribes to 
        registry.enableSimpleBroker("/add");

        //prefix for the request routes
        registry.setApplicationDestinationPrefixes("/app");
    }
}
