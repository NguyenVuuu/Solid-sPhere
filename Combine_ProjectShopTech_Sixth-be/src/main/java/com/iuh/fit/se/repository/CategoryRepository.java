package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    boolean existsByName(String name);
    
    List<Category> findBySupplierName(String supplierName);
    
    @Query("SELECT c FROM Category c WHERE c.name LIKE %?1% OR c.description LIKE %?1%")
    List<Category> searchByName(String name);
    
    // Count products in category
    @Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :categoryId")
    Long countProductsInCategory(@Param("categoryId") Long categoryId);
    
    // Find categories with products
    @Query("SELECT DISTINCT c FROM Category c JOIN c.products p WHERE p.status = 'ACTIVE'")
    List<Category> findCategoriesWithActiveProducts();
    
    // Find categories without products
    @Query("SELECT c FROM Category c WHERE c.products IS EMPTY")
    List<Category> findEmptyCategories();
    
    // Find popular categories (by product sales)
    @Query("SELECT c FROM Category c JOIN c.products p JOIN p.orderDetails od " +
           "GROUP BY c.id ORDER BY SUM(od.amount) DESC")
    List<Category> findPopularCategories();
    
    // Get category revenue
    @Query("SELECT SUM(od.unitPrice * od.amount) FROM Category c " +
           "JOIN c.products p JOIN p.orderDetails od JOIN od.order o " +
           "WHERE c.id = :categoryId AND o.status = 'DELIVERED'")
    Double getCategoryRevenue(@Param("categoryId") Long categoryId);
    
    // Find categories with product count
    @Query("SELECT c.id, c.name, COUNT(p) FROM Category c LEFT JOIN c.products p " +
           "GROUP BY c.id, c.name ORDER BY COUNT(p) DESC")
    List<Object[]> findCategoriesWithProductCount();
    
    // Find categories with minimum products
    @Query("SELECT c FROM Category c WHERE SIZE(c.products) >= :minCount")
    List<Category> findCategoriesWithMinProducts(@Param("minCount") Integer minCount);
}
