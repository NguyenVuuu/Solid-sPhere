package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.ProductDTO;
import com.iuh.fit.se.domain.enums.ProductStatus;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
    ProductDTO getProductById(Long id);
    List<ProductDTO> getAllProducts();
    List<ProductDTO> getProductsByStatus(ProductStatus status);
    List<ProductDTO> getProductsByCategory(Long categoryId);
    List<ProductDTO> searchProductsByName(String name);
    List<ProductDTO> getProductsByPriceRange(Double minPrice, Double maxPrice);
    List<ProductDTO> getAvailableProducts();
    List<ProductDTO> getOutOfStockProducts();
    void updateProductQuantity(Long productId, Long quantity);
    
    // Advanced search and filter methods
    List<ProductDTO> searchProducts(String name, Long categoryId, ProductStatus status, Double minPrice, Double maxPrice);
    List<ProductDTO> getLowStockProducts(Long threshold);
    List<Object[]> getTopSellingProducts(Pageable pageable);
    List<ProductDTO> getProductsWithDiscount();
    List<ProductDTO> findByNameAndCategory(String name, Long categoryId);
}
