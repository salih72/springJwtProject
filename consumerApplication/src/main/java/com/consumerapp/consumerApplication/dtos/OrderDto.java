package com.consumerapp.consumerApplication.dtos;
import lombok.Data;

import java.util.List;


@Data
public class OrderDto {
    private Long id;
    private String customerName;
    private String customerAddress;
    private Double totalAmount;
    private List<ProductDto> products;
}

