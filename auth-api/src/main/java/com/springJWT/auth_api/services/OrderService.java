package com.springJWT.auth_api.services;

import com.springJWT.auth_api.dtos.OrderDto;
import com.springJWT.auth_api.dtos.ProductDto;
import com.springJWT.auth_api.entities.Order;
import com.springJWT.auth_api.entities.Product;
import com.springJWT.auth_api.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        return orderRepository.findOrderByUserId(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Order to OrderDto conversion
    public OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerAddress(order.getCustomerAddress());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setProducts(order.getProducts().stream().map(this::convertToProductDto).collect(Collectors.toList()));
        return dto;
    }

    private ProductDto convertToProductDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        return dto;
    }
}
