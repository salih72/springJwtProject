package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.controllers.models.Status;
import com.springJWT.auth_api.dtos.OrderDto;
import com.springJWT.auth_api.entities.Order;
import com.springJWT.auth_api.entities.User;
import com.springJWT.auth_api.services.KafkaMessageService;
import com.springJWT.auth_api.services.OrderService;
import com.springJWT.auth_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    //toDo önyüzden istek gelince status default olarak 1 olacak
    //toDo statusler enum olarak tanımlanacak
    //toDo 1 = pending, 2 = failed, 3 = success
    //CreateOrder metodu tetiklendiğinde orderın statusunu 1 olarak db'ye kayıt et
    //kayıt ettiğin kaydı kafka ile produce et
    //
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private KafkaMessageService kafkaMessageService;

    @GetMapping
    public List<OrderDto> getAllOrders() {
        return orderService.getAllOrders().stream().map(orderService::convertToDto).collect(Collectors.toList());
    }

    @PostMapping
    public OrderDto createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if there is a pending order for the user
        List<Order> pendingOrders = orderService.getAllOrders().stream()
                .filter(o -> o.getUser().getId().equals(user.getId()) && o.getStatus() == Status.PENDING)
                .collect(Collectors.toList());

        if (!pendingOrders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is an active pending order.");
        }

        order.setUser(user);
        order.setCustomerName(user.getFullName());
        order.setStatus(Status.PENDING); // Set the status to pending
        Order savedOrder = orderService.saveOrder(order);

        // Send the saved order as a message to the Kafka topic
        kafkaMessageService.sendMessage("my-topic", orderService.convertToDto(savedOrder));

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
        //Alttaki if consumer a yazılacak
        /* Random random = new Random(10);
        int i = random.nextInt();
        if (
                i == 1 //toDo ise failed
        ) {

        }
        */


}
