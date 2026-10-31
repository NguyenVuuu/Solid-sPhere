package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.entity.CartItem;
import com.iuh.fit.se.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * CartItemService
 * <p>
 * Service for CartItem business logic
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
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    /**
     * Get cart item by ID
     * @param id CartItem ID
     * @return Optional CartItem
     */
    @Transactional(readOnly = true)
    public Optional<CartItem> findById(Long id) {
        return cartItemRepository.findById(id);
    }

    /**
     * Get all cart items
     * @return List of CartItem
     */
    @Transactional(readOnly = true)
    public List<CartItem> findAll() {
        return cartItemRepository.findAll();
    }

    /**
     * Get cart items by cart ID
     * @param cartId Cart ID
     * @return List of CartItem
     */
    @Transactional(readOnly = true)
    public List<CartItem> findByCartId(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    /**
     * Save cart item
     * @param cartItem CartItem to save
     * @return Saved CartItem
     */
    public CartItem save(CartItem cartItem) {
        cartItem.calculateTotalPrice();
        return cartItemRepository.save(cartItem);
    }

    /**
     * Update cart item
     * @param cartItem CartItem to update
     * @return Updated CartItem
     */
    public CartItem update(CartItem cartItem) {
        cartItem.calculateTotalPrice();
        return cartItemRepository.save(cartItem);
    }

    /**
     * Delete cart item by ID
     * @param id CartItem ID
     */
    public void deleteById(Long id) {
        cartItemRepository.deleteById(id);
    }

    /**
     * Delete cart items by cart ID
     * @param cartId Cart ID
     */
    public void deleteByCartId(Long cartId) {
        cartItemRepository.deleteByCartId(cartId);
    }

    /**
     * Delete cart item by cart ID and product ID
     * @param cartId Cart ID
     * @param productId Product ID
     */
    public void deleteByCartIdAndProductId(Long cartId, Long productId) {
        cartItemRepository.deleteByCartIdAndProductId(cartId, productId);
    }

    /**
     * Count cart items by cart ID
     * @param cartId Cart ID
     * @return Long count
     */
    @Transactional(readOnly = true)
    public Long countByCartId(Long cartId) {
        return cartItemRepository.countByCartId(cartId);
    }

    /**
     * Calculate total amount by cart ID
     * @param cartId Cart ID
     * @return Double total amount
     */
    @Transactional(readOnly = true)
    public Double calculateTotalAmountByCartId(Long cartId) {
        return cartItemRepository.calculateTotalAmountByCartId(cartId);
    }
}