package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.dto.ProductDTO;
import com.iuh.fit.se.domain.enums.ProductStatus;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,JpaSpecificationExecutor<Product> {
    @Query("SELECT new com.iuh.fit.se.domain.dto.ProductDTO(p.id, p.name, p.description, p.unitPrice, p.imageUrl, p.quantity, p.percentage, p.status) FROM Product p")
    List<ProductDTO> findAllProductDTOs();

    List<Product> findByStatus(ProductStatus status);
    List<Product> findByCategoryId(Long categoryId);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1% OR p.description LIKE %?1%")
    List<Product> searchByName(String name);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.unitPrice BETWEEN ?1 AND ?2")
    List<Product> findByPriceRange(Double minPrice, Double maxPrice);
    
    @Query("SELECT p FROM Product p WHERE p.unitPrice BETWEEN :minPrice AND :maxPrice AND p.status = :status")
    Page<Product> findByPriceRangeAndStatus(@Param("minPrice") Double minPrice, 
                                             @Param("maxPrice") Double maxPrice,
                                             @Param("status") ProductStatus status,
                                             Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.quantity > 0 AND p.status = 'ACTIVE'")
    List<Product> findAvailableProducts();
    
    @Query("SELECT p FROM Product p WHERE p.quantity > 0 AND p.status = 'ACTIVE'")
    Page<Product> findAvailableProducts(Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.quantity = 0 OR p.quantity IS NULL")
    List<Product> findOutOfStockProducts();
    
    @Query("SELECT p FROM Product p WHERE p.quantity <= :threshold AND p.quantity > 0")
    List<Product> findLowStockProducts(@Param("threshold") Long threshold);
    
    // Best selling products
    @Query("SELECT p FROM Product p JOIN p.orderDetails od " +
           "GROUP BY p.id ORDER BY SUM(od.amount) DESC")
    List<Product> findBestSellingProducts(Pageable pageable);
    @Query("SELECT c.id, c.name, COUNT(p) " +
            "FROM Product p JOIN p.category c " +
            "GROUP BY c.id, c.name " +
            "ORDER BY c.name")
    List<Object[]> countByCategory();
    // New arrivals (assuming products are added chronologically)
    @Query("SELECT p FROM Product p WHERE p.status = 'ACTIVE' ORDER BY p.id DESC")
    List<Product> findNewArrivals(Pageable pageable);
    
    // Products with discount
    @Query("SELECT p FROM Product p WHERE p.discount IS NOT NULL AND p.discount.discountStatus = true")
    List<Product> findProductsWithActiveDiscount();
    
    @Query("SELECT p FROM Product p WHERE p.discount IS NOT NULL AND p.discount.discountStatus = true")
    Page<Product> findProductsWithActiveDiscount(Pageable pageable);
    
    // Featured products (high rating)
    @Query("SELECT p FROM Product p JOIN p.productReviews pr " +
           "GROUP BY p.id HAVING AVG(pr.rating) >= :minRating ORDER BY AVG(pr.rating) DESC")
    List<Product> findFeaturedProducts(@Param("minRating") Double minRating, Pageable pageable);
    
    // Products by category and price range
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId " +
           "AND p.unitPrice BETWEEN :minPrice AND :maxPrice AND p.status = 'ACTIVE'")
    List<Product> findByCategoryAndPriceRange(@Param("categoryId") Long categoryId,
                                               @Param("minPrice") Double minPrice,
                                               @Param("maxPrice") Double maxPrice);
    
    // Related products (same category, excluding current product)
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId " +
           "AND p.id != :productId AND p.status = 'ACTIVE' AND p.quantity > 0")
    List<Product> findRelatedProducts(@Param("categoryId") Long categoryId, 
                                       @Param("productId") Long productId,
                                       Pageable pageable);
    
    // Update product quantity
    @Modifying
    @Query("UPDATE Product p SET p.quantity = p.quantity - :quantity WHERE p.id = :productId AND p.quantity >= :quantity")
    int decreaseProductQuantity(@Param("productId") Long productId, @Param("quantity") Long quantity);
    
    @Modifying
    @Query("UPDATE Product p SET p.quantity = p.quantity + :quantity WHERE p.id = :productId")
    int increaseProductQuantity(@Param("productId") Long productId, @Param("quantity") Long quantity);
    
    // Count products by category
    @Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :categoryId AND p.status = 'ACTIVE'")
    Long countByCategoryId(@Param("categoryId") Long categoryId);
    
    // Average price by category
    @Query("SELECT AVG(p.unitPrice) FROM Product p WHERE p.category.id = :categoryId")
    Double getAveragePriceByCategory(@Param("categoryId") Long categoryId);
    
    // Check product exists and available
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p " +
           "WHERE p.id = :productId AND p.status = 'ACTIVE' AND p.quantity >= :quantity")
    boolean isProductAvailable(@Param("productId") Long productId, @Param("quantity") Long quantity);
    
    // Advanced search with multiple filters
    @Query("SELECT p FROM Product p WHERE " +
           "(:name IS NULL OR p.name LIKE %:name%) AND " +
           "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
           "(:status IS NULL OR p.status = :status) AND " +
           "(:minPrice IS NULL OR p.unitPrice >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.unitPrice <= :maxPrice)")
    List<Product> searchProducts(@Param("name") String name,
                                  @Param("categoryId") Long categoryId,
                                  @Param("status") ProductStatus status,
                                  @Param("minPrice") Double minPrice,
                                  @Param("maxPrice") Double maxPrice);
    
    // Find top selling products with order details
    @Query("SELECT p.id, p.name, SUM(od.amount) as totalSold FROM Product p " +
           "JOIN p.orderDetails od JOIN od.order o WHERE o.status = 'DELIVERED' " +
           "GROUP BY p.id, p.name ORDER BY totalSold DESC")
    List<Object[]> findTopSellingProducts(Pageable pageable);
    
    // Find products with discount
    @Query("SELECT p FROM Product p WHERE p.discount IS NOT NULL")
    List<Product> findProductsWithDiscount();
    
    // Find by name and category
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:name% AND p.category.id = :categoryId")
    List<Product> findByNameAndCategory(@Param("name") String name, @Param("categoryId") Long categoryId);
    
    // Find products by price range with pagination
    @Query("SELECT p FROM Product p WHERE p.unitPrice BETWEEN :minPrice AND :maxPrice")
    List<Product> findProductsByPriceRange(@Param("minPrice") Double minPrice, 
                                            @Param("maxPrice") Double maxPrice);

                                            
    //check product in stock
    @Query("select p.quantity from Product p where p.id =:productId")
    int checkProductInStock(@Param("productId") Long productId);

    // Đếm số sản phẩm theo status
    @Query("SELECT p.status, COUNT(p) " +
            "FROM Product p " +
            "GROUP BY p.status")
    List<Object[]> countByStatus();

    // Đếm số sản phẩm trong khoảng giá
    @Query("SELECT COUNT(p) FROM Product p " +
            "WHERE p.unitPrice >= :minPrice AND p.unitPrice < :maxPrice")
    Long countByPriceRange(@Param("minPrice") Double minPrice,
                           @Param("maxPrice") Double maxPrice);

    // Đếm số sản phẩm có giá >= minPrice
    @Query("SELECT COUNT(p) FROM Product p WHERE p.unitPrice >= :minPrice")
    Long countByPriceAbove(@Param("minPrice") Double minPrice);
}
