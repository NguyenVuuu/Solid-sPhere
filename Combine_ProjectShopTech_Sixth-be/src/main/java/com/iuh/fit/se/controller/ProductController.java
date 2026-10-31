package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.ProductDTO;
import com.iuh.fit.se.domain.enums.ProductStatus;
import com.iuh.fit.se.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {
    
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO createdProduct = productService.createProduct(productDTO);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProductDTO>> getProductsByStatus(@PathVariable ProductStatus status) {
        List<ProductDTO> products = productService.getProductsByStatus(status);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDTO> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProductsByName(@RequestParam String name) {
        List<ProductDTO> products = productService.searchProductsByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<ProductDTO>> getProductsByPriceRange(
            @RequestParam Double minPrice, 
            @RequestParam Double maxPrice) {
        List<ProductDTO> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ProductDTO>> getAvailableProducts() {
        List<ProductDTO> products = productService.getAvailableProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<ProductDTO>> getOutOfStockProducts() {
        List<ProductDTO> products = productService.getOutOfStockProducts();
        return ResponseEntity.ok(products);
    }

    @PatchMapping("/{productId}/quantity")
    public ResponseEntity<Void> updateProductQuantity(@PathVariable Long productId, @RequestParam Long quantity) {
        productService.updateProductQuantity(productId, quantity);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/advanced-search")
    public ResponseEntity<List<ProductDTO>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) ProductStatus status,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<ProductDTO> products = productService.searchProducts(name, categoryId, status, minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductDTO>> getLowStockProducts(@RequestParam(defaultValue = "10") Long threshold) {
        List<ProductDTO> products = productService.getLowStockProducts(threshold);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/top-selling")
    public ResponseEntity<List<Object[]>> getTopSellingProducts(@RequestParam(defaultValue = "10") int limit) {
        List<Object[]> topProducts = productService.getTopSellingProducts(
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(topProducts);
    }

    @GetMapping("/with-discount")
    public ResponseEntity<List<ProductDTO>> getProductsWithDiscount() {
        List<ProductDTO> products = productService.getProductsWithDiscount();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/by-name-and-category")
    public ResponseEntity<List<ProductDTO>> findByNameAndCategory(
            @RequestParam String name,
            @RequestParam Long categoryId) {
        List<ProductDTO> products = productService.findByNameAndCategory(name, categoryId);
        return ResponseEntity.ok(products);
    }
}
