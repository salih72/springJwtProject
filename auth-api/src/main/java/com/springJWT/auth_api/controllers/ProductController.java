package com.springJWT.auth_api.controllers;

import com.springJWT.auth_api.dtos.ProductDto;
import com.springJWT.auth_api.entities.Product;
import com.springJWT.auth_api.services.KafkaMessageService;
import com.springJWT.auth_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto) {

        // DTO'yu entity'e dönüştür
        Optional<Product> product = productService.getProductById(productDto.getId());
        //toDo product null ise hata bas
        // ön yüze 404 hata kodu dön.
        //if
        // Entity'i kaydet
        ProductDto savedProductDto = productService.saveProduct(product.orElse(null));

        // Kafka'ya mesaj gönder
        return savedProductDto; //toDo product save consumer'da yapılacak
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
