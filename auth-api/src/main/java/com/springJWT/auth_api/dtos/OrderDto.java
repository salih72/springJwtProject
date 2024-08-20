package com.springJWT.auth_api.dtos;

import com.springJWT.auth_api.controllers.models.Status;
import lombok.Data;
import java.util.List;

@Data
public class OrderDto {
    private int userId;
    private String customerName;
    private List<ProductDto> products;
    private Double totalAmount;
    private Status status;
}
