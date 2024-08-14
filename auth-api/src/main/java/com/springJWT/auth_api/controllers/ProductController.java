package com.springJWT.auth_api.controllers;

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
    public List<Product> getAllProducts() {
        System.out.println(productService.getAllProducts());
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);

        // Kafka'ya mesaj gönder
        kafkaMessageService.sendMessage("my-topic", savedProduct);

        return savedProduct;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);


    }
}
