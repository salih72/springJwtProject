package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.dtos.OrderDto;
import com.springJWT.auth_api.entities.Order;
import com.springJWT.auth_api.entities.User;
import com.springJWT.auth_api.services.OrderService;
import com.springJWT.auth_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<OrderDto> getAllOrders() {
        return orderService.getAllOrders().stream().map(orderService::convertToDto).collect(Collectors.toList());
    }

    @PostMapping
    public OrderDto createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        order.setCustomerName(user.getFullName());
        Order savedOrder = orderService.saveOrder(order);
        return orderService.convertToDto(savedOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }

    @GetMapping("/get/{id}")
    public OrderDto getOrderByUserId(@PathVariable int id) {
        Order order = orderService.getOrderByUserId(id);
        return orderService.convertToDto(order);
    }
}
