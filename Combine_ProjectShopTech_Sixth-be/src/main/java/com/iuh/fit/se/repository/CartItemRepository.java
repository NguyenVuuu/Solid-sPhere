package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Cart;
import com.iuh.fit.se.domain.entity.CartItem;
import com.iuh.fit.se.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * CartItemRepository
 * <p>
 * Repository for CartItem entity operations
 * <p>
 * Version 1.0
 * Date: 05/09/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 05/09/2025      ASUS      Create
 */
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    /**
     * Find cart items by cart ID
     * @param cartId Cart ID
     * @return List of CartItem
     */
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId")
    List<CartItem> findByCartId(@Param("cartId") Long cartId);

    /**
     * Find cart items by cart
     * @param cart Cart entity
     * @return List of CartItem
     */
    List<CartItem> findByCart(Cart cart);

    /**
     * Find cart item by cart and product
     * @param cart Cart entity
     * @param product Product entity
     * @return Optional CartItem
     */
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    /**
     * Find cart item by cart ID and product ID
     * @param cartId Cart ID
     * @param productId Product ID
     * @return Optional CartItem
     */
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId AND ci.product.id = :productId")
    Optional<CartItem> findByCartIdAndProductId(@Param("cartId") Long cartId, @Param("productId") Long productId);

    /**
     * Check if cart item exists for cart and product
     * @param cartId Cart ID
     * @param productId Product ID
     * @return boolean
     */
    @Query("SELECT COUNT(ci) > 0 FROM CartItem ci WHERE ci.cart.id = :cartId AND ci.product.id = :productId")
    boolean existsByCartIdAndProductId(@Param("cartId") Long cartId, @Param("productId") Long productId);

    /**
     * Delete cart items by cart ID
     * @param cartId Cart ID
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartId")
    void deleteByCartId(@Param("cartId") Long cartId);

    /**
     * Delete cart item by cart ID and product ID
     * @param cartId Cart ID
     * @param productId Product ID
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartId AND ci.product.id = :productId")
    void deleteByCartIdAndProductId(@Param("cartId") Long cartId, @Param("productId") Long productId);

    /**
     * Count cart items by cart ID
     * @param cartId Cart ID
     * @return Long count
     */

    @Query("SELECT COALESCE(SUM(ci.quantity), 0) FROM CartItem ci WHERE ci.cart.id = :cartId ")
    Long countByCartId(@Param("cartId") Long cartId);

    /**
     * Calculate total amount by cart ID
     * @param cartId Cart ID
     * @return Double total amount
     */
    @Query("SELECT COALESCE(SUM(ci.totalPrice), 0) FROM CartItem ci WHERE ci.cart.id = :cartId")
    Double calculateTotalAmountByCartId(@Param("cartId") Long cartId);
}