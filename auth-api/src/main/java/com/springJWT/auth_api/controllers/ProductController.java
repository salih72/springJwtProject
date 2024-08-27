package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.dtos.ProductDto;
import com.springJWT.auth_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/save")
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
