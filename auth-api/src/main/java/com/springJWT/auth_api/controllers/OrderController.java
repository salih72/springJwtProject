package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.dtos.OrderDto;
import com.springJWT.auth_api.services.KafkaMessageService;
import com.springJWT.auth_api.services.OrderService;
import com.springJWT.auth_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private KafkaMessageService kafkaMessageService;

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping("/save")
    public ResponseEntity<OrderDto> saveOrder(@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.saveOrder(orderDto));
    }


    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable int id) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(id));
    }

    @GetMapping("/last20")
    public List<OrderDto> getLast20Orders() {
        List<OrderDto> last20Orders = orderService.getLast20Orders();
        return last20Orders;
    }

    @PutMapping("/updateStatus/{userId}/{id}")
    public ResponseEntity<Void> toggleOrderStatus(@PathVariable int userId, @PathVariable long id) {
        orderService.toggleOrderStatus(userId,id);
        return ResponseEntity.ok().build();
    }
}
