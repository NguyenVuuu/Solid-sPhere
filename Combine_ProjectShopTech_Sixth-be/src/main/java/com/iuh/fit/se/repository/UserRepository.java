package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.enums.Gender;
import com.iuh.fit.se.domain.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
    
    List<User> findByStatus(UserStatus status);
    Page<User> findByStatus(UserStatus status, Pageable pageable);
    
    List<User> findByRoleId(Long roleId);
    Page<User> findByRoleId(Long roleId, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.fullName LIKE %?1%")
    List<User> searchByName(String name);
    
    @Query("SELECT u FROM User u WHERE u.fullName LIKE %:keyword% OR u.email LIKE %:keyword% OR u.phoneNumber LIKE %:keyword%")
    Page<User> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.cumulativePoints >= ?1")
    List<User> findByMinimumPoints(Long points);
    
    @Query("SELECT u FROM User u WHERE u.cumulativePoints >= :minPoints AND u.cumulativePoints <= :maxPoints")
    List<User> findByPointsRange(@Param("minPoints") Long minPoints, @Param("maxPoints") Long maxPoints);
    
    // Find VIP customers (high points)
    @Query("SELECT u FROM User u WHERE u.cumulativePoints >= :threshold AND u.status = 'ACTIVE' ORDER BY u.cumulativePoints DESC")
    List<User> findVIPCustomers(@Param("threshold") Long threshold, Pageable pageable);
    
    // Find users by gender
    List<User> findByGender(Gender gender);
    
    // Find users by age range (calculated from dob)
    @Query("SELECT u FROM User u WHERE YEAR(CURRENT_DATE) - YEAR(u.dob) BETWEEN :minAge AND :maxAge")
    List<User> findByAgeRange(@Param("minAge") int minAge, @Param("maxAge") int maxAge);
    
    // Find users registered in date range (assuming id is sequential)
    @Query("SELECT u FROM User u WHERE u.dob BETWEEN :startDate AND :endDate")
    List<User> findByDobBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // Count users by role
    @Query("SELECT COUNT(u) FROM User u WHERE u.role.id = :roleId")
    Long countByRoleId(@Param("roleId") Long roleId);
    
    // Count users by status
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = :status")
    Long countByStatus(@Param("status") UserStatus status);
    
    // Find users with orders
    @Query("SELECT DISTINCT u FROM User u JOIN u.orders o WHERE o.status = 'DELIVERED'")
    List<User> findUsersWithCompletedOrders();
    
    // Find users without orders
    @Query("SELECT u FROM User u WHERE u.orders IS EMPTY")
    List<User> findUsersWithoutOrders();
    
    // Find inactive users (no orders in last N days)
    @Query("SELECT u FROM User u WHERE u.id NOT IN " +
           "(SELECT DISTINCT o.user.id FROM Order o WHERE o.createdDate >= :sinceDate)")
    List<User> findInactiveUsers(@Param("sinceDate") LocalDate sinceDate);
    
    // Update user points
    @Modifying
    @Query("UPDATE User u SET u.cumulativePoints = u.cumulativePoints + :points WHERE u.id = :userId")
    int addPoints(@Param("userId") Long userId, @Param("points") Long points);
    
    @Modifying
    @Query("UPDATE User u SET u.cumulativePoints = u.cumulativePoints - :points WHERE u.id = :userId AND u.cumulativePoints >= :points")
    int deductPoints(@Param("userId") Long userId, @Param("points") Long points);
    
    // Update user status
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :userId")
    int updateUserStatus(@Param("userId") Long userId, @Param("status") UserStatus status);
    
    // Find users by address
    @Query("SELECT u FROM User u WHERE u.address LIKE %:address%")
    List<User> findByAddressContaining(@Param("address") String address);
    
    // Top customers by total spending
    @Query("SELECT u FROM User u JOIN u.orders o WHERE o.status = 'DELIVERED' " +
           "GROUP BY u.id ORDER BY SUM(o.totalPrice) DESC")
    List<User> findTopCustomersBySpending(Pageable pageable);
    
    // Top customers by order count
    @Query("SELECT u FROM User u JOIN u.orders o " +
           "GROUP BY u.id ORDER BY COUNT(o) DESC")
    List<User> findTopCustomersByOrderCount(Pageable pageable);
    
    // Find customers with birthday in current month
    @Query("SELECT u FROM User u WHERE MONTH(u.dob) = :month")
    List<User> findCustomersWithBirthdayInMonth(@Param("month") int month);
    
    // Top customers by points
    @Query("SELECT u FROM User u WHERE u.status = 'ACTIVE' ORDER BY u.cumulativePoints DESC")
    List<User> findTopCustomersByPoints(Pageable pageable);
    
}
