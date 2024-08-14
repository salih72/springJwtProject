package com.springJWT.auth_api.services;

import com.springJWT.auth_api.dtos.ProductDto;
import com.springJWT.auth_api.entities.Product;
import com.springJWT.auth_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ProductDto saveProduct(Product product) {
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    public ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImage(product.getImage()); // Image alanını ekledik
        return dto;
    }

    public Product convertToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setImage(productDto.getImage()); // Image alanını ekledik
        return product;
    }
}
