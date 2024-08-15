package com.springJWT.auth_api.services;

import com.springJWT.auth_api.dtos.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaMessageService {

    @Autowired
    private KafkaTemplate<String, OrderDto> kafkaTemplate;

    public void sendMessage(String topic, OrderDto orderDto) {
        kafkaTemplate.send(topic, orderDto);
    }
}

