package com.springJWT.auth_api.services;

import com.springJWT.auth_api.controllers.models.Status;
import com.springJWT.auth_api.dtos.OrderDto;
import com.springJWT.auth_api.dtos.ProductDto;
import com.springJWT.auth_api.entities.Order;
import com.springJWT.auth_api.entities.Product;
import com.springJWT.auth_api.entities.User;
import com.springJWT.auth_api.repositories.OrderRepository;
import com.springJWT.auth_api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductService productService;

    private final UserRepository userRepository;

    private final UserService userService;

    private final KafkaMessageService kafkaMessageService;

    public List<OrderDto> getAllOrders() {
        List<OrderDto> orderDtos = new ArrayList<>();

        for(Order order : orderRepository.findAll()){
            orderDtos.add(convertToDto(order));
        }

        return orderDtos;
    }

    public OrderDto saveOrder(OrderDto orderDto) {
        int userId = orderDto.getUserId();

        // Check if the user has a pending order
        if (orderRepository.existsByUserId(userId)) {
            for (Order existingOrder : orderRepository.findByUserId(userId)) {
                if (existingOrder.getStatus() == Status.PENDING) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is an active pending order.");
                }
            }
        }

        // Fetch user from the repository
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        );




        // Convert ProductDto list to Product entities
        List<Product> products = orderDto.getProducts().stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());

        // Calculate the total amount for the order
        double totalAmount = products.stream()
                .mapToDouble(Product::getPrice)
                .sum();

        // Set up and save the new order
        Order order = Order.builder()
                .user(user)
                .customerName(user.getFullName())
                .products(products)
                .totalAmount(orderDto.getTotalAmount())
                .status(Status.PENDING)
                .build();

        Order savedOrder = orderRepository.save(order);

        // Convert saved order to DTO and send it to Kafka
        OrderDto currentOrderDto = convertToDto(savedOrder);
        kafkaMessageService.sendMessage("my-topic", currentOrderDto);

        return currentOrderDto;
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public List<OrderDto> getOrdersByUserId(int id) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for(Order order : orderRepository.findByUserId(id)){
            orderDtos.add(convertToDto(order));
        }
        return orderDtos;
    }

    // Order to OrderDto conversion
    public OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setUserId(order.getUser().getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setTotalAmount(order.getTotalAmount());

        List<ProductDto> productDtos = new ArrayList<>();
        for(Product product : order.getProducts()){
            ProductDto productDto = convertToProductDto(product);
            productDtos.add(productDto);
        }

        dto.setProducts(productDtos);

        return dto;
    }

    private ProductDto convertToProductDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        return dto;
    }

    private Product convertToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        // EKSIK YER OLABİLİR....
        product.setPrice(productDto.getPrice());
        return product;
    }


    public List<OrderDto> getLast20Orders() {
        List<Order> last20Orders = orderRepository.findLast20Orders();
        return last20Orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
