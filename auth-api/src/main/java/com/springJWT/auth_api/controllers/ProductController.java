package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.dtos.ProductDto;
import com.springJWT.auth_api.entities.Product;
import com.springJWT.auth_api.services.KafkaMessageService;
import com.springJWT.auth_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private KafkaMessageService kafkaMessageService;

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        // DTO'yu entity'e dönüştür
        Product product = productService.convertToEntity(productDto);

        // Entity'i kaydet
        ProductDto savedProductDto = productService.saveProduct(product);

        // Kafka'ya mesaj gönder
        kafkaMessageService.sendMessage("my-topic", savedProductDto);

        return savedProductDto;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
