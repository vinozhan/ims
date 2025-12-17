package com.company.inventory.service.impl;

import com.company.inventory.dto.ProductRequestDTO;
import com.company.inventory.dto.ProductResponseDTO;
import com.company.inventory.entity.Product;
import com.company.inventory.exception.ResourceNotFoundException;
import com.company.inventory.repository.ProductRepository;
import com.company.inventory.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

        private final ProductRepository productRepository;

        public ProductServiceImpl(ProductRepository productRepository) {
                this.productRepository = productRepository;
        }

        @Override
        public List<ProductResponseDTO> getAllProducts() {
                return productRepository.findAll()
                                .stream()
                                .map(product -> new ProductResponseDTO(
                                                product.getId(),
                                                product.getName(),
                                                product.getQuantity(),
                                                product.getPrice()))
                                .toList();
        }

        @Override
        public ProductResponseDTO createProduct(ProductRequestDTO request) {

                Product product = new Product();
                product.setName(request.getName());
                product.setQuantity(request.getQuantity());
                product.setPrice(request.getPrice());

                Product savedProduct = productRepository.save(product);

                return new ProductResponseDTO(
                                savedProduct.getId(),
                                savedProduct.getName(),
                                savedProduct.getQuantity(),
                                savedProduct.getPrice());
        }

        @Override
        public ProductResponseDTO updateProduct(Long id, ProductRequestDTO request) {

                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

                product.setName(request.getName());
                product.setQuantity(request.getQuantity());
                product.setPrice(request.getPrice());

                Product updated = productRepository.save(product);

                return new ProductResponseDTO(
                                updated.getId(),
                                updated.getName(),
                                updated.getQuantity(),
                                updated.getPrice());
        }

        @Override
        public void deleteProduct(Long id) {

                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

                productRepository.delete(product);
        }

}
