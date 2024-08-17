package com.springJWT.auth_api.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private Double price;
    private String image;
}
