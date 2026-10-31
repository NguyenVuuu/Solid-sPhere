package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.ProductDTO;
import com.iuh.fit.se.domain.entity.Category;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.enums.ProductStatus;
import com.iuh.fit.se.repository.CategoryRepository;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setUnitPrice(productDTO.getUnitPrice());
        product.setImageUrl(productDTO.getImageUrl());
        product.setQuantity(productDTO.getQuantity());
        product.setPercentage(productDTO.getPercentage());
        product.setStatus(productDTO.getStatus());
        
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        
        Product updatedProduct = productRepository.save(product);
        return convertToDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAllProductDTOs();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByStatus(ProductStatus status) {
        return productRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> searchProductsByName(String name) {
        return productRepository.searchByName(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceRange(minPrice, maxPrice).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAvailableProducts() {
        return productRepository.findAvailableProducts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getOutOfStockProducts() {
        return productRepository.findOutOfStockProducts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateProductQuantity(Long productId, Long quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setQuantity(quantity);
        productRepository.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> searchProducts(String name, Long categoryId, ProductStatus status, Double minPrice, Double maxPrice) {
        return productRepository.searchProducts(name, categoryId, status, minPrice, maxPrice).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getLowStockProducts(Long threshold) {
        return productRepository.findLowStockProducts(threshold).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getTopSellingProducts(org.springframework.data.domain.Pageable pageable) {
        return productRepository.findTopSellingProducts(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsWithDiscount() {
        return productRepository.findProductsWithDiscount().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> findByNameAndCategory(String name, Long categoryId) {
        return productRepository.findByNameAndCategory(name, categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setUnitPrice(product.getUnitPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setQuantity(product.getQuantity());
        dto.setPercentage(product.getPercentage());
        dto.setStatus(product.getStatus());
        
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
        }
        
        return dto;
    }

    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setUnitPrice(dto.getUnitPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setQuantity(dto.getQuantity());
        product.setPercentage(dto.getPercentage());
        product.setStatus(dto.getStatus());
        
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        
        return product;
    }
}
