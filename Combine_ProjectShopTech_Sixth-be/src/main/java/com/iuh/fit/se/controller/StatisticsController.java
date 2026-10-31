package com.iuh.fit.se.controller;

import com.iuh.fit.se.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StatisticsController {
    
    private final StatisticsService statisticsService;

    /**
     * Get overall system statistics
     */
    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getOverviewStatistics() {
        return statisticsService.getOverviewStatistics();
    }

    /**
     * Get user statistics
     */
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        return statisticsService.getUserStatistics();
    }

    /**
     * Get product statistics
     */
    @GetMapping("/products")
    public ResponseEntity<Map<String, Object>> getProductStatistics() {
        return statisticsService.getProductStatistics();
    }

    /**
     * Get order statistics
     */
    @GetMapping("/orders")
    public ResponseEntity<Map<String, Object>> getOrderStatistics() {
        return statisticsService.getOrderStatistics();
    }

    /**
     * Get revenue statistics by date range
     */
    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> getRevenueStatistics(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return statisticsService.getRevenueStatistics(startDate, endDate);
    }

    /**
     * Get product review statistics
     */
    @GetMapping("/reviews")
    public ResponseEntity<Map<String, Object>> getReviewStatistics() {
        return statisticsService.getReviewStatistics();
    }

    /**
     * Get discount statistics
     */
    @GetMapping("/discounts")
    public ResponseEntity<Map<String, Object>> getDiscountStatistics() {
        return statisticsService.getDiscountStatistics();
    }

    /**
     * Get appointment statistics
     */
    @GetMapping("/appointments")
    public ResponseEntity<Map<String, Object>> getAppointmentStatistics() {
        return statisticsService.getAppointmentStatistics();
    }

    /**
     * Get chat statistics
     */
    @GetMapping("/chats")
    public ResponseEntity<Map<String, Object>> getChatStatistics() {
        return statisticsService.getChatStatistics();
    }

    /**
     * Get top selling products
     */
    @GetMapping("/top-products")
    public ResponseEntity<Map<String, Object>> getTopSellingProducts(@RequestParam(defaultValue = "10") int limit) {
        return statisticsService.getTopSellingProducts(limit);
    }

    /**
     * Get sales by category
     */
    @GetMapping("/sales-by-category")
    public ResponseEntity<Map<String, Object>> getSalesByCategory() {
        return statisticsService.getSalesByCategory();
    }

    /**
     * Get category sales (alias for sales-by-category)
     */
    @GetMapping("/category-sales")
    public ResponseEntity<Map<String, Object>> getCategorySales() {
        return statisticsService.getSalesByCategory();
    }

    /**
     * Get customer statistics by order count
     */
    @GetMapping("/top-customers")
    public ResponseEntity<Map<String, Object>> getTopCustomers(@RequestParam(defaultValue = "10") int limit) {
        return statisticsService.getTopCustomers(limit);
    }

	/**
	 * Extended statistics endpoints
	 */
	@GetMapping("/revenue-by-day")
	public ResponseEntity<Map<String, Object>> getRevenueByDay(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getRevenueByDay(startDate, endDate);
	}

	@GetMapping("/revenue-by-month")
	public ResponseEntity<Map<String, Object>> getRevenueByMonth(
			@RequestParam int startYear,
			@RequestParam int endYear) {
		return statisticsService.getRevenueByMonth(startYear, endYear);
	}

	@GetMapping("/revenue-by-quarter")
	public ResponseEntity<Map<String, Object>> getRevenueByQuarter(
			@RequestParam int startYear,
			@RequestParam int endYear) {
		return statisticsService.getRevenueByQuarter(startYear, endYear);
	}

	@GetMapping("/revenue-by-year")
	public ResponseEntity<Map<String, Object>> getRevenueByYear(
			@RequestParam int startYear,
			@RequestParam int endYear) {
		return statisticsService.getRevenueByYear(startYear, endYear);
	}

	@GetMapping("/orders-trend")
	public ResponseEntity<Map<String, Object>> getOrdersTrend(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getOrdersTrend(startDate, endDate);
	}

	@GetMapping("/low-stock-products")
	public ResponseEntity<Map<String, Object>> getLowStockProducts(
			@RequestParam(defaultValue = "10") long threshold,
			@RequestParam(defaultValue = "10") int limit) {
		return statisticsService.getLowStockProducts(threshold, limit);
	}

	@GetMapping("/top-categories")
	public ResponseEntity<Map<String, Object>> getTopCategoriesByRevenue(
			@RequestParam(defaultValue = "5") int limit,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getTopCategoriesByRevenue(limit, startDate, endDate);
	}

	@GetMapping("/returning-customers")
	public ResponseEntity<Map<String, Object>> getReturningCustomers(@RequestParam(defaultValue = "10") int limit) {
		return statisticsService.getReturningCustomers(limit);
	}

	@GetMapping("/payment-method-distribution")
	public ResponseEntity<Map<String, Object>> getPaymentMethodDistribution(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getPaymentMethodDistribution(startDate, endDate);
	}

	@GetMapping("/product-rating-distribution/{productId}")
	public ResponseEntity<Map<String, Object>> getProductRatingDistribution(@PathVariable Long productId) {
		return statisticsService.getProductRatingDistribution(productId);
	}

	// Advanced analytics endpoints
	@GetMapping("/rfm")
	public ResponseEntity<Map<String, Object>> getRfm(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
			@RequestParam(defaultValue = "20") int topN) {
		return statisticsService.getRfmSegmentation(startDate, endDate, topN);
	}

	@GetMapping("/cohort-retention")
	public ResponseEntity<Map<String, Object>> getCohortRetention(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getCohortRetention(startDate, endDate);
	}

	@GetMapping("/abc-inventory")
	public ResponseEntity<Map<String, Object>> getAbcInventory(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getAbcInventoryAnalysis(startDate, endDate);
	}

	@GetMapping("/frequently-bought-together/{productId}")
	public ResponseEntity<Map<String, Object>> getFrequentlyBoughtTogether(@PathVariable Long productId,
			@RequestParam(defaultValue = "10") int limit) {
		return statisticsService.getFrequentlyBoughtTogether(productId, limit);
	}

	@GetMapping("/retention-rate")
	public ResponseEntity<Map<String, Object>> getRetentionRate(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getCustomerRetentionRate(startDate, endDate);
	}

	@GetMapping("/stockout-risk")
	public ResponseEntity<Map<String, Object>> getStockoutRisk(@RequestParam(defaultValue = "10") long threshold) {
		return statisticsService.getStockoutRisk(threshold);
	}

	@GetMapping("/customer-ltv")
	public ResponseEntity<Map<String, Object>> getCustomerLtv(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getCustomerLifetimeValue(startDate, endDate);
	}

	@GetMapping("/weekday-revenue")
	public ResponseEntity<Map<String, Object>> getWeekdayRevenue(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return statisticsService.getWeekdayRevenueDistribution(startDate, endDate);
	}
}
