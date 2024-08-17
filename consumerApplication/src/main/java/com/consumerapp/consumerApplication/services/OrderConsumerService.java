package com.consumerapp.consumerApplication.services;

import com.consumerapp.consumerApplication.dtos.OrderDto;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumerService {

    @KafkaListener(topics = "my-topic", groupId = "order-group")
    public void consume(OrderDto orderDto) {
        System.out.println("Received Order: " + orderDto);
        // Process the orderDto as needed, like saving to the database or other business logic
    }
}
