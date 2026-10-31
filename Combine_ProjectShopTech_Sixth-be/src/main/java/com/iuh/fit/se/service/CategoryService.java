package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);
    void deleteCategory(Long id);
    CategoryDTO getCategoryById(Long id);
    List<CategoryDTO> getAllCategories();
    List<CategoryDTO> getCategoriesBySupplier(String supplierName);
    List<CategoryDTO> searchCategoriesByName(String name);
    
    // Advanced methods
    boolean existsByName(String name);
    List<Object[]> getCategoriesWithProductCount();
    List<CategoryDTO> getCategoriesWithMinProducts(Integer minCount);
}
