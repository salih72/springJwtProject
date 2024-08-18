package com.consumerapp.consumerApplication.services;


import com.consumerapp.consumerApplication.dtos.OrderDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderSynchronizer {

    @Autowired
    private WebSocketServer simpleSocketServer;

    @KafkaListener(topics = "my-topic", groupId = "order-group")
    public void consume(OrderDto orderDto) {
        System.out.println("Received Order: " + orderDto);
        // Forward the orderDto to the socket server clients
        //dto to json
        String json;

        try {
            json = new ObjectMapper().writeValueAsString(orderDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return;
        }

        simpleSocketServer.publishMessageToAllClients(json);
    }
}