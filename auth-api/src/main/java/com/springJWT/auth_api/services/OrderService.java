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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

        if (orderRepository.existsByUserId(userId)) {
            for (Order existingOrder : orderRepository.findByUserId(userId)) {
                if (existingOrder.getStatus() == Status.PENDING) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is an active pending order.");
                }
            }
        }

        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        );

        List<Product> products = orderDto.getProducts().stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());

        double totalAmount = products.stream()
                .mapToDouble(Product::getPrice)
                .sum();

        Order order = Order.builder()
                .user(user)
                .customerName(user.getFullName())
                .products(products)
                .totalAmount(orderDto.getTotalAmount())
                .status(Status.PENDING)
                .build();
        //.customerAddress(user.getCustomerAddress())

        Order savedOrder = orderRepository.save(order);

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

    public OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setUserId(order.getUser().getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        //dto.setCustomerAddress(order.getCustomerAddress());

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

    @Transactional
    public void toggleOrderStatus(int userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        for (Order order : orders) {
            if (order.getStatus() == Status.PENDING) {
                order.setStatus(Status.SUCCESS);
            } else if (order.getStatus() == Status.SUCCESS) {
                order.setStatus(Status.PENDING);
            }
        }

        orderRepository.saveAll(orders);
    }



}
