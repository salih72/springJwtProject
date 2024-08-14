package com.springJWT.auth_api.services;

import com.springJWT.auth_api.entities.Order;
import com.springJWT.auth_api.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public Order getOrderByUserId(int id) {
        return orderRepository.findOrderByUserId(id).get();
    }
}
