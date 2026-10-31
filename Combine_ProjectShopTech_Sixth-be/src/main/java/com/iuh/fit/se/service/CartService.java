package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.entity.Cart;
import com.iuh.fit.se.domain.entity.CartItem;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.exception.AppException;
import com.iuh.fit.se.exception.ErrorCode;
import com.iuh.fit.se.repository.CartItemRepository;
import com.iuh.fit.se.repository.CartRepository;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * CartService
 * <p>
 * Service for Cart business logic
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
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    /**
     * Get or create cart for user
     * @param userId User ID
     * @return Cart
     */
    public Cart getOrCreateCart(Long userId) {
//        Optional<Cart> existingCart = cartRepository.findByUserId(userId);
//        if (existingCart.isPresent()) {
//            return existingCart.get();
//        }
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
//
//        Cart cart = new Cart();
//        cart.setUser(user);
//        cart.setTotalAmount(0.0);
//        cart.setTotalItems(0);
//
//        return cartRepository.save(cart);
        return cartRepository.findByUserId(userId).orElse(null);
    }
    /**
     * Create cart for user
     * @param userId User ID
     * @return Cart
     */
    public Cart createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setTotalAmount(0.0);
        cart.setTotalItems(0);
        return cartRepository.save(cart);
    }
    /**
     * Get cart by user ID
     * @param userId User ID
     * @return Optional Cart
     */
    @Transactional(readOnly = true)
    public Optional<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    /**
     * Add product to cart
     * @param userId User ID
     * @param productId Product ID
     * @param quantity Quantity to add
     * @return CartItem
     */
   @Transactional
    public CartItem addToCart(Long userId, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Check if product already exists in cart
        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProduct(cart, product);
        // Validate requested quantity
        int requestedQuantityInt = productRepository.checkProductInStock(productId);
        if (requestedQuantityInt <= quantity) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
        }

        if (existingItem.isPresent()) {
            // Update quantity
            CartItem cartItem = existingItem.get();
            cartItem.updateQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
            updateCartTotals(cart.getId());
            return cartItem;
        } else {
            // Create new cart item
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getUnitPrice());
            cartItem.calculateTotalPrice();

            CartItem savedItem = cartItemRepository.save(cartItem);
            updateCartTotals(cart.getId());
            return savedItem;
        }
    }

    /**
     * Update cart item quantity
     * @param userId User ID
     * @param productId Product ID
     * @param quantity New quantity
     * @return CartItem
     */
    @Transactional
    public CartItem updateCartItemQuantity(Long userId, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        int requestedQuantityInt = productRepository.checkProductInStock(productId);
        if (requestedQuantityInt <= quantity+cart.getTotalItems()) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
        }
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItem.updateQuantity(quantity);
        CartItem savedItem = cartItemRepository.save(cartItem);
        updateCartTotals(cart.getId());
        return savedItem;
    }


    /**
     * Remove product from cart
     * @param userId User ID
     * @param productId Product ID
     */
    public void removeFromCart(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteByCartIdAndProductId(cart.getId(), productId);
        updateCartTotals(cart.getId());
    }

    /**
     * Clear cart
     * @param userId User ID
     */
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteByCartId(cart.getId());
        updateCartTotals(cart.getId());
    }

    /**
     * Get cart items by user ID
     * @param userId User ID
     * @return List of CartItem
     */
    public List<CartItem> getCartItems(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return cartItemRepository.findByCart(cart);
    }

    /**
     * Update cart totals
     * @param cartId Cart ID
     */
    private void updateCartTotals(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + cartId));

        Long totalItems = cartItemRepository.countByCartId(cartId);
        Double totalAmount = cartItemRepository.calculateTotalAmountByCartId(cartId);
        if (totalItems == 0L) {
            System.out.println("sfdlsd " + cartId);
            cartRepository.deleteById(cartId);

            return;
        }
        cart.setTotalItems(totalItems.intValue());
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);
    }

    /**
     * Get cart summary
     * @param userId User ID
     * @return Cart
     */
    public Cart getCartSummary(Long userId) {
        return getOrCreateCart(userId);
    }
}