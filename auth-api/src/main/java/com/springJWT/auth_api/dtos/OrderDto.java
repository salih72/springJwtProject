package com.springJWT.auth_api.dtos;

import com.springJWT.auth_api.controllers.models.Status;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private int userId;
    private String customerName;
    private Double totalAmount;
    private Status status;
    //private String customerAddress;
    private List<ProductDto> products;

}
