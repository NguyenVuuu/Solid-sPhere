package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import com.iuh.fit.se.domain.enums.ProductStatus;
import com.iuh.fit.se.domain.enums.UserStatus;
import com.iuh.fit.se.repository.*;
import com.iuh.fit.se.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatisticsServiceImpl implements StatisticsService {

	private final UserRepository userRepository;
	private final ProductRepository productRepository;
	private final OrderRepository orderRepository;
	private final OrderDetailRepository orderDetailRepository;
	private final ProductReviewRepository productReviewRepository;
	private final DiscountRepository discountRepository;
	private final BookingAppointmentRepository bookingAppointmentRepository;
	private final ChatCustomerServiceRepository chatRepository;

	@Override
	public ResponseEntity<Map<String, Object>> getOverviewStatistics() {
		Map<String, Object> stats = new HashMap<>();
		stats.put("totalUsers", userRepository.count());
		stats.put("totalProducts", productRepository.count());
		stats.put("totalOrders", orderRepository.count());
		stats.put("totalReviews", productReviewRepository.count());
		stats.put("totalAppointments", bookingAppointmentRepository.count());
		stats.put("totalChatSessions", chatRepository.count());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getUserStatistics() {
		Map<String, Object> stats = new HashMap<>();
		stats.put("totalUsers", userRepository.count());
		stats.put("activeUsers", userRepository.findByStatus(UserStatus.ACTIVE).size());
		stats.put("inactiveUsers", userRepository.findByStatus(UserStatus.INACTIVE).size());
		stats.put("deletedUsers", userRepository.findByStatus(UserStatus.DELETED).size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getProductStatistics() {
		Map<String, Object> stats = new HashMap<>();
		stats.put("totalProducts", productRepository.count());
		stats.put("activeProducts", productRepository.findByStatus(ProductStatus.AVAILABLE).size());
		stats.put("inactiveProducts", productRepository.findByStatus(ProductStatus.INACTIVE).size());
		stats.put("availableProducts", productRepository.findAvailableProducts().size());
		stats.put("outOfStockProducts", productRepository.findOutOfStockProducts().size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getOrderStatistics() {
		Map<String, Object> stats = new HashMap<>();
		stats.put("totalOrders", orderRepository.count());
		stats.put("pendingOrders", orderRepository.findByStatus(OrderStatus.PENDING).size());
		stats.put("confirmedOrders", orderRepository.findByStatus(OrderStatus.CONFIRMED).size());
		stats.put("processingOrders", orderRepository.findByStatus(OrderStatus.PROCESSING).size());
		stats.put("shippedOrders", orderRepository.findByStatus(OrderStatus.SHIPPED).size());
		stats.put("deliveredOrders", orderRepository.findByStatus(OrderStatus.DELIVERED).size());
		stats.put("cancelledOrders", orderRepository.findByStatus(OrderStatus.CANCELLED).size());
		stats.put("returnedOrders", orderRepository.findByStatus(OrderStatus.RETURNED).size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getRevenueStatistics(LocalDate startDate, LocalDate endDate) {
		Map<String, Object> stats = new HashMap<>();
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		double totalRevenue = orders.stream()
				.filter(order -> order.getStatus() == OrderStatus.DELIVERED)
				.mapToDouble(order -> order.getTotalPrice() != null ? order.getTotalPrice() : 0.0)
				.sum();
		double pendingRevenue = orders.stream()
				.filter(order -> order.getStatus() == OrderStatus.PENDING ||
							   order.getStatus() == OrderStatus.CONFIRMED ||
							   order.getStatus() == OrderStatus.PROCESSING ||
							   order.getStatus() == OrderStatus.SHIPPED)
				.mapToDouble(order -> order.getTotalPrice() != null ? order.getTotalPrice() : 0.0)
				.sum();
		stats.put("totalRevenue", totalRevenue);
		stats.put("pendingRevenue", pendingRevenue);
		stats.put("totalOrders", orders.size());
		stats.put("averageOrderValue", orders.isEmpty() ? 0.0 : totalRevenue / orders.size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getReviewStatistics() {
		Map<String, Object> stats = new HashMap<>();
		long totalReviews = productReviewRepository.count();
		stats.put("totalReviews", totalReviews);
		stats.put("fiveStarReviews", productReviewRepository.findByMinimumRating(5).size());
		stats.put("fourStarReviews", productReviewRepository.findByMinimumRating(4).stream()
				.filter(r -> r.getRating() == 4).count());
		stats.put("threeStarReviews", productReviewRepository.findByMinimumRating(3).stream()
				.filter(r -> r.getRating() == 3).count());
		stats.put("twoStarReviews", productReviewRepository.findByMinimumRating(2).stream()
				.filter(r -> r.getRating() == 2).count());
		stats.put("oneStarReviews", productReviewRepository.findByMinimumRating(1).stream()
				.filter(r -> r.getRating() == 1).count());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getDiscountStatistics() {
		Map<String, Object> stats = new HashMap<>();
		LocalDate today = LocalDate.now();
		stats.put("totalDiscounts", discountRepository.count());
		stats.put("activeDiscounts", discountRepository.findActiveDiscounts(today).size());
		stats.put("expiredDiscounts", discountRepository.findExpiredDiscounts(today).size());
		stats.put("enabledDiscounts", discountRepository.findByDiscountStatus(true).size());
		stats.put("disabledDiscounts", discountRepository.findByDiscountStatus(false).size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getAppointmentStatistics() {
		Map<String, Object> stats = new HashMap<>();
		stats.put("totalAppointments", bookingAppointmentRepository.count());
		stats.put("upcomingAppointments", bookingAppointmentRepository
				.findUpcomingAppointments(java.time.LocalDateTime.now()).size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getChatStatistics() {
		Map<String, Object> stats = new HashMap<>();
		stats.put("totalChatSessions", chatRepository.count());
		stats.put("pendingChats", chatRepository.findByStatus(com.iuh.fit.se.domain.enums.ChatStatus.PENDING).size());
		stats.put("activeChats", chatRepository.findByStatus(com.iuh.fit.se.domain.enums.ChatStatus.ACTIVE).size());
		stats.put("closedChats", chatRepository.findByStatus(com.iuh.fit.se.domain.enums.ChatStatus.CLOSED).size());
		return ResponseEntity.ok(stats);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getTopSellingProducts(int limit) {
		var orderDetails = orderDetailRepository.findAll();
		Map<Long, Integer> productSales = new HashMap<>();
		Map<Long, String> productNames = new HashMap<>();
		orderDetails.forEach(detail -> {
			Long productId = detail.getProduct().getId();
			productSales.merge(productId, detail.getAmount(), Integer::sum);
			productNames.put(productId, detail.getProduct().getName());
		});
		var topProducts = productSales.entrySet().stream()
				.sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
				.limit(limit)
				.map(entry -> {
					Map<String, Object> product = new HashMap<>();
					product.put("productId", entry.getKey());
					product.put("productName", productNames.get(entry.getKey()));
					product.put("totalSold", entry.getValue());
					return product;
				})
				.toList();
		Map<String, Object> result = new HashMap<>();
		result.put("topProducts", topProducts);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getSalesByCategory() {
		var orderDetails = orderDetailRepository.findAll();
		Map<String, Double> categorySales = new HashMap<>();
		Map<String, Integer> categoryQuantity = new HashMap<>();
		orderDetails.forEach(detail -> {
			if (detail.getProduct() != null && detail.getProduct().getCategory() != null) {
				String categoryName = detail.getProduct().getCategory().getName();
				double revenue = detail.getUnitPrice() * detail.getAmount();
				categorySales.merge(categoryName, revenue, Double::sum);
				categoryQuantity.merge(categoryName, detail.getAmount(), Integer::sum);
			}
		});
		
		// Calculate total revenue for percentage calculation
		double totalRevenue = categorySales.values().stream().mapToDouble(Double::doubleValue).sum();
		
		// Create array format with percentage for frontend
		var categoryData = categorySales.entrySet().stream()
			.sorted(Map.Entry.<String, Double>comparingByValue().reversed())
			.map(entry -> {
				String categoryName = entry.getKey();
				Double revenue = entry.getValue();
				Integer quantity = categoryQuantity.get(categoryName);
				double percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
				
				Map<String, Object> categoryInfo = new HashMap<>();
				categoryInfo.put("name", categoryName);
				categoryInfo.put("value", revenue);
				categoryInfo.put("revenue", revenue);
				categoryInfo.put("quantity", quantity);
				categoryInfo.put("percentage", Math.round(percentage * 10) / 10.0); // Round to 1 decimal
				return categoryInfo;
			})
			.collect(Collectors.toList());
		
		Map<String, Object> result = new HashMap<>();
		result.put("categorySales", categorySales); // Keep original format for backward compatibility
		result.put("categoryQuantity", categoryQuantity);
		result.put("categoryData", categoryData); // New format with percentage
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getTopCustomers(int limit) {
		var orders = orderRepository.findAll();
		Map<Long, Long> customerOrderCount = new HashMap<>();
		Map<Long, String> customerNames = new HashMap<>();
		Map<Long, Double> customerRevenue = new HashMap<>();
		orders.forEach(order -> {
			if (order.getUser() != null) {
				Long userId = order.getUser().getId();
				customerOrderCount.merge(userId, 1L, Long::sum);
				customerNames.put(userId, order.getUser().getFullName());
				customerRevenue.merge(userId, order.getTotalPrice() != null ? order.getTotalPrice() : 0.0, Double::sum);
			}
		});
		var topCustomers = customerOrderCount.entrySet().stream()
				.sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
				.limit(limit)
				.map(entry -> {
					Map<String, Object> customer = new HashMap<>();
					customer.put("customerId", entry.getKey());
					customer.put("customerName", customerNames.get(entry.getKey()));
					customer.put("totalOrders", entry.getValue());
					customer.put("totalRevenue", customerRevenue.get(entry.getKey()));
					return customer;
				})
				.toList();
		Map<String, Object> result = new HashMap<>();
		result.put("topCustomers", topCustomers);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getRevenueByDay(LocalDate startDate, LocalDate endDate) {
		Map<LocalDate, Double> revenueByDay = new TreeMap<>();
		LocalDate cursor = startDate;
		while (!cursor.isAfter(endDate)) {
			double revenue = orderRepository.calculateRevenue(cursor, cursor) != null
					? orderRepository.calculateRevenue(cursor, cursor)
					: 0.0;
			revenueByDay.put(cursor, revenue);
			cursor = cursor.plusDays(1);
		}
		Map<String, Object> result = new HashMap<>();
		result.put("revenueByDay", revenueByDay);
		return ResponseEntity.ok(result);
	}

	@Override

	public ResponseEntity<Map<String, Object>> getRevenueByMonth(int startYear, int endYear) {
		Map<String, Double> revenueByMonth = new TreeMap<>();
		for (int year = startYear; year <= endYear; year++) {
			for (int month = 1; month <= 12; month++) {
				YearMonth ym = YearMonth.of(year, month);
				LocalDate start = ym.atDay(1);
				LocalDate end = ym.atEndOfMonth();
				double revenue = orderRepository.calculateRevenue(start, end) != null
						? orderRepository.calculateRevenue(start, end)
						: 0.0;
				revenueByMonth.put(ym.toString(), revenue);
			}
		}
		Map<String, Object> result = new HashMap<>();
		result.put("revenueByMonth", revenueByMonth);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getRevenueByQuarter(int startYear, int endYear) {
		Map<String, Double> revenueByQuarter = new TreeMap<>();
		for (int year = startYear; year <= endYear; year++) {
			for (int q = 1; q <= 4; q++) {
				int startMonth = (q - 1) * 3 + 1;
				int endMonth = startMonth + 2;
				LocalDate start = YearMonth.of(year, startMonth).atDay(1);
				LocalDate end = YearMonth.of(year, endMonth).atEndOfMonth();
				double revenue = orderRepository.calculateRevenue(start, end) != null
						? orderRepository.calculateRevenue(start, end)
						: 0.0;
				revenueByQuarter.put("Q" + q + "-" + year, revenue);
			}
		}
		Map<String, Object> result = new HashMap<>();
		result.put("revenueByQuarter", revenueByQuarter);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getRevenueByYear(int startYear, int endYear) {
		Map<Integer, Double> revenueByYear = new TreeMap<>();
		for (int y = startYear; y <= endYear; y++) {
			LocalDate start = YearMonth.of(y, 1).atDay(1);
			LocalDate end = YearMonth.of(y, 12).atEndOfMonth();
			double revenue = orderRepository.calculateRevenue(start, end) != null
					? orderRepository.calculateRevenue(start, end)
					: 0.0;
			revenueByYear.put(y, revenue);
		}
		Map<String, Object> result = new HashMap<>();
		result.put("revenueByYear", revenueByYear);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getOrdersTrend(LocalDate startDate, LocalDate endDate) {
		Map<LocalDate, Long> ordersCountByDay = new TreeMap<>();
		LocalDate cursor = startDate;
		while (!cursor.isAfter(endDate)) {
			Long count = orderRepository.countOrdersByDate(cursor);
			ordersCountByDay.put(cursor, count != null ? count : 0L);
			cursor = cursor.plusDays(1);
		}
		Map<String, Object> result = new HashMap<>();
		result.put("ordersByDay", ordersCountByDay);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getLowStockProducts(long threshold, int limit) {
		var products = productRepository.findLowStockProducts(threshold);
		Map<String, Object> result = new HashMap<>();
		result.put("items", products.stream().limit(limit).collect(Collectors.toList()));
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getTopCategoriesByRevenue(int limit, LocalDate startDate, LocalDate endDate) {
		var rows = orderDetailRepository.getRevenueByCategory(startDate, endDate);
		// rows: [categoryId, categoryName, revenue]
		var top = rows.stream()
				.limit(limit)
				.map(r -> Map.of(
						"categoryId", r[0],
						"categoryName", r[1],
						"revenue", r[2]
				))
				.collect(Collectors.toList());
		Map<String, Object> result = new HashMap<>();
		result.put("topCategoriesByRevenue", top);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getReturningCustomers(int limit) {
		var orders = orderRepository.findAll();
		Map<Long, Long> countByUser = new HashMap<>();
		orders.forEach(o -> {
			if (o.getUser() != null) {
				countByUser.merge(o.getUser().getId(), 1L, Long::sum);
			}
		});
		var returning = countByUser.entrySet().stream()
				.filter(e -> e.getValue() > 1)
				.sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
				.limit(limit)
				.map(entry -> {
					// Fetch user name
					var user = userRepository.findById(entry.getKey()).orElse(null);
					String userName = user != null ? user.getFullName() : "User " + entry.getKey();
					return Map.of(
						"userId", entry.getKey(),
						"userName", userName,
						"orderCount", entry.getValue()
					);
				})
				.collect(Collectors.toList());
		Map<String, Object> result = new HashMap<>();
		result.put("returningCustomers", returning);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getPaymentMethodDistribution(LocalDate startDate, LocalDate endDate) {
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		Map<PaymentMethod, Long> distribution = orders.stream()
				.collect(Collectors.groupingBy(o -> o.getPaymentMethod(), Collectors.counting()));
		Map<String, Object> result = new HashMap<>();
		result.put("paymentMethodDistribution", distribution);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getProductRatingDistribution(Long productId) {
		var rows = productReviewRepository.getRatingDistribution(productId);
		Map<Integer, Long> dist = new HashMap<>();
		rows.forEach(r -> dist.put((Integer) r[0], (Long) r[1]));
		Map<String, Object> result = new HashMap<>();
		result.put("ratingDistribution", dist);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getRfmSegmentation(LocalDate startDate, LocalDate endDate, int topN) {
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		Map<Long, LocalDate> lastOrderDate = new HashMap<>();
		Map<Long, Long> frequency = new HashMap<>();
		Map<Long, Double> monetary = new HashMap<>();
		orders.forEach(o -> {
			if (o.getUser() == null) return;
			Long uid = o.getUser().getId();
			lastOrderDate.merge(uid, o.getCreatedDate(), (a,b) -> a.isAfter(b) ? a : b);
			frequency.merge(uid, 1L, Long::sum);
			monetary.merge(uid, o.getTotalPrice() != null ? o.getTotalPrice() : 0.0, Double::sum);
		});
		LocalDate today = endDate != null ? endDate : LocalDate.now();
		record Score(Long userId, long r, long f, double m) {}
		var scores = lastOrderDate.keySet().stream().map(uid -> {
			long recencyDays = java.time.temporal.ChronoUnit.DAYS.between(lastOrderDate.get(uid), today);
			// Chấm điểm thô: R thấp là tốt => đảo chiều
			long rScore = recencyDays <= 7 ? 5 : recencyDays <= 30 ? 4 : recencyDays <= 90 ? 3 : recencyDays <= 180 ? 2 : 1;
			long fScore = frequency.getOrDefault(uid, 0L) >= 10 ? 5 : frequency.getOrDefault(uid, 0L) >= 5 ? 4 : frequency.getOrDefault(uid, 0L) >= 3 ? 3 : frequency.getOrDefault(uid, 0L) >= 2 ? 2 : 1;
			double mVal = monetary.getOrDefault(uid, 0.0);
			long mScore = mVal >= 10000000 ? 5 : mVal >= 5000000 ? 4 : mVal >= 2000000 ? 3 : mVal >= 1000000 ? 2 : 1;
			return new Score(uid, rScore, fScore, mScore);
		}).collect(Collectors.toList());
		var top = scores.stream()
				.sorted((a,b) -> Long.compare((b.r + b.f + Math.round(b.m)), (a.r + a.f + Math.round(a.m))))
				.limit(topN)
				.map(score -> {
					// Fetch user name
					var user = userRepository.findById(score.userId()).orElse(null);
					String userName = user != null ? user.getFullName() : "User " + score.userId();
					return Map.of(
						"userId", score.userId(),
						"userName", userName,
						"r", score.r(),
						"f", score.f(),
						"m", score.m()
					);
				})
				.collect(Collectors.toList());
		Map<String, Object> result = new HashMap<>();
		result.put("rfmTop", top);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getCohortRetention(LocalDate startDate, LocalDate endDate) {
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		Map<YearMonth, Map<Integer, Long>> retention = new TreeMap<>();
		Map<Long, YearMonth> firstPurchase = new HashMap<>();
		orders.forEach(o -> {
			if (o.getUser() == null) return;
			Long uid = o.getUser().getId();
			YearMonth ym = YearMonth.from(o.getCreatedDate());
			firstPurchase.merge(uid, ym, (a,b) -> a.isBefore(b) ? a : b);
		});
		orders.forEach(o -> {
			if (o.getUser() == null) return;
			Long uid = o.getUser().getId();
			YearMonth cohort = firstPurchase.get(uid);
			if (cohort == null) return;
			int monthOffset = (int) java.time.temporal.ChronoUnit.MONTHS.between(cohort, YearMonth.from(o.getCreatedDate()));
			retention.computeIfAbsent(cohort, k -> new HashMap<>()).merge(monthOffset, 1L, Long::sum);
		});
		Map<String, Object> result = new HashMap<>();
		result.put("cohortRetention", retention);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getAbcInventoryAnalysis(LocalDate startDate, LocalDate endDate) {
		var rows = orderDetailRepository.getRevenueByProduct(startDate, endDate);
		Map<Long, Double> revenueByProduct = new HashMap<>();
		rows.forEach(r -> revenueByProduct.put((Long) r[0], (Double) r[2]));
		double total = revenueByProduct.values().stream().mapToDouble(Double::doubleValue).sum();
		var sorted = revenueByProduct.entrySet().stream()
				.sorted(Map.Entry.<Long, Double>comparingByValue().reversed())
				.collect(Collectors.toList());
		double cumulative = 0.0;
		Map<String, Object> result = new HashMap<>();
		Map<Long, String> group = new LinkedHashMap<>();
		for (var e : sorted) {
			cumulative += e.getValue();
			double share = total == 0 ? 0 : cumulative / total;
			group.put(e.getKey(), share <= 0.8 ? "A" : share <= 0.95 ? "B" : "C");
		}
		result.put("abcGroups", group);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getFrequentlyBoughtTogether(Long productId, int limit) {
		var rows = orderDetailRepository.findFrequentlyBoughtTogether(productId, org.springframework.data.domain.PageRequest.of(0, limit));
		Map<Long, Long> related = new LinkedHashMap<>();
		rows.forEach(r -> related.put((Long) r[0], (Long) r[2]));
		Map<String, Object> result = new HashMap<>();
		result.put("frequentlyBoughtTogether", related);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getCustomerRetentionRate(LocalDate startDate, LocalDate endDate) {
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		Map<LocalDate, Long> newCustomersByDay = new TreeMap<>();
		Map<Long, LocalDate> firstOrderDate = new HashMap<>();
		orders.forEach(o -> {
			if (o.getUser() == null) return;
			Long uid = o.getUser().getId();
			firstOrderDate.merge(uid, o.getCreatedDate(), (a,b) -> a.isBefore(b) ? a : b);
		});
		firstOrderDate.values().forEach(d -> newCustomersByDay.merge(d, 1L, Long::sum));
		long totalNew = newCustomersByDay.values().stream().mapToLong(Long::longValue).sum();
		long repeaters = orders.stream().filter(o -> o.getUser() != null)
				.collect(Collectors.groupingBy(o -> o.getUser().getId(), Collectors.counting()))
				.values().stream().filter(c -> c > 1).count();
		double rate = totalNew == 0 ? 0.0 : (double) repeaters / (double) totalNew;
		Map<String, Object> result = new HashMap<>();
		result.put("retentionRate", rate);
		result.put("newCustomersByDay", newCustomersByDay);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getStockoutRisk(long threshold) {
		var low = productRepository.findLowStockProducts(threshold);
		Map<Long, Object> items = new LinkedHashMap<>();
		low.forEach(p -> items.put(p.getId(), Map.of(
				"name", p.getName(),
				"quantity", p.getQuantity()
		)));
		Map<String, Object> result = new HashMap<>();
		result.put("stockoutRisk", items);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getCustomerLifetimeValue(LocalDate startDate, LocalDate endDate) {
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		Map<Long, Double> totalByUser = new HashMap<>();
		Map<Long, Long> countByUser = new HashMap<>();
		orders.forEach(o -> {
			if (o.getUser() == null) return;
			Long uid = o.getUser().getId();
			totalByUser.merge(uid, o.getTotalPrice() != null ? o.getTotalPrice() : 0.0, Double::sum);
			countByUser.merge(uid, 1L, Long::sum);
		});
		Map<Long, Double> aovByUser = new HashMap<>();
		totalByUser.forEach((uid, sum) -> {
			long cnt = countByUser.getOrDefault(uid, 0L);
			aovByUser.put(uid, cnt == 0 ? 0.0 : sum / cnt);
		});
		Map<String, Object> result = new HashMap<>();
		result.put("aovByUser", aovByUser);
		result.put("totalByUser", totalByUser);
		result.put("ordersCountByUser", countByUser);
		return ResponseEntity.ok(result);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getWeekdayRevenueDistribution(LocalDate startDate, LocalDate endDate) {
		var orders = orderRepository.findByCreatedDateBetween(startDate, endDate);
		Map<java.time.DayOfWeek, Double> dist = new TreeMap<>();
		orders.forEach(o -> {
			if (o.getTotalPrice() == null) return;
			var day = o.getCreatedDate().getDayOfWeek();
			dist.merge(day, o.getTotalPrice(), Double::sum);
		});
		Map<String, Object> result = new HashMap<>();
		result.put("weekdayRevenue", dist);
		return ResponseEntity.ok(result);
	}

	
}


