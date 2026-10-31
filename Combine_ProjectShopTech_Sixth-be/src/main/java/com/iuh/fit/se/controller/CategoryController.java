package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.CategoryDTO;
import com.iuh.fit.se.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {
    
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO createdCategory = categoryService.createCategory(categoryDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updatedCategory = categoryService.updateCategory(id, categoryDTO);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        CategoryDTO category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/supplier/{supplierName}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesBySupplier(@PathVariable String supplierName) {
        List<CategoryDTO> categories = categoryService.getCategoriesBySupplier(supplierName);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CategoryDTO>> searchCategoriesByName(@RequestParam String name) {
        List<CategoryDTO> categories = categoryService.searchCategoriesByName(name);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByName(@RequestParam String name) {
        boolean exists = categoryService.existsByName(name);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/with-product-count")
    public ResponseEntity<List<Object[]>> getCategoriesWithProductCount() {
        List<Object[]> categories = categoryService.getCategoriesWithProductCount();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/min-products")
    public ResponseEntity<List<CategoryDTO>> getCategoriesWithMinProducts(@RequestParam Integer minCount) {
        List<CategoryDTO> categories = categoryService.getCategoriesWithMinProducts(minCount);
        return ResponseEntity.ok(categories);
    }
}
