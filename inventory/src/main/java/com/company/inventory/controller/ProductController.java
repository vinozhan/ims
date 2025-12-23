package com.company.inventory.controller;

import com.company.inventory.dto.ProductRequestDTO;
import com.company.inventory.dto.ProductResponseDTO;
import com.company.inventory.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','CASHIER')")
    @GetMapping
    public List<ProductResponseDTO> getProducts() {
        return productService.getAllProducts();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ProductResponseDTO createProduct(
            @RequestBody @Valid ProductRequestDTO request) {
        return productService.createProduct(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid ProductRequestDTO request) {

        return productService.updateProduct(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

}
