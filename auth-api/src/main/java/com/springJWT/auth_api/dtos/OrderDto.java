package com.springJWT.auth_api.dtos;

import lombok.Data;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private String customerName;
    private String customerAddress;
    private List<ProductDto> products;
    private Double totalAmount;
}
