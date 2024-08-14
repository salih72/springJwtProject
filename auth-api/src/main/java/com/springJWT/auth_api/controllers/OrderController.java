package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.entities.Order;
import com.springJWT.auth_api.entities.User;
import com.springJWT.auth_api.services.OrderService;
import com.springJWT.auth_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        // Kullanıcının email adresini UserDetails üzerinden alıyoruz
        String email = userDetails.getUsername();

        // UserService üzerinden kullanıcıyı buluyoruz
        User user = userService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Kullanıcıyı ve adını siparişe ekliyoruz
        order.setUser(user);
        order.setCustomerName(user.getFullName());

        // Siparişi veritabanına kaydediyoruz
        return orderService.saveOrder(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }

    @GetMapping("/get/{id}")
    public Order getOrderByUserId(int id) {
        return orderService.getOrderByUserId(id);
    }
}
