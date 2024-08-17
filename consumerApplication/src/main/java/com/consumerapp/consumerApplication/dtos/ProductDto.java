package com.consumerapp.consumerApplication.dtos;


import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private Double price;

    // Getters and Setters

    // Optionally, you can add constructors and toString method for easier logging and testing
}
