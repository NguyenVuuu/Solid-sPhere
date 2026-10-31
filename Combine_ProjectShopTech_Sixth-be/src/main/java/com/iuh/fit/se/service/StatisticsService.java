package com.iuh.fit.se.service;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Map;

public interface StatisticsService {

	ResponseEntity<Map<String, Object>> getOverviewStatistics();

	ResponseEntity<Map<String, Object>> getUserStatistics();

	ResponseEntity<Map<String, Object>> getProductStatistics();

	ResponseEntity<Map<String, Object>> getOrderStatistics();

	ResponseEntity<Map<String, Object>> getRevenueStatistics(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getReviewStatistics();

	ResponseEntity<Map<String, Object>> getDiscountStatistics();

	ResponseEntity<Map<String, Object>> getAppointmentStatistics();

	ResponseEntity<Map<String, Object>> getChatStatistics();

	ResponseEntity<Map<String, Object>> getTopSellingProducts(int limit);

	ResponseEntity<Map<String, Object>> getSalesByCategory();

	ResponseEntity<Map<String, Object>> getTopCustomers(int limit);

	ResponseEntity<Map<String, Object>> getRevenueByDay(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getRevenueByMonth(int startYear, int endYear);

	ResponseEntity<Map<String, Object>> getRevenueByQuarter(int startYear, int endYear);

	ResponseEntity<Map<String, Object>> getRevenueByYear(int startYear, int endYear);

	ResponseEntity<Map<String, Object>> getOrdersTrend(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getLowStockProducts(long threshold, int limit);

	ResponseEntity<Map<String, Object>> getTopCategoriesByRevenue(int limit, LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getReturningCustomers(int limit);

	ResponseEntity<Map<String, Object>> getPaymentMethodDistribution(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getProductRatingDistribution(Long productId);

	// Advanced analytics
	ResponseEntity<Map<String, Object>> getRfmSegmentation(LocalDate startDate, LocalDate endDate, int topN);

	ResponseEntity<Map<String, Object>> getCohortRetention(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getAbcInventoryAnalysis(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getFrequentlyBoughtTogether(Long productId, int limit);

	ResponseEntity<Map<String, Object>> getCustomerRetentionRate(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getStockoutRisk(long threshold);

	ResponseEntity<Map<String, Object>> getCustomerLifetimeValue(LocalDate startDate, LocalDate endDate);

	ResponseEntity<Map<String, Object>> getWeekdayRevenueDistribution(LocalDate startDate, LocalDate endDate);
}


