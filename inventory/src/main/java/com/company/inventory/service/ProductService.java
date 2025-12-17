package com.company.inventory.service;

import com.company.inventory.dto.ProductRequestDTO;
import com.company.inventory.dto.ProductResponseDTO;

import java.util.List;

public interface ProductService {

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO createProduct(ProductRequestDTO request);
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO request);

    void deleteProduct(Long id);

}
