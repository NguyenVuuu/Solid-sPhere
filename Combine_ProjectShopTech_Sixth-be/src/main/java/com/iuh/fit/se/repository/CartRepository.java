package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Cart;
import com.iuh.fit.se.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * CartRepository
 * <p>
 * Repository for Cart entity operations
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
public interface CartRepository extends JpaRepository<Cart, Long> {

    /**
     * Find cart by user ID
     * @param userId User ID
     * @return Optional Cart
     */
    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId")
    Optional<Cart> findByUserId(@Param("userId") Long userId);

    /**
     * Find cart by user
     * @param user User entity
     * @return Optional Cart
     */
    Optional<Cart> findByUser(User user);

    /**
     * Check if cart exists for user
     * @param userId User ID
     * @return boolean
     */
    @Query("SELECT COUNT(c) > 0 FROM Cart c WHERE c.user.id = :userId")
    boolean existsByUserId(@Param("userId") Long userId);

    /**
     * Delete cart by user ID
     * @param userId User ID
     */
    @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}